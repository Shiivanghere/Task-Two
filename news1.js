let key = "d320813705a54a25aac103bb7e0126c6";
let cardData = document.querySelector(".cardData");
let searchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let hamburger = document.getElementById("hamburger");
let navLinks = document.getElementById("nav-links");
let current = 1;
let overallPages = 0;
const pagedimensions = 5;
let presentSearch = "india";
  



const getData = async (input) => {
  let res = await fetch(
    `https://newsapi.org/v2/everything?q=${input}&apiKey=${key}&pageSize=${pagedimensions}&page=${current}`
  );
  let jsonData = await res.json();
  overallPages = jsonData.totalResults;
  inputData.value = "";
  cardData.innerHTML = "";

  jsonData.articles.forEach(function (article) {
    let divs = document.createElement("div");
    divs.classList.add("card");
    cardData.appendChild(divs);
    divs.innerHTML =
      '<img src="' +
      article.urlToImage +
      '" alt="">' +
      "<h3>" +
      article.title +
      "</h3>" +
      "<br>" +
      "<h4><b>" +
      article.author +
      "</b></h4>" +
      "<h4>" +
      article.publishedAt +
      "</h4>" +
      "<p>" +
      article.description +
      "</p>";

    divs.addEventListener("click", function () {
      localStorage.setItem("articleData", JSON.stringify(article));
      window.location.href = "article.html";
    });
  });

  watchpage();
};



const watchpage = () => {
  let paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";
  let totalPages = Math.ceil(overallPages / pagedimensions);
  let startPage = Math.max(1, current - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (current > 1) {
    let previous = document.createElement("button");
    previous.innerText = "Previous";
    previous.onclick = () => {
      current--;
      getData(presentSearch);
    };
    paginationDiv.appendChild(previous);
  }
  for (let i = startPage; i <= endPage; i++) {
    let pagebtn = document.createElement("button");
    pagebtn.innerText = i;
    pagebtn.onclick = () => {
      current = i;
      getData(presentSearch);
    };

    if (i === current) {
      pagebtn.style.fontWeight = "bold";
    }
    paginationDiv.appendChild(pagebtn);
  }
  if (current < totalPages) {
    let nextbtn = document.createElement("button");
    nextbtn.innerText = "Next";
    nextbtn.onclick = () => {
      current++;
      getData(presentSearch);
    };
    paginationDiv.appendChild(nextbtn);
  }
};




window.addEventListener("load", function () {
  getData("india");
});

window.addEventListener("load", function () {
  const loader = this.document.querySelector(".loader");
  loader.classList.add("loader-hidden");
});

searchBtn.addEventListener("click", function () {
  presentSearch = inputData.value;
  current = 1;
  getData(presentSearch);
});
function navClick(navName) {
  current = 1;
  presentSearch = navName;
  getData(navName);
}



hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
