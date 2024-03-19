var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");
var table3 = document.getElementById("table3");

function getData(callback) {
    var stockList = [];
    fetch("https://www.sabah.com.tr/json/canli-borsa-verileri")
        .then(response => {
            return response.text();
        }).then(data => {
            var stockData = data.split("~");
            stockData.forEach(e => {
                stockList.push(e);
            });
            callback(stockList);
        })
};

function loadDataToTable(stockList) {
    var tables = [table1, table2, table3];
    var tableData = [
        `<tr>
            <th>Hisse</th>
            <th>Fiyat</th>
            <th>Oran</th>
            <th>Zaman</th>
         </tr>`,
        `<tr>
            <th>Hisse</th>
            <th>Fiyat</th>
            <th>Oran</th>
            <th>Zaman</th>
         </tr>`,
        `<tr>
            <th>Hisse</th>
            <th>Fiyat</th>
            <th>Oran</th>
            <th>Zaman</th>
         </tr>`
    ];

    var tableIndex = 0;
    var rowCount = Math.ceil(stockList.length / 3);

    for (let i = 1; i < stockList.length - 1; i++) {
        var row = stockList[i].split("|");
        let changeValue = parseFloat(row[2].replace(',', '.'));
        if (changeValue > 0) {
            changeClass = "positive-change";
        } else if (changeValue < 0) {
            changeClass = "negative-change"
        } else {
            changeClass = "no-change"
        }

        tableData[tableIndex] +=
            `<tr>
                <td class="stock">${row[0]}</td>
                <td class="price">${row[1]}</td>
                <td class="change ${changeClass}"> 
                    <div id="change-ratio">${changeValue}</div>
                </td>
                <td class="time">${row[3]}</td>
             </tr>`;

        if ((i + 1) % rowCount === 0 && tableIndex < 2) {
            tableIndex++;
        }
    }

    tables.forEach((table, index) => {
        table.innerHTML = tableData[index];
    });
}

getData(loadDataToTable);
setInterval(() => {
    getData(loadDataToTable);
}, 1000);

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('stock')) {
        const stockName = event.target.textContent.trim().toLowerCase();
        url = `https://www.sabah.com.tr/finans/borsa/hisse-senetleri/${stockName}`;
        window.open(url, '_blank');

    }
});
