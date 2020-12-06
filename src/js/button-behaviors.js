//Get the button
var mybutton = document.getElementById("go-up-button");
let isFilterBoxVisible = false;
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    //mybutton.style.display = "block";
    mybutton.style.transform = "scale(1)";
  } else {
    //mybutton.style.display = "none";
    mybutton.style.transform = "scale(0)";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//to see filters
let toSeeFilters = ()=>{
  if(!isFilterBoxVisible){
    document.getElementById("filterBox").style.height = '240px';
    document.getElementById("letSeeButton").textContent = 'Ocultar Filtro';
    document.getElementById("cssCard").setAttribute('href', "");
    isFilterBoxVisible = true;
  }else{
    document.getElementById("filterBox").style.height = '0';
    document.getElementById("letSeeButton").innerText = 'Ver Filtros';
    document.getElementById("cssCard").setAttribute('href', "../src/css/blog_cards.css");
    isFilterBoxVisible = false;
  }
}