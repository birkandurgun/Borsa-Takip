const CURRENCIES = [
    { code: "AUD", currency: "Avustralya Doları" },
    { code: "BGN", currency: "Bulgar Levası" },
    { code: "BRL", currency: "Brezilya Reali" },
    { code: "CAD", currency: "Kanada Doları" },
    { code: "CHF", currency: "İsviçre Frangı" },
    { code: "CNY", currency: "Çin Yuanı" },
    { code: "CZK", currency: "Çek Korunası" },
    { code: "DKK", currency: "Danimarka Kronu" },
    { code: "EUR", currency: "Euro" },
    { code: "GBP", currency: "İngiliz Sterlini" },
    { code: "HKD", currency: "Hong Kong Doları" },
    { code: "HUF", currency: "Macar Forinti" },
    { code: "IDR", currency: "Endonezya Rupisi" },
    { code: "ILS", currency: "İsrail Şekeli" },
    { code: "INR", currency: "Hint Rupisi" },
    { code: "ISK", currency: "İzlanda Kronası" },
    { code: "JPY", currency: "Japon Yeni" },
    { code: "KRW", currency: "Güney Kore Wonu" },
    { code: "MXN", currency: "Meksika Pezosu" },
    { code: "MYR", currency: "Malezya Ringiti" },
    { code: "NOK", currency: "Norveç Kronu" },
    { code: "NZD", currency: "Yeni Zelanda Doları" },
    { code: "PHP", currency: "Filipin Pezosu" },
    { code: "PLN", currency: "Polonya Zlotisi" },
    { code: "RON", currency: "Rumen Leyi" },
    { code: "SEK", currency: "İsveç Kronu" },
    { code: "SGD", currency: "Singapur Doları" },
    { code: "THB", currency: "Tay Bahtı" },
    { code: "TRY", currency: "Türk Lirası" },
    { code: "USD", currency: "Amerikan Doları" },
    { code: "ZAR", currency: "Güney Afrika Randı" }
];

function loadSelectOptions() {
    var fromSelect = document.getElementById("from");
    var toSelect = document.getElementById("to");

    CURRENCIES.forEach(function (currency) {
        var option1 = document.createElement("option");
        option1.value = currency.code;
        option1.textContent = currency.code + " - " + currency.currency;
        var option2 = option1.cloneNode(true);

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);

        if (currency.code === 'USD') {
            option1.selected = true;
        }
        
        if (currency.code === 'TRY') {
            option2.selected = true;
        }
    });
}

function convert() {
    const fromCurrency = document.getElementById("from").value;
    const toCurrency = document.getElementById("to").value;
    const amount = parseFloat(document.getElementById("fromAmount").value);
    
    const API_URL = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            document.getElementById("toAmount").value = rate.toFixed(4);
        })
        .catch(error => {

        });
}

function convert2() {
    const fromCurrency = document.getElementById("from").value;
    const toCurrency = document.getElementById("to").value;
    const amount = parseFloat(document.getElementById("toAmount").value);
    
    const API_URL = `https://api.frankfurter.app/latest?amount=${amount}&from=${toCurrency}&to=${fromCurrency}`;
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[fromCurrency];
            document.getElementById("fromAmount").value = rate.toFixed(4);
        })
        .catch(error => {
            
        });
}

function clearValues(){
    document.getElementById("fromAmount").value = "";
    document.getElementById("toAmount").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    var fromAmount = document.getElementById("fromAmount");
    var toAmount = document.getElementById("toAmount");
    
    var fromCurrency = document.getElementById("from");
    var toCurrency = document.getElementById("to");
    
    loadSelectOptions();

    fromAmount.addEventListener("input", convert);
    toAmount.addEventListener("input", convert2);

    fromAmount.addEventListener("click", clearValues);
    toAmount.addEventListener("click", clearValues);

    fromCurrency.addEventListener("change", convert);
    toCurrency.addEventListener("change", convert2);

    
});

