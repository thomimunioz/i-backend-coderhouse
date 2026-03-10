class Persona {

    nombre = '';
    edad = 0;
    #clave = '' //atributo privado - solamente puede ser accedido dentro de la clase

    static contadorGlobal = 0;

    constructor(nombre, edad){

        this.nombre = nombre
        this.edad = edad
        this.contador = 0;
    }

    saludar = () => {
        console.log(`Hola soy ${this.nombre} y mi edad es ${this.edad}`)
    }

    incrementar = () => {
        this.contador++
        Persona.contadorGlobal++;
    }

    static getContadorGlobal = () => {
        return Persona.contadorGlobal
    }

    setClave = (clave) => {
        this.#clave = clave
    }

}

const p1 = new Persona('Jose', 23)
console.log(p1.nombre, p1.edad)
p1.saludar()

p1.incrementar()
p1.incrementar()

console.log(p1.contador)
console.log('Contador global, ', Persona.getContadorGlobal())

p1.setClave('1234')
console.log(p1.clave)