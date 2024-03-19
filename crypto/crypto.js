var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");
var table3 = document.getElementById("table3");

function fetchDataAndUpdateTables() {
    table1.innerHTML = `<tr>
    <th>Kripto</th>
    <th>Değişim</th>
    <th>Fiyat</th>
    </tr>`;
    table2.innerHTML = `<tr>
    <th>Kripto</th>
    <th>Değişim</th>
    <th>Fiyat</th>
    </tr>`;
    table3.innerHTML = `<tr>
    <th>Kripto</th>
    <th>Değişim</th>
    <th>Fiyat</th>
    </tr>`;

    const options = {
        headers: {
          'x-access-token': config.COINRANKING_API_KEY,
        },
      };

    fetch('https://api.coinranking.com/v2/coins',options)
        .then(response => response.json())
        .then(data => {
            var tables = [table1, table2, table3];
            const coins = data.data.coins;

            coins.forEach((coin, index) => {
                const name = coin.name;
                const symbol = coin.symbol;
                const change = coin.change;
                const price = parseFloat(coin.price).toFixed(6);
                var changeClass = "";

                if (parseFloat(change) > 0) {
                    changeClass = "positive-change";
                } else if (parseFloat(change) < 0) {
                    changeClass = "negative-change";
                } else {
                    changeClass = "no-change";
                }
                var table;
                if (index < coins.length / 3) {
                    table = tables[0];
                } else if (index < (coins.length / 3) * 2) {
                    table = tables[1];
                } else {
                    table = tables[2];
                }

                table.innerHTML += `
                        <tr>
                        <td> 
                            <div><img src="${coin.iconUrl}" width="32" height="32"></div> 
                            <div class="name">${name}</div> 
                            <div>(${symbol})</div></td>
                        <td class="change ${changeClass}"> 
                            <div id="change-ratio">${change}</div>
                        </td>
                        <td>$${price}</td>
                        </tr>
                    `;
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

fetchDataAndUpdateTables();
setInterval(fetchDataAndUpdateTables, 60000);

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('name')) {
        const coinName = event.target.textContent.trim(); 
        fetch('https://api.coinranking.com/v2/coins')
            .then(response => response.json())
            .then(data => {
                const coins = data.data.coins;
                const coin = coins.find(coin => coin.name === coinName);
                if (coin) {
                    const coinrankingUrl = coin.coinrankingUrl;
                    window.open(coinrankingUrl, '_blank');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

