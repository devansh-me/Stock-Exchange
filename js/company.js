const titleText = window.location.search.replace("?symbol=", "");

const title = document.getElementById("title");
title.textContent = titleText;

let companyInfo = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${titleText}`;
fetch(companyInfo)
  .then((response) => response.json())
  .then((data) => {
    let pageCompanyWrapper = document.getElementById("pageCompanyWrapper");
    console.log(pageCompanyWrapper);

    /*company image*/
    let companyImage = document.getElementById("companyImage");
    companyImage.src = data.profile.image;
    companyImage.onerror = function () {
      this.onerror = null;
      this.src = "../images/noimageerror.jpg";
    };
    pageCompanyWrapper.append(companyImage);

    /*company name*/
    let companyName = document.getElementById("companyName");
    companyName.textContent = data.profile.companyName;
    companyName.href = data.profile.website;
    pageCompanyWrapper.append(companyName);

    /*company description*/
    let companyDescription = document.getElementById("companyDescription");
    companyDescription.innerHTML = data.profile.description;
    pageCompanyWrapper.append(companyDescription);

    /*stock price*/
    let stockPrice = document.getElementById("stockPrice");
    stockPrice.innerHTML = `Stock Price: $` + data.profile.price;
    pageCompanyWrapper.append(stockPrice);

    /*stock changes*/
    let stockChanges = document.getElementById("stockChangesPercentage");

    /*turn the string into a number and fixed the decimals*/
    const fixedPercentage = parseFloat(data.profile.changesPercentage).toFixed(
      2
    );
    if (fixedPercentage < 0) {
      stockChanges.classList.add("changeNegative");
    } else {
      stockChanges.classList.add("changePositive");
    }
    stockChanges.textContent = `( ${fixedPercentage} % )`;
    pageCompanyWrapper.append(stockChanges);
  });

/*Chart*/
let chartStockPrice = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${titleText}?serietype=line`;
let labels = [];
let chartData = [];
fetch(chartStockPrice)
  .then((response) => response.json())
  .then((data) => {
    let ctx = document.getElementById("myChart").getContext("2d");
    for (i = 0; i < 15; i++) {
      labels.unshift(data.historical[i].date);
      chartData.unshift(data.historical[i].close);
    }
    const myData = {
      labels: labels,
      datasets: [
        {
          label: "Stock Price History",
          data: chartData,
          fill: true,
          borderColor: "rgb(158, 187, 231)",
          backgroundColor: "rgb(197, 216, 245)",
          tension: 0.1,
        },
      ],
    };
    let myChart = new Chart(ctx, {
      type: "line",
      data: myData,
    });
    console.log(data);
  });
