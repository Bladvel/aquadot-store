class Tshirts {

// Propiedades
    color;
    size;
    quantity;
    printing_quality;
    printing_primary;
    printing_secundary;
    basePrice = 4.5;
    finalPrice;
    sold = false;


    constructor(color, talla, cantidad, impresion_calidad, impresion_primaria, impresion_secundaria) {
        this.color = color.toLowerCase();
        this.size = talla.toLowerCase();
        this.quantity = cantidad.toLowerCase();
        this.printing_quality = impresion_calidad.toLowerCase();
        this.printing_primary = impresion_primaria.toLowerCase();
        this.printing_secundary = impresion_secundaria.toLowerCase();
    }

// Metodos

    setPrice() {

        let sum = 0;
        switch (this.size) {
            case "s":
            case "m":
            case "l":
            case "xl":
                sum = this.basePrice;
                break;
            case "2xl":
            case "3xl":
            case "4xl":
                sum = this.basePrice + 2.5;
                break;
            default:
                alert("No se introdujo ninguna talla correcta");
                return false;
        }

        switch (this.printing_quality) {
            case "DTG": //direct to garment
                sum = sum + 4;
                break;
            case "HQDP": //High wuality digital printing
                sum = sum + 2;
                break;
            default:
                alert("No se introdujo un estilo de impresion valido");
                return false;
        }

        switch (this.printing_primary) {
            case "front":
            case "back":
                sum = sum + 0;
                break;
            case "both":
                if (this.printing_quality === "direct to garment") {
                    sum = sum + 4;
                } else if (this.printing_quality === "screen print") {
                    sum = sum + 2;
                }
                break;
            default:
                alert("No se introdujo un lugar de impresion correcto")
                return false;
        }

        switch (this.printing_secundary) {
            case "right":
            case "left":
                if (this.printing_quality === "direct to garment") {
                    sum = sum + 4;
                } else if (this.printing_quality === "screen print") {
                    sum = sum + 2;
                }
                break;
            case "both":
                if (this.printing_quality === "direct to garment") {
                    sum = sum + 4 * 2;
                } else if (this.printing_quality === "screen print") {
                    sum = sum + 2 * 2;
                }
                break;
            case "none":
                sum = sum + 0;
                break;
            default:
                alert("No se introdujo un lugar de impresion correcto")
                return false;
        }

        this.finalPrice = this.quantity*sum * 1.55;
    }

    getPrice() {
        return this.finalPrice;
    }

    sell(){
        this.sold = true;
    }
}

class ShoppingCart{

// Propiedades
    items = [];
    empty = true;
    total = 0;

// Metodos
    setTotal(){
        if(!this.empty){
            this.total = this.items.reduce((adder,element) => {
                return adder + element.getPrice();
            },0);
        }else{
            console.log("The cart is empty");
        }
        
    }

    getTotal(){
        return this.total;
    }

    addItem(item){
        this.items.push(item);
        this.empty = false;
    }

}
/*  Precio Base $4.5
    Colores no agregan nada
    Talle
        2xl en adelante vale $2.5 mas
    Tipos de print
        Direct to garment   ($4)   
        screen print        (2$)    
    Lugares de impresion
        2 brazo
        al frente
        espalda
    markup del 55%
*/

//****************************** */ ALGORITMO DEL SIMULADOR USANDO PROMPTS Y ALERTS**********************************************************//

// let opcion = "";
// let carrito = new ShoppingCart();

// do {
//     let color = prompt("Introduzca el color de las camisas que desea comprar: \n-Blanco\n-Rojo\n-Negro\n-Mostaza\n-Azul marino\n-Gris");
//     let talla = prompt("Introduzca la talla de las camisa que desea comprar: \n-s\n-m\n-l\n-xl\n-2xl\n-3xl\n-4xl");
//     let cantidad = prompt("Ingrese la cantidad que desea ordenar");
//     let impresion_calidad = prompt("Introduzca el tipo de impresion que desea:\n-Direct to garment\n-Screen print");
//     let impresion_primaria =prompt("Desea la impresion en:\n-Front\n-Back\n-both");
//     let impresion_secundaria =prompt("Desea la impresion en las mangas en:\n-right\n-left\n-both\n-none");

//     const shirt = new Tshirts(color, talla, cantidad, impresion_calidad,impresion_primaria,impresion_secundaria);
//     shirt.setPrice();

//     alert("El precio de los articulos es " + shirt.getPrice());

//     carrito.addItem(shirt);
//     carrito.setTotal();

//     alert("El valor actual del carrito es " + carrito.getTotal());

//     opcion = prompt("Desea comprar mas camisas?\n-si\n-no");

// } while (opcion!=="no");
