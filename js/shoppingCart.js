// Inicializo el array
let array = [];

if(sessionStorage.getItem('shirtArray')){
    // Accedo a la informacion pasada por la orden del design room
    array = JSON.parse(sessionStorage.getItem('shirtArray'));
    console.log(array);
    //Funcionalidad principal del carrito 
    showCart(array);
}else{
    // Simulo una pedida de datos al servidor
    fetch('/js/data.json')
    .then((res) => res.json() )
    .then( (data) =>{
        // Guardo el contenido del archivo en memoria
        sessionStorage.setItem('shirtArray', JSON.stringify(data));
        //Funcionalidad principal del carrito 
        showCart(data);
    })
}

// // verifico que la informacion se haya pasado correctamente
// for (const iterator of array) {
//     console.log(iterator);
// }




/*************************FUNCIONES**************************************/
function createNode(node) {
    let element = document.createElement(node);
    return element;
}

function appendNode(parent, element) {
    parent.appendChild(element);
}

function extractShirt(printOrder) {
    let  primary_print, secundary_print;
    const [color, size, quantity, quality, id] = printOrder;
   

    // Lugar de print principal
    if (printOrder.includes('LC') && !(printOrder.includes('FF') || printOrder.includes('FB'))) {
        primary_print = 'Badge';
    } else if (printOrder.includes('FF') && !(printOrder.includes('LC') || printOrder.includes('FB'))) {
        primary_print = 'Front';
    } else if (printOrder.includes('FB') && !(printOrder.includes('LC') || printOrder.includes('FF'))) {
        primary_print = 'Back';
    } else if (printOrder.includes('FB') && printOrder.includes('LC') && !printOrder.includes('FF')) {
        primary_print = 'Both (LC & FB)';
    } else if (printOrder.includes('FF') && printOrder.includes('FB') && !printOrder.includes('LC')) {
        primary_print = 'Both (FF & FB)';
    }

    //Lugar de print secundario

    if (printOrder.includes('RS') && !(printOrder.includes('LS'))) {
        secundary_print = 'Right';
    } else if (printOrder.includes('LS') && !(printOrder.includes('RS'))) {
        secundary_print = 'Left';
    } else if (printOrder.includes('RS') && (printOrder.includes('LS'))) {
        secundary_print = 'Both arms';
    } else {
        secundary_print = 'None';
    }

    // Manejo de objetos
    // let cart = new ShoppingCart();
    const shirt = new Tshirts(color, size, quantity, quality, id, primary_print, secundary_print);
    return shirt;
}

function orderCard() {
    let itemContainer = createNode('div');
    itemContainer.setAttribute('class', 'container-fluid');
    itemContainer.setAttribute('id', `card${cart.items[cart.items.length-1].id}`);
    itemContainer.innerHTML = `
                        <div class="row">
                        <!-- imagen de la orden -->

                        <div class="col-auto p-3">
                            <img src="../images/shoppingCart/image_model.png" alt="shirt-shoppingCart">
                        </div>

                        <!-- caracteristicas de la orden -->
                        <div class="col-auto px-0 py-3 d-flex flex-column justify-content-between">
                            <div class="row">
                                <div class="col-auto">
                                    <span class="regular-text">Size: ${cart.items[cart.items.length-1].size}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto">
                                    <span class="regular-text">Color: </span>
                                    <img src="../images/designRoom/${cart.items[cart.items.length-1].color}Choice.svg" width="16px" alt="" />
                                </div>
                                <div class="col-auto">
                                    <span class="regular-text">${cart.items[cart.items.length-1].printing_quality}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto">
                                    <span class="regular-text">Prints: ${cart.items[cart.items.length-1].printing_primary} & ${cart.items[cart.items.length-1].printing_secundary}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto">
                                    <span class="regular-text">Quantity: ${cart.items[cart.items.length-1].quantity}</span>
                                </div>
                            </div>

                        </div>



                        <div class="col py-3 d-flex flex-column justify-content-between">
                            <div class="row justify-content-end">
                                <div class="col-auto">
                                    <span class="regular-text text-decoration-underline">Price:</span>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="col-auto">
                                    <span class="regular-text">$${cart.items[cart.items.length-1].getPrice()}</span>
                                </div>
                            </div>

                        </div>
                        </div>

                        <!-- Horizontal line 1 -->
                        <hr class="bg-gray m-0" id="innerLine1" >

                        <!-- Remove option -->
                        <div class="row justify-content-end">
                        <div class="col-auto">
                            <button type="button" class="btn btn-link p-0" id="${cart.items[cart.items.length-1].id}">Remove</button>
                        </div>
                        </div>

                        <!-- Horizontal line 2 -->
                        <hr class="bg-gray m-0" id="outerLine1" >`;

    appendNode(document.body, itemContainer);
}

function cartTotal() {
    let itemContainer = createNode('div');
    itemContainer.setAttribute('class', 'container-fluid position-static bottom-0 end-0 p-3 bg-gray footerCart');
    itemContainer.innerHTML = ` 
                            <div class="row pb-3 justify-content-between ">
                                <div class="col-auto">
                                    <h2>Total:</h2>
                                </div>
                                <div class="col-auto">
                                    <h2>$${cart.getTotal()}</h2>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-auto ">
                                    <button type="button" class="btn btn-dark">Checkout</button>
                                </div>
                            </div>`;


    appendNode(document.body, itemContainer);
}

function titleCard() {

    let itemContainer = document.querySelector('#titleCard');
    let count = countBreakerInArray(array);
    if (count === 1) {
        itemContainer.innerHTML = `
                            <div class="row justify-content-center bg-gray">
                                <div class="col-auto">
                                    <span class="light-text">${count} Order</span>
                                </div>
                            </div>`
    } else {
        itemContainer.innerHTML = `
                            <div class="row justify-content-center bg-gray">
                                <div class="col-auto">
                                    <span class="light-text">${count} Orders</span>
                                </div>
                            </div>`
    }



    appendNode(document.body, itemContainer);
}

function countBreakerInArray(array) {
    let newArray = [...array]; //Duplico el array para no destruirlo con splice
    let count = 0;
    while (newArray.length) {
        count++
        newArray.splice(0, newArray.indexOf('-') + 1);
    }
    return count;
}

function removal(){

    // Agrego dinamicamente un eventListener al boton remove de cada orderCard
    let removeId = cart.items[cart.items.length - 1].id;
    let removeBtn = document.getElementById(`${removeId}`);

    removeBtn.addEventListener('click', () => {
        // Elimino el elemento del DOM
        let removeIndex = cart.items.findIndex(function ({id}) { //Desestructuracion
            return id == removeId;
        });
        cart.items.splice(removeIndex, 1);
        eliminateContainer = document.getElementById(`card${removeId}`);
        eliminateContainer.remove();

        //Elimino el elemento de memoria
        let eraseArray = JSON.parse(sessionStorage.getItem('shirtArray'));
        let startingPoint = eraseArray.indexOf(removeId) - 4;
        let endPoint = eraseArray.indexOf('-', eraseArray.indexOf(removeId));
        eraseArray.splice(startingPoint, endPoint + 1);
        sessionStorage.setItem('shirtArray', JSON.stringify(eraseArray));

        // Recargo la pagina
        location.reload();

    });
}

function isEmpty(){

    if (cart.empty) {
        let emptyCart = createNode('div');
        emptyCart.setAttribute('class', 'container-fluid');
        emptyCart.innerHTML = `
                            <div class="row justify-content-center" >
                                <div class="col-auto d-flex flex-column emptyCart align-items-center" >
                                    <img src="../images/shoppingCart/emptyCart.svg" width="100px" alt="empty cart icon">
                                    <span class="h5 p-3">Your cart is empty.</span>
                                </div>
                            </div>`;
        appendNode(document.body, emptyCart);
    }
}

function showCart(array){
    if (array.lastIndexOf('-') === (array.length - 1)) {

        titleCard();
    
    
        while (array.length) {
            let printOrder = [];
            for (let i = 0; i < array.indexOf('-'); i++) {
                printOrder.push(array[i]);
            }
    
            // AQUI DIBUJO LA FICHA
            /**************************************************************************** */
            // Creacion del objeto Shirt
            const shirt = extractShirt(printOrder);
            shirt.setPrice();
    
            console.log(`El precio de los articulos es ${shirt.getPrice()}`);
    
            cart.addItem(shirt); //'cart' esta definida en index.js
            cart.setTotal();
    
            console.log(`El valor actual del carrito es ${cart.getTotal()}`);
    
            // Creacion de ficha de cart
            orderCard();
    
            // Agrego la funcion de eliminar un elemento del carrito
            removal();
    
            /**************************************************************************** */
            array.splice(0, array.indexOf('-') + 1);
        }
    
        // Verifico si el cart esta vacio
        isEmpty();
    
    
        // Muestro el total del carrito
        cartTotal();
    
    } else {
        console.log('Hay un error en memoria');
    }
    
}