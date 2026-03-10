const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]

const todosLosProductos = []

objetos.forEach(objeto => {
    const llaves = Object.keys(objeto)

    llaves.forEach(producto =>{
        if (!todosLosProductos.includes(producto)){
            todosLosProductos.push(producto)
        }
    })
});

console.log(todosLosProductos)