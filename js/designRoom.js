let LC_checkbox = document.querySelector('#flexCheckDefault1');
let FF_checkbox = document.querySelector('#flexCheckDefault2');

// Checkeo inicial de carga de pagina
if (LC_checkbox.checked) {
    FF_checkbox.setAttribute('disabled', '');
    FF_checkbox.removeAttribute('checked', '');
}

// Condicional de los checkbox del imprint location
LC_checkbox.addEventListener('click', function () {

    if (LC_checkbox.checked) {
        FF_checkbox.removeAttribute('checked', '');
        FF_checkbox.setAttribute('disabled', '');
    } else {
        FF_checkbox.removeAttribute('disabled', '');
    }
});

FF_checkbox.addEventListener('click', () => {
    if (FF_checkbox.checked) {
        LC_checkbox.removeAttribute('checked', '');
        LC_checkbox.setAttribute('disabled', '');
    } else {
        LC_checkbox.removeAttribute('disabled', '');
    }
})



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

    array.push('-');
    let currentOrder = JSON.stringify(array);
    
    // Guardo datos de manera local
    if(localStorage.getItem('shirtArray')){
        
    }
    localStorage.setItem('shirtArray', JSON.stringify(array));

    goToHref("/pages/shoppingCart.html");


});