// variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// event listeners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML()
    });
}


//funciones
function agregarTweet(e) {
    e.preventDefault();

    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion 
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }
    //anadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // una vez agreagdo crear el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

// mostrar mensaje de erro
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);


    //tiempo de 3s para eliminar el mensajeError
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

//muestra el listado de los tweets
function crearHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            //agregar un boton para eliminar los tweets
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //anadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);

            }

            //crear el HTML

            const li = document.createElement('li');
            //anadir el texto 
            li.innerText = tweet.tweet

            // asignar el boton
            li.appendChild(btnEliminar);

            //intestarlo en el HTML
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

// agrega los tweets actuales al LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//elimina el tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML()
}


//limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

