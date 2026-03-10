const dividir = (n1, n2) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (n2 === 0) {
                reject('No se puede dividir por cero')
            } else {
                resolve(n1 / n2)
            }
        }, 1500)
    })
}

console.log('Inicio del promise')

dividir(4, 2)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error('Fallo la promesa:', error)
    })
    .finally(() => {
        console.log('Fin del promise')
        console.log('------------')

        realizarCalculo()
    })


// Async / Await
const realizarCalculo = async () => {

    console.log('Inicio del async')

    try {
        const res = await dividir(20, 5)
        console.log(res)
    } catch (error) {
        console.log('Tenemos un error')
    } finally {
        console.log('Fin del async')
    }
}