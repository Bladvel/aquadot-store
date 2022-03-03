class Tshirts {

// Propiedades
    color;
    size;
    quantity;
    printing_quality;
    id;
    printing_primary;
    printing_secundary;
    basePrice = 4.5;
    finalPrice;
    sold = false;
    


    constructor(color, talla, cantidad, impresion_calidad, id, impresion_primaria, impresion_secundaria) {
        this.color = color.toLowerCase();
        this.size = talla;
        this.quantity = cantidad;
        this.printing_quality = impresion_calidad;
        this.id = id;
        this.printing_primary = impresion_primaria;
        this.printing_secundary = impresion_secundaria;
    }

// Metodos

    setPrice() {

        let sum = 0;
        switch (this.size) {
            case "S":
            case "M":
            case "L":
            case "XL":
                sum = this.basePrice;
                break;
            case "2XL":
            case "3XL":
            case "4XL":
                sum = this.basePrice + 2.5;
                break;
            default:
                alert("No se introdujo ninguna talla correcta");
                return false;
        }

        switch (this.printing_quality) {
            case "DTG": //direct to garment
                sum += 4;
                break;
            case "HQDP": //High wuality digital printing
                sum += 2;
                break;
            default:
                alert("No se introdujo un estilo de impresion valido");
                return false;
        }

        switch (this.printing_primary) {
            case "Badge":
            case "Front":
            case "Back":
                sum = sum + 0;
                break;
            case "Both (LC & FB)":
                if (this.printing_quality === "DTG") {
                    sum += 4;
                } else if (this.printing_quality === "HQDP") {
                    sum += 2;
                }
                break;
            case "Both (FF & FB)":
                if (this.printing_quality === "DTG") {
                    sum += 4;
                } else if (this.printing_quality === "HQDP") {
                    sum += 2;
                }
                break;
            default:
                alert("No se introdujo un lugar de impresion correcto")
                return false;
        }

        switch (this.printing_secundary) {
            case "Right":
            case "Left":
                if (this.printing_quality === "DTG") {
                    sum += 4;
                } else if (this.printing_quality === "HQDP") {
                    sum += 2;
                }
                break;
            case "Both arms":
                if (this.printing_quality === "DTG") {
                    sum += 4 * 2;
                } else if (this.printing_quality === "HQDP") {
                    sum += 2 * 2;
                }
                break;
            case "None":
                sum = sum + 0;
                break;
            default:
                alert("No se introdujo un lugar de impresion correcto")
                return false;
        }

        this.finalPrice = Math.round(this.quantity*sum * 1.55 * 1000)/1000; //redondeo a 3 decimales
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
            let sum = this.items.reduce((adder,element) => {
                return adder + element.getPrice();
            },0);
            this.total = Math.round(sum*1000)/1000;
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

let carrito = new ShoppingCart();

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
