let LC_checkbox = document.querySelector('#flexCheckDefault1');
let FF_checkbox = document.querySelector('#flexCheckDefault2');

// mejorar este algoritmo, no puedo mas. Te lo encargo daniel del futuro
LC_checkbox.addEventListener('click', function () {

        if (LC_checkbox.checked) {
            FF_checkbox.removeAttribute('checked', '');
            FF_checkbox.setAttribute('disabled', '');
        } else {
            LC_checkbox.setAttribute('disabled', '');
            FF_checkbox.removeAttribute('disabled', '');
        }

    });



// ENVIO DE DATOS DE LA ORDEN PARA EL CARRITO
const form = document.querySelector('form');

function goToHref (dir){
    window.location.href = dir;
}

function dataHandler (element){
    element.preventDefault();

    //Disparo el FormDataEvent para poder sacar datos de la form
    new FormData(form);
}


form.addEventListener('submit', dataHandler);
form.addEventListener('formdata', (element) =>{

    let data = element.formData;
    let array = [];

    // guardo los datos del form dentro de un array
    for (var value of data.values()) {
        console.log(value);
        array.push(value); 
    }
    
    // Guardo datos de manera local
    localStorage.setItem('shirtArray', JSON.stringify(array));

    goToHref("/pages/shoppingCart.html");


});