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
      dateAr = dateStringToArrayNum(a.postDate)
      let aDate = new Date(dateAr[0],dateAr[1],dateAr[2]);//surge problemas de precisión si pongo el string de la fecha directo
      dateAr = dateStringToArrayNum(b.postDate)
      let bDate = new Date(dateAr[0],dateAr[1],dateAr[2]);
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
      dateAr = dateStringToArrayNum(a.postDate)
      let aDate = new Date(dateAr[0],dateAr[1],dateAr[2]);
      dateAr = dateStringToArrayNum(b.postDate)
      let bDate = new Date(dateAr[0],dateAr[1],dateAr[2]);
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

//filtrar por tope de fecha
let toFilterDate = obj =>{
  console.log("Ingresa: ", obj.value);
  let dateAr; //la fecha el array
  let date; //para obtener la fecha de cada post
  dateAr = dateStringToArrayNum(obj.value);
  let filterDate = new Date(dateAr);
  console.log("dateAr: ", dateAr);
  console.log("filerDate:",filterDate);
  console.log("ID:: ",obj.getAttribute("id"));
  
  if(obj.getAttribute("id") === "startDate"){
    globalData.results = globalData.results.filter((post)=> {
      console.log("-------------------------------------------------------------------------------------");
      dateAr = dateStringToArrayNum(post.postDate);
      console.log("dateAr: ", dateAr);
      date = new Date(dateAr);
      console.log("date: ", date);
      console.log("if date<filterDate: ", date, " < ", filterDate, " = ", date<filterDate);
      if(date < filterDate){
        globalDataFiltered.push(post);
        return false
      }else{
        return true
      }
    });

  }else{
    globalData.results = globalData.results.filter((post)=> {
      dateAr = dateStringToArrayNum(post.postDate);
      date = new Date(dateAr);
      if(date > filterDate){
        globalDataFiltered.push(post);
        return false
      }else{
        return true
      }
    });
  }
  document.getElementById("postsContainer").innerHTML="";
  setCardPosts(globalData);
}
//TO DO: 
/**
 * Falta revisar el filtro por fhecha desde hasta, No se está filtrando bien, después la integración
 */