console.log("connected");
console.log(document);

/*Marquee*/
const marqueeUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com//api/v3/quotes/nyse`;

fetch(marqueeUrl)
  .then((response) => response.json())
  .then((data) => {
    const currentStocksList = document.getElementById("marqueeWrapper");
    for (let i = 0; i < 100; i++) {
      /*symbols marquee*/
      const symbolsMarquee = document.createElement("div");
      symbolsMarquee.textContent = `${data[i].symbol}`;
      symbolsMarquee.classList.add("symbol-marquee");

      /*price marquee*/
      const priceMarquee = document.createElement("div");
      if (priceMarquee < 0) {
        priceMarquee.classList.add("changeNegative");
      } else {
        priceMarquee.classList.add("changePositive");
      }
      symbolsMarquee;
      priceMarquee.textContent = `$` + `${data[i].price}`;
      priceMarquee.classList.add("price-marquee");

      console.log(symbolsMarquee);
      console.log(priceMarquee);

      currentStocksList.append(symbolsMarquee, priceMarquee);
    }

    const userText = document.getElementById("userInput");
    console.log(userText);
    const getStocks = () => {
      resultsWrapper.innerHTML = "";
      loadingSpinner.style.display = "flex";
      const userInput = userText.value;
      console.log(userInput);

      const stocksUrl =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
        userInput +
        "&limit=10&exchange=NASDAQ";

      fetch(stocksUrl)
        .then((response) => response.json())
        .then((data) => {
          loadingSpinner.style.display = "none";
          const resultsWrapper = document.getElementById("resultsWrapper");
          console.log(resultsWrapper);
          for (let i = 0; i <= data.length - 1; i++) {
            console.log(data[i]);

            /*Create Results List*/
            const resultsList = document.createElement("div");
            resultsList.classList.add("results-list");
            console.log(resultsList);

            /*Create company name*/
            const companyNameSearchbar = document.createElement("a");
            companyNameSearchbar.href = `./html/company.html?symbol=${data[i]["symbol"]}`;
            companyNameSearchbar.target = "_blank";
            companyNameSearchbar.textContent = data[i]["name"];
            companyNameSearchbar.classList.add("company-name");

            /*Create Symbols*/
            const symbols = document.createElement("div");
            symbols.textContent = `(` + `${data[i].symbol} ` + `)`;
            symbols.classList.add("symbols");
            resultsList.append(companyNameSearchbar, symbols);
            resultsWrapper.append(resultsList);
            console.log(resultsWrapper);

            /*Side Fetch (images and changes Percentage)*/
            const sideURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;
            fetch(sideURL)
              .then((companyResponse) => companyResponse.json())
              .then((companyData) => {
                /*Company Image Searchbar*/
                let imageWrapper = document.createElement("div");
                let companyImageSearch = document.createElement("img");
                companyImageSearch.classList.add("company-image-search");
                resultsList.prepend(companyImageSearch);
                companyImageSearch.append(imageWrapper);
                companyImageSearch.src = companyData.profile.image;
                companyImageSearch.onerror = function () {
                  this.onerror = null;
                  this.src = "../images/noimageerror.jpg";
                };
                console.log(imageWrapper);

                /*Stock Changes Searchbar*/
                let stockChangesSearchbar = document.createElement("div");
                const fixedPercentageSearchbar = parseFloat(
                  companyData.profile.changesPercentage
                ).toFixed(2);
                if (fixedPercentageSearchbar < 0) {
                  stockChangesSearchbar.classList.add("changeNegative");
                } else {
                  stockChangesSearchbar.classList.add("changePositive");
                }
                stockChangesSearchbar.textContent = `( ${fixedPercentageSearchbar} % )`;
                stockChangesSearchbar.classList.add("stock-changes-searchbar");

                /*Highlight*/
                companyNameSearchbar.append(stockChangesSearchbar);
                resultsList.append(stockChangesSearchbar);
                companyNameSearchbar.append(symbols);

                let match = RegExp(userInput, "gi");
                let str = companyNameSearchbar.innerText;
                let newStr = str.replace(match, `<mark>$&</mark>`);
                companyNameSearchbar.innerHTML = newStr;
              });
          }
        });
    };

    const buttonClick = document.getElementById("buttonClick");

    buttonClick.addEventListener("click", getStocks);

    const loadingSpinner = document.getElementById("loading");
  });
