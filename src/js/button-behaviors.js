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

// to change card view
let toChangeViewCard = (ob)=>{
  let id = ob.getAttribute("id");
  let styleTypeCard =  "view-type--option";
  let styleTypeCardSelected ="view-type--option view-type--selected";

  
  //view-type--option
  if(id === "cardBlockView"){
    document.getElementById("cardListView").setAttribute("class", styleTypeCard);
    ob.setAttribute("class", styleTypeCardSelected);
    document.getElementById("cssCard").setAttribute('href', "");
  }else{
    document.getElementById("cardBlockView").setAttribute("class", styleTypeCard);
    ob.setAttribute("class", styleTypeCardSelected);
    document.getElementById("cssCard").setAttribute('href', "../src/css/blog_cards.css");
  }

}


//to see filters
let toSeeFilters = ()=>{
  if(!isFilterBoxVisible){
    document.getElementById("filterBox").style.height = '240px';
    document.getElementById("letSeeButton").textContent = 'Ocultar Filtro';
    isFilterBoxVisible = true;
  }else{
    document.getElementById("filterBox").style.height = '0';
    document.getElementById("letSeeButton").innerText = 'Ver Filtros';
    isFilterBoxVisible = false;
  }
}

//filter with checkbox
let toFilterCheckbox = (obj)=>{
  let val = parseInt(obj.getAttribute("value"));
  if(!obj.checked){
    //dejamos en global data solo lo que no coincida y los que conincida lo pasamos a los filtrados
    globalData.results = globalData.results.filter((post)=> {
      if(post.tag.includes(val)){
        globalDataFiltered.push(post)
        return false
      }else{
        return true
      }
    });
  }else{
    let stayFiltered=[];
    let goBackData = globalDataFiltered.filter(post => {
      if(post.tag.includes(val)){
        return true
      }else{
        stayFiltered.push(obj)
        return false
      }
    });
    globalDataFiltered = stayFiltered;
    globalData.results = globalData.results.concat(goBackData);
  }
  document.getElementById("postsContainer").innerHTML="";
  setCardPosts(globalData);
}

//Ordenar por mas reciente o más viejo
let toOrderBy = obj =>{
  let val = obj.value;
  let dateAr;
  if(val === "newest"){
    globalData.results.sort((a,b)=>{
      let aDate = dateStringToNewDate(a.postDate)//surge problemas de precisión si pongo el string de la fecha directo
      let bDate = dateStringToNewDate(b.postDate)
      if (aDate > bDate) {
        return -1;
      }
      if (aDate < bDate) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
  }else{
    globalData.results.sort((a,b)=>{
      let aDate = dateStringToNewDate(a.postDate);
      let bDate = dateStringToNewDate(b.postDate);
      if (aDate > bDate) {
        return 1;
      }
      if (aDate < bDate) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  }
  document.getElementById("postsContainer").innerHTML="";
  setCardPosts(globalData);
}


let toFilterPostDates = (objAr, stardateStr = "2020-12-01", endDateStr = "2020-12-31") =>{
  let filterStartDate = dateStringToNewDate(stardateStr);
  let filterEndDate = dateStringToNewDate(endDateStr);

  return objAr.filter((post)=> {
    let postDate = dateStringToNewDate(post.postDate);

    if(filterStartDate <= postDate && postDate <= filterEndDate){
      return true
    }else{
      return false
    }
  });
}

//filtrar por tope de fecha
let toFilterDate = obj =>{
  
  let dateFilter = document.getElementsByName("dateFilter")//en un array los dos input de fecha
  let dataResum = toFilterPostDates(globalData.results, dateFilter[0].value, dateFilter[1].value)

  if(obj.getAttribute("id") === "startDate"){
    dateFilter[1].setAttribute("min", obj.value)
  }
  document.getElementById("postsContainer").innerHTML="";
  setCardPosts(dataResum, globalData.info.allTagsList);
}


//TO DO: 
/**
 * Falta revisar el filtro por fhecha desde hasta, No se está filtrando bien, después la integración
 */