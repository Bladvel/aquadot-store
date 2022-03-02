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

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

form.addEventListener('submit', dataHandler);
form.addEventListener('formdata', (element) =>{

    let data = element.formData;
    let array = [];

    let count = 0; //Variable para introducir correctamente el ID de la orden

    // guardo los datos del form dentro de un array
    for (var value of data.values()) {
        
        if(count === 4){
            let id = generateRandomInteger(1000000);
            array.push(id);
            array.push(value);
        }else{
            array.push(value);
        }
        count++; 
    }

    array.push('-'); //Uso el '-' como delimitador de arrays para saber cuando termina
    
    
    // Guardo datos de manera local
    if(localStorage.getItem('shirtArray')){
        // Verifico si existe una orden anterior, si existe, concateno la orden nueva a la memoria
        let olderOrder = JSON.parse(localStorage.getItem('shirtArray'));
        let currentOrder = array.concat(olderOrder);
        localStorage.setItem('shirtArray', JSON.stringify(currentOrder));
    }else{
        localStorage.setItem('shirtArray', JSON.stringify(array));
    }
    
    goToHref("/pages/shoppingCart.html");


});