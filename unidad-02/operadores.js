//Potencia
const potencia = 2**3;
console.log(potencia)

//Include
const lenguajes = ["HTML", "CSS", "Javascript"]
let filtro = "CSS"
if(lenguajes.includes(filtro)){
    console.log('Esta capacitado')
}

//Keys

const producto1 = {
    nombre: 'Mouse',
    precio: 3000
}

const producto2 = {
    nombre: 'Teclado',
    precio: 5000
}

console.log(Object.entries(producto1))

//Rest: sirve (por ejemplo) para indicar un numero indefinido de elementos
//que puedo recibir por parametro

const calcularTotal = (...productos) => {
    return productos.reduce((a, b) => a.precio + b.precio)
}

const r1 = calcularTotal(producto1, producto2)
console.log(r1)

//Spread

const letras = ['A', 'B', 'C']
const nuevasLetras = ['D', 'E']

const todasLetras = [ ...letras, ...nuevasLetras ]
console.log(todasLetras)


// Operador ?? y operador ||
const stock = 2;
//El operador || considera valores null, undefined, 0, como falso. Dado ese caso
// devolverá la parte derecha
console.log(stock || 10)

//El operador ?? retornará la parte derecha si es null o undefined.
console.log(stock ?? 10)

