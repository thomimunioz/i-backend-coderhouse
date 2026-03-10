const mostrarLista = (lista) => {
    if (lista.length !== 0) {
        lista.forEach(element => {
            console.log(element)
        });
        return `La lista tiene ${lista.length} elementos`
    } else {
        console.log("Lista vacia")
        ;
    }
}

const frutas = ["Manzana", "Pera", "Naranja"]
const listavacia = []

console.log(mostrarLista(frutas))
console.log(mostrarLista(listavacia))