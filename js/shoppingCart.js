// Accedo a la informacion pasada por la orden del design room
array = JSON.parse(localStorage.getItem('shirtArray'));

for (const iterator of array) {
    console.log(iterator);
}