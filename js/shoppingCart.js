// Accedo a la informacion pasada por la orden del design room
array = JSON.parse(localStorage.getItem('shirtArray'));

// verifico que la informacion se haya pasado correctamente
for (const iterator of array) {
    console.log(iterator);
}

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

        carrito.addItem(shirt); //'carrito' esta definida en index.js
        carrito.setTotal();

        console.log(`El valor actual del carrito es ${carrito.getTotal()}`);

        // Creacion de ficha de carrito
        orderCard();

        // Agrego dinamicamente un eventListener al boton remove de cada orderCard
        let removeId = carrito.items[carrito.items.length - 1].id;
        let removeBtn = document.getElementById(`${removeId}`);

        removeBtn.addEventListener('click', () => {
            // Elimino el elemento del DOM
            let removeIndex = carrito.items.findIndex(function (element) {
                return element.id == removeId;
            });
            carrito.items.splice(removeIndex, 1);
            eliminateContainer = document.getElementById(`card${removeId}`);
            eliminateContainer.remove();

            //Elimino el elemento de memoria
            let eraseArray = JSON.parse(localStorage.getItem('shirtArray'));
            let startingPoint = eraseArray.indexOf(removeId) - 4;
            let endPoint = eraseArray.indexOf('-', eraseArray.indexOf(removeId));
            eraseArray.splice(startingPoint, endPoint + 1);
            localStorage.setItem('shirtArray', JSON.stringify(eraseArray));

            // Recargo la pagina
            location.reload();

        });
        /**************************************************************************** */
        array.splice(0, array.indexOf('-') + 1);
    }

    // Verifico si el carrito esta vacio
    if (carrito.empty) {
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

    // Muestro el total del carrito
    cartTotal();

} else {
    console.log('Hay un error en memoria');
}

/*************************FUNCIONES**************************************/
function createNode(node) {
    let element = document.createElement(node);
    return element;
}

function appendNode(parent, element) {
    parent.appendChild(element);
}

function extractShirt(printOrder) {
    let color, talla, cantidad,
        calidad, id, impresion_primaria,
        impresion_secundaria;

    color = printOrder[0];
    talla = printOrder[1];
    cantidad = printOrder[2];
    calidad = printOrder[3];
    id = printOrder[4];

    // Lugar de print principal
    if (printOrder.includes('LC') && !(printOrder.includes('FF') || printOrder.includes('FB'))) {
        impresion_primaria = 'Badge';
    } else if (printOrder.includes('FF') && !(printOrder.includes('LC') || printOrder.includes('FB'))) {
        impresion_primaria = 'Front';
    } else if (printOrder.includes('FB') && !(printOrder.includes('LC') || printOrder.includes('FF'))) {
        impresion_primaria = 'Back';
    } else if (printOrder.includes('FB') && printOrder.includes('LC') && !printOrder.includes('FF')) {
        impresion_primaria = 'Both (LC & FB)';
    } else if (printOrder.includes('FF') && printOrder.includes('FB') && !printOrder.includes('LC')) {
        impresion_primaria = 'Both (FF & FB)';
    }

    //Lugar de print secundario

    if (printOrder.includes('RS') && !(printOrder.includes('LS'))) {
        impresion_secundaria = 'Right';
    } else if (printOrder.includes('LS') && !(printOrder.includes('RS'))) {
        impresion_secundaria = 'Left';
    } else if (printOrder.includes('RS') && (printOrder.includes('LS'))) {
        impresion_secundaria = 'Both arms';
    } else {
        impresion_secundaria = 'None';
    }

    // Manejo de objetos
    // let carrito = new ShoppingCart();
    const shirt = new Tshirts(color, talla, cantidad, calidad, id, impresion_primaria, impresion_secundaria);
    return shirt;
}

function orderCard() {
    let itemContainer = createNode('div');
    itemContainer.setAttribute('class', 'container-fluid');
    itemContainer.setAttribute('id', `card${carrito.items[carrito.items.length-1].id}`);
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
                                    <span class="regular-text">Size: ${carrito.items[carrito.items.length-1].size}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto">
                                    <span class="regular-text">Color: </span>
                                    <img src="../images/designRoom/${carrito.items[carrito.items.length-1].color}Choice.svg" width="16px" alt="" />
                                </div>
                                <div class="col-auto">
                                    <span class="regular-text">${carrito.items[carrito.items.length-1].printing_quality}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto">
                                    <span class="regular-text">Prints: ${carrito.items[carrito.items.length-1].printing_primary} & ${carrito.items[carrito.items.length-1].printing_secundary}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto">
                                    <span class="regular-text">Quantity: ${carrito.items[carrito.items.length-1].quantity}</span>
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
                                    <span class="regular-text">$${carrito.items[carrito.items.length-1].getPrice()}</span>
                                </div>
                            </div>

                        </div>
                        </div>

                        <!-- Horizontal line 1 -->
                        <hr class="bg-gray m-0" id="innerLine1" >

                        <!-- Remove option -->
                        <div class="row justify-content-end">
                        <div class="col-auto">
                            <button type="button" class="btn btn-link p-0" id="${carrito.items[carrito.items.length-1].id}">Remove</button>
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
                                    <h2>$${carrito.getTotal()}</h2>
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