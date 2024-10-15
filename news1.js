let key = "d320813705a54a25aac103bb7e0126c6";
let cardData = document.querySelector(".cardData");
let searchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let hamburger = document.getElementById("hamburger");
let navLinks = document.getElementById("nav-links");

const getData = async (input) => {
  let res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
  let jsonData = await res.json();
  console.log(jsonData.articles);

  inputData.value = "";
  cardData.innerHTML = "";

  jsonData.articles.forEach(function (article) {
    console.log(article);

    let divs = document.createElement("div");
    divs.classList.add("card");
    cardData.appendChild(divs);

    divs.innerHTML = `
      <img src="${article.urlToImage}" alt="">
      <h3>${article.title}</h3>
      <br>
      <h4><b>${article.author}</b></h4>
      <h4>${article.publishedAt}</h4>
      <p>${article.description}</p>`;

    divs.addEventListener("click", function () {
      window.open(article.url);
    });
  });
};

window.addEventListener("load", function () {
  getData("india");
});

window.addEventListener("load" , function(){
    const loader=this.document.querySelector(".loader");
    loader.classList.add("loader-hidden");
})

searchBtn.addEventListener("click", function () {
  let inputText = inputData.value;
  getData(inputText);
});

function navClick(navName) {
  getData(navName);
}


hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
