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


//to see filters | ver las opciones de filtro
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


let toFilterCheckboxAr = (objAr = []) =>{
  let checkboxTags = [...document.getElementsByName("checkboxTags")].filter(input => input.checked);
  
  return objAr.filter( post => {
    for (const checkbox of checkboxTags) {
      if(post.tag.includes(parseInt(checkbox.value)))
        return true; //se prioriza los tags checked antes que los no checked
    }
    return false;
  });
}

//filter with checkbox
let toFilterCheckbox = (obj)=>{
  
  let results = toFilterCheckboxAr(globalData.results);
  
  results = toFilterPostDates(results, document.getElementsByName("dateFilter"));

  document.getElementById("postsContainer").innerHTML="";
  setCardPosts(results);
}

//Ordenar por mas reciente o más viejo
let toOrderPost = (objAr = [], orderByNewest = true) =>{
  objAr.sort((a,b)=>{
    let aDate = dateStringToNewDate(a.postDate)//surge problemas de precisión si pongo el string de la fecha directo
    let bDate = dateStringToNewDate(b.postDate)
    if (aDate < bDate) {
      return orderByNewest? 1 : -1;
    }
    if (aDate > bDate) {
      return orderByNewest? -1 : 1;
    }
    // a must be equal to b
    return 0;
  });
}

//capturar la accion de ordenar
let toOrderBy = obj =>{
  toOrderPost(globalData.results, obj.value === "newest");
  
  let postFiltered = toFilterPostDates(globalData.results, document.getElementsByName("dateFilter"));
  postFiltered = toFilterCheckboxAr(postFiltered);

  document.getElementById("postsContainer").innerHTML="";
  setCardPosts(postFiltered);
}


let toFilterPostDates = (objAr, dateFilterAr) =>{
  let filterStartDate = dateStringToNewDate(dateFilterAr[0].value);
  let filterEndDate = dateStringToNewDate(dateFilterAr[1].value);

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
  if(obj.value == "") return -1; // si el cambio es una fecha vacía, se evita que se actualice con nada
  let dateFilter = document.getElementsByName("dateFilter")//en un array los dos input de fecha
  let dataResum = toFilterPostDates(globalData.results, dateFilter);
  dataResum = toFilterCheckboxAr(dataResum);
  
  if(obj.getAttribute("id") === "startDate"){
    dateFilter[1].setAttribute("min", obj.value);
  }else{
    dateFilter[0].setAttribute("max", obj.value);
  }
  document.getElementById("postsContainer").innerHTML="";
  setCardPosts(dataResum, globalData.info.allTagsList);

}


//TO DO: 
/**
 * Falta revisar el filtro por fhecha desde hasta, No se está filtrando bien, después la integración
 */