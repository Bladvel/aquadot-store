class Tshirt {
    constructor(talle, impresion_calidad, impresion_primaria, impresion_secundaria) {
        this.size = talle.toLowerCase(); 
        this.printing_quality = impresion_calidad.toLowerCase();
        this.printing_primary = impresion_primaria.toLowerCase();
        this.printing_secundary = impresion_secundaria.toLowerCase(); 
        this.basePrice = 4.5;
        this.finalPrice = null;
    }

    setPrice(){

        let sum = 0;
        switch(this.size){
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

        switch(this.printing_quality){
            case "direct to garment":
                sum = sum + 4;
                break;
            case "screen print":
                sum = sum + 2;
                break;
            default:
                alert("No se introdujo un estilo de impresion valido");
                return false;
        }

        switch(this.printing_primary){
            case "front":
            case "back":
                sum = sum + 0;
                break;
            case "both":
                if(this.printing_quality === "direct to garment"){
                    sum = sum + 4;
                }else if(this.printing_quality === "screen print"){
                    sum = sum + 2;
                }
                break;
            default:
                alert("No se introdujo un lugar de impresion correcto")
                return false;
        }

        switch(this.printing_secundary){
            case "right":
            case "left":
                if(this.printing_quality === "direct to garment"){
                    sum = sum + 4;
                }else if(this.printing_quality === "screen print"){
                    sum = sum + 2;
                }
                break;
            case "both":
                if(this.printing_quality === "direct to garment"){
                    sum = sum + 2*4;
                }else if(this.printing_quality === "screen print"){
                    sum = sum + 2*2;
                }
                break;
            case "none":
                sum = sum + 0;
                break;
            default:
                alert("No se introdujo un lugar de impresion correcto")
                return false;
        }

        this.finalPrice = sum*1.55;
    }

    getPrice(){
        return this.finalPrice;
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


let talle = prompt("Introduzca la talla de la camisa que desea comprar: \n-s\n-m\n-l\n-xl\n-2xl\n-3xl\n-4xl");
let impresion_calidad = prompt("Introduzca el tipo de impresion que desea:\n-Direct to garment\n-Screen print");
let impresion_primaria =prompt("Desea la impresion en:\n-Front\n-Back\n-both");
let impresion_secundaria =prompt("Desea la impresion en las mangas en:\n-right\n-left\n-both\n-none");

const shirt = new Tshirt(talle,impresion_calidad,impresion_primaria,impresion_secundaria);
shirt.setPrice();

alert("El precio del articulo es " + shirt.getPrice());