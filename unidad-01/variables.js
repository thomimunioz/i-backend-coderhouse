console.log("hola desde la consola")

let nombre = 'Pepe'
let edad = 32
let lenguajes = ["HTML", "CSS", "Javascript"]
const casado = false;

console.log("Hola " + nombre)
console.log("Edad: " + edad)
console.table(lenguajes)

const msg = casado ? `${nombre} Es casado` : `${nombre} Es soltero`;

console.log(msg)