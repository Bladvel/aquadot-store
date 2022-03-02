// Accedo a la informacion pasada por la orden del design room
array = JSON.parse(localStorage.getItem('shirtArray'));

for (const iterator of array) {
    console.log(iterator);
    
}

// Variables a utilizar para construir los objetos
let color,talla,cantidad, 
    calidad, impresion_primaria, 
    impresion_secundaria;

color = array[0];
talla = array[1];
cantidad = array[2];
calidad = array[3];

// Lugar de print principal
if((array.includes('LC') || array.includes('FF')) && !array.includes('FB')){
    impresion_primaria = 'front';
}else if (array.includes('FB') && !(array.includes('LC') || array.includes('FF'))){
    impresion_primaria = 'back';
} else if(array.includes('FB') && (array.includes('LC') || array.includes('FF'))){
    impresion_primaria = 'both';
}

//Lugar de print secundario

if(array.includes('RS') && !(array.includes('LS'))){
    impresion_secundaria = 'right';
}else if(array.includes('LS') && !(array.includes('RS'))){
    impresion_secundaria = 'left';
}else if(array.includes('RS') && (array.includes('LS'))){
    impresion_secundaria = 'both';
}else{
    impresion_secundaria = 'none';
}

// Manejo de objetos
// let carrito = new ShoppingCart();
const shirt = new Tshirts(color,talla,cantidad,calidad,impresion_primaria,impresion_secundaria);

shirt.setPrice();

console.log(`El precio de los articulos es ${shirt.getPrice()}`);

carrito.addItem(shirt);
carrito.setTotal();

console.log(`El valor actual del carrito es ${carrito.getTotal()}`);

// Creacion de ficha de carrito

function createNode(node) {
    let element = document.createElement(node);
    return element;
}

function appendNode(parent, element) {
    parent.appendChild(element);
}

itemContainer = createNode('div');
itemContainer.setAttribute('class','container-fluid');
itemContainer.setAttribute('id','card-item1');
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
                                    <span class="regular-text">Full Front</span>
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
                                    <span class="light-text link-color">Modify</span>
                                </div>
                            </div>
                            <div class="row justify-content-end">
                                <div class="col-auto">
                                    <span class="regular-text">${carrito.items[carrito.items.length-1].getPrice()}</span>
                                </div>
                            </div>

                        </div>
                        </div>

                        <!-- Horizontal line 1 -->
                        <hr class="bg-gray m-0" id="innerLine1" >

                        <!-- Remove option -->
                        <div class="row justify-content-end">
                        <div class="col-auto">
                            <span class="light-text link-color">Remove</span>
                        </div>
                        </div>

                        <!-- Horizontal line 2 -->
                        <hr class="bg-gray m-0" id="outerLine1" >`;

appendNode(document.body,itemContainer);