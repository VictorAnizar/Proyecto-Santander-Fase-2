import { get } from "jquery";
import "../css/styles.scss";
//funcion "main"
window.addEventListener('load', function () {

    //Se van a listar 8 filas de recetas de comida<
    //for (let index = 1; index <= 2; index++) {
    (crearFilaRecetas());
    //}



});
//listeners o escuchadores que estan a la espera de cerrar el modal
let modal = document.querySelector("#modal");
let card_modal = document.createElement("div");
card_modal.classList.add("modal-content");
document.querySelector("#section_lista").appendChild(card_modal);

//si se le da al boton cerrar
document.querySelector(".close").addEventListener('click', function () {
    modal.style.display = "none";
    document.querySelector(".modal-content").style.display = "none";
});
//si se le da click en cualquier lugar que no sea el area de receta
modal.addEventListener('click', function () {
    modal.style.display = "none";
    document.querySelector(".modal-content").style.display = "none";
});

function getCategories() {
    return fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(
            (data) => data.json()
        );
}

//funcion para hacer fetch a la API
function getRecetaRandom() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(
            (data) => data.json()
        );
}

//Funcion para crear filas ordenadas de 5 columnas
function crearFilaRecetas() {
    const div_row = document.createElement("div");
    div_row.classList.add("row");
    const card = [];
    for (let i = 0; i < 5; i++) {

        getRecetaRandom()
            .then(
                data => {
                    return creaTarjetaReceta(data);
                }
            )
            .then(function (div_card) {

                //Creamos un nuevo div que funciona como celda
                const div_col = document.createElement("div");
                div_col.classList.add("col", "container-box-padding");
                //Añadimos la tarjeta que recibimos a un nuevo div que funciona como celda
                div_col.appendChild(div_card);
                //Añadimos la nueva celda a la fila
                div_row.appendChild(div_col);
                //Enviamos la fila
                // return div_row;
                //}).then(function (div_rowF) {
                //Esperamos a que la fila se llene para añadirla al documento

                document.querySelector("#section_lista").appendChild(div_row);
                return div_card;
            })
            .then(
                div_card => {
                    card.push(div_card);
                }
            );
    }
    return card;

}


//funcion que crea una tarjeta de receta y la agrega al div de recectas 
//la creacion de esta tarjeta esta basada en las tarjetas que nos ofrece bootstrap
//las clases que se agregan son las que usa Bootstrap
function creaTarjetaReceta(data) {
    console.log(data);
    //se ccrea el elemento div
    let div_card = document.createElement("div");
    //se le agrega la clase al elemento div creado
    div_card.classList.add("card");
    //se crea un elemento imagen
    let img_card = document.createElement("img");
    img_card.src = data.meals[0].strMealThumb;
    //se le agregan clases a la imagen
    img_card.classList.add("card-img-top");
    //se introduce como hijo la imagen al div creado
    div_card.appendChild(img_card);
    //se crea el div del cuerpo de la tarjeta
    let div_body = document.createElement("div");
    //se le agrega la clase
    div_body.classList.add("card-body");
    //se introduce como hijo el div_body al div_card
    div_card.appendChild(div_body);
    //Se crea un div para el titulo
    let div_title = document.createElement("div");
    //se le agrega la clase
    div_title.classList.add("card-title");
    //se crea el titulo
    let h5 = document.createElement("h5");
    //se le agrega el nombre de la comda al titulo
    h5.append(data.meals[0].strMeal);
    //se agrega el titulo como hijo de div_title
    div_title.appendChild(h5);
    //se agrega div_title como hijo de div_body
    div_body.appendChild(div_title);
    //se crea el parafo de la comida
    let p = document.createElement("p");
    p.append("Categoría: " + data.meals[0].strCategory);
    //se agregan las clases al parrafo
    p.classList.add("card-text");
    //se agrega el parrafo como hijo del div_body
    div_body.appendChild(p);
    //se crea el boton de la comida
    let span = document.createElement("span");
    //se agregan las clases al boton
    // span.classList.add("btn");
    // span.classList.add("btn-primary");

    //se agrega el parrafo como hijo del div_body
    div_body.appendChild(span);
    //se agrega todo al div principal
    //document.querySelector("#section_lista").appendChild(div_card);
    //se genera un Listener para la tarjeta
    div_card.addEventListener('click', function () {
        console.log("click en card");
        console.log(div_card);
        //aparece un modal
        modal.style.display = "block";
        document.querySelector(".modal-content").style.display = "grid";

        //se genera la imagen
        //se crea un elemento imagen
        let img_modal = document.createElement("img");
        img_modal.src = data.meals[0].strMealThumb;

        //se genera el titulo
        let h2_modal = document.createElement("h2");
        h2_modal.append(data.meals[0].strMeal);

        let arrIngredientes=[];
        arrIngredientes.push("<ul>")
        for (let index = 1; index <= 20; index++) {
            let li=document.createElement("li");
            if(data.meals[0]["strIngredient"+index]==""  || data.meals[0]["strIngredient"+index]==null){
                continue
            }else{
                arrIngredientes.push("<li>"+index+" "+data.meals[0]["strIngredient"+index] + " ( " +data.meals[0]["strMeasure"+index]+" ) </li>");
            }
            
        }        
        arrIngredientes.push("</ul>")
        arrIngredientes=arrIngredientes.join().split(",");
        document.querySelector(".modal-content").innerHTML=(
            `<div id="image-title-modal">
            <img src="${data.meals[0].strMealThumb}"/>
            <h1>
               ${data.meals[0].strMeal} 
            </h1>
            </div>
            <div id="body-info-modal">
                <h2>Ingredientes</h2>
                ${arrIngredientes}
            </div>`
            );
        
    });
    return div_card;
}