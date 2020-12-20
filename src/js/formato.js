//variables para uso global
let globalData;
let globalDataFiltered=[];
let loadingDiv = `<div class="lds-dual-ring"></div>`;
//Funcion para contener las promesas que tendrá al httprequest
const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
    
        xhttp.open('GET',url_api , true) 
        xhttp.onreadystatechange =( () => { 
            if(xhttp.readyState === 4){
                console.log("El estatus es: ", xhttp.status);//es necesario este punto y coma antes de la condicional ternario
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error', url_api))
            }
        })
        xhttp.send()
    })
}


/**Ejemplo para utilizar httprequest con la Promesas creada*/
/*

const API = 'https://rickandmortyapi.com/api/character/'

fetchData(API)
    .then(data => {
        console.log("Al menos ingreso o algo parecido");
        console.log(data.info.count);
        return fetchData(`${API}${data.results[0].id}`) //devuelve una nueva promesa con la siguiente peticion
    })
    .then(data => {
        console.log(data.name)
        return fetchData(data.origin.url)
    })
    .then(data => {
        console.log(data.dimension);
    })
    .catch(err => console.log(err))

*/

let indexPetitions = ()=>{
const API = 'https://dl.dropboxusercontent.com/s/je93m93gb18ojlp/informacion.json'

fetchData(API)
    .then(data => {
        let projects = data.projects
        let portfolio = document.getElementById('portfolio-container')
        let htmlContent = "";
        
        portfolio.innerHTML = loadingDiv;

        for (let project of projects) {
            htmlContent += `
            <article class="project">
                <div class="project__details">
                    <h3 class="project__name"> ${project.name} </h3>
                    <p class="project__info">
                        <small class="project__date">Fecha: <span project__exact-date>${project.date}</span></small>
                    </p>

                    <p class="project__description">
                        ${project.description}
                    </p>
                    <p class="project__ubication">
                        <a class="project__link" href="${project.url}"> Ver más >></a>
                    </p>
                </div>

                <div class="project__photo">
                    <figure class="project__figure">
                        <img class="project__img" src="${project.img}" alt="${project.imgDescription}">
                        <figcaption class="project__figcaption">
                        ${project.resources}
                        </figcaption>
                    </figure>
                </div>
                
            </article>`
            //console.log(portfolio.innerHTML);
        }
        portfolio.innerHTML = htmlContent;

        /******* Rellenando parte de  estudios*/
        let studies = data.studies;
        let studiesContainer = document.getElementById('studiesContainer');
        //studiesContainer.innerHTML = ``
        htmlContent="";
        for (let study of studies) {
            htmlContent += `
                <div class="card1">
                    <figure class="card1__figure">
                        <figcaption class="card1__figcaption">
                            <h5 class="card1__h5"> ${study.ubication} </h5>
                        </figcaption>
                        <img class="card1__img" src="${study.img}" alt="${study.imgDescription}">
                    </figure>
                    <div class="card1__details">
                        <h4 class="card1__title">
                            ${study.name}
                        </h4>
                        <div class="card1__description">
                            <p class="card1__p">
                                <small class="card1__date">Fecha Inicio: ${study.startDate}</small>
                            </p>
                            <p class="card1__p">
                                <small class="card1__date">Fecha Finalizado: ${study.endDate}</small>
                            </p>
                            <p class="card1__p">
                                ${study.description}
                            </p>

                        </div>
                    </div>
                </div>`
                
            //console.log(portfolio.innerHTML);
            
        }
        studiesContainer.innerHTML = htmlContent;
        

    })
    .catch(err => console.log(err))
/******* Rellenado parte de  estudios*/
    
}





// el formato input fr la fecha "YYYY-MM-DD" salida es [YYYY, MM-1, DD]
let dateStringToNewDate = dateString => {
    let dateAr = dateString.split("-").map((elem,index) =>{
        if(index === 1) elem-=1 //los meses son considerados de 0-11
        return parseInt(elem)
    });
    return new Date(dateAr[0], dateAr[1], dateAr[2]);
};
//console.log(dateStringToArrayNum("2020-12-01"));
let dateNumberToString = date =>{
    const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return `${date.getDate()} de ${MONTHS[date.getMonth()]} del ${date.getFullYear()}`
}


/**Operaciones con arrays */


/* */

//para colocar los checkbox con los tags para filtrar
let setCheckboxTagsFilter = (tagsList)=>{
    let filterTags = document.getElementById("filterTags");
    let htmlContent="";
    //insertando tags en el filtro
    tagsList.forEach((element,index) => {
        htmlContent+=
        `   <div class="filter__checkbox">
                <input type="checkbox" id="${element}" class="label__check" name="checkboxTags" onclick="toFilterCheckbox(this)" value="${index}" checked>
                <label for="${element}" class="filter__label2">${element}</label>
            </div>
        `;
    });
    filterTags.innerHTML = htmlContent;
}

//startDate and endDate : strting
let setDateFilterRange = (startDateStr, endDateStr)=>{
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");

    startDate.setAttribute("min", startDateStr);
    startDate.setAttribute("max", endDateStr);
    startDate.value = startDateStr;

    endDate.setAttribute("min", startDateStr);
    endDate.setAttribute("max", endDateStr);
    endDate.value = endDateStr;
}

// Para renderizar lo que nos servirá para filtrar
let setCardPosts = (posts=[], allTags=globalData.info.allTagsList) =>{
    let postsContainer = document.getElementById("postsContainer");
    let htmlContent="";
    //insertando los cards de las publicaciones
    for(let post of posts){
        let tag = post.tag.map(tagId => allTags[tagId]);
        let tagText = tag.join(", ");
        let newDate = dateStringToNewDate(post.postDate);
        htmlContent +=
        `   <a class="linkcard" href="${post.url}">
                <div class="card1">
                    <figure class="card1__figure">
                        <figcaption class="card1__figcaption">
                            <h5 class="card1__h5">${post.title}</h5>
                        </figcaption>
                        <img class="card1__img" src="${post.img.url}" alt="${post.img.alt}">
                    </figure>
                    <div class="card1__details">
                        <div class="card1__description">
                            <p class="card1__p">
                                <small class="card1__date">Fecha: ${dateNumberToString(newDate)}</small>
                                <small class="card1__tags">Tags: ${tagText} </small>
                            </p>
                            <p class="card1__p">
                                ${post.description}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
    postsContainer.innerHTML = htmlContent;
}

/** PAra obtener las publicaciones de blog */
let blogListPetitions = ()=>{
    const URL = "https://dl.dropboxusercontent.com/s/nf60hpb352p7bpc/postsList.json"

    fetchData(URL)
        .then(data =>{
            globalData = data;
            toOrderPost(globalData.results);
            setCheckboxTagsFilter(data.info.allTagsList);
            setDateFilterRange(data.info.firstPublicationDate, data.info.lastPublicationDate)
            setCardPosts(data.results, data.info.allTagsList);
        })
        .catch(err => console.log(err))
}
