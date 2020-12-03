
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

const API = 'https://dl.dropboxusercontent.com/s/je93m93gb18ojlp/informacion.json'

fetchData(API)
    .then(data => {
        let projects = data.projects
        let portfolio = document.getElementById('portfolio-container')
        for (let project of projects) {
            let projectHtml = `
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
                        <a class="project__link" href="${project.url}"> Ver aquí >></a>
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
            console.log(project);
            //console.log(portfolio.innerHTML);
            portfolio.innerHTML += projectHtml;

        }

        /******* Rellenando parte de  estudios*/
        let studies = data.studies
        let studiesContainer = document.getElementById('studiesContainer')
        for (let study of studies) {
            let studyHtml = `
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
            studiesContainer.innerHTML += studyHtml;

        }
        

    })
    .catch(err => console.log(err))


/******* Rellenando parte de  estudios*/
