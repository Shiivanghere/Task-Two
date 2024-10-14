let key = "d320813705a54a25aac103bb7e0126c6" ;
let cardData = document.querySelector(".cardData");
let searchBtn = document.getElementById("searchBtn") ;
let inputData = document.getElementById("inputData") ;

const getData= async(input) =>{
    let res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
    let jsonData = await res.json();
    console.log(jsonData.articles);

    inputData.value="";
    cardData.innerHTML = "";

    jsonData.articles.forEach(function(article){
        console.log(article);

        let divs = document.createElement("div");
    divs.classList.add("card");
    cardData.appendChild(divs);

    divs.innerHTML=`
    <img src="${article.urlToImage}" alt="">
                <h3>${article.title}</h3>
                <p>${article.description}</p>`

                divs.addEventListener("click" , function(){
                    window.open(article.url) ;
                })
    })

}

window.addEventListener("load" , function(){
    getData("india") ;
})

searchBtn.addEventListener("click" , function(){
    let inputText = inputData.value ;
    getData(inputText);
})



function navClick(navName){
    getData(navName) ;
}