const vueltas = 20;
const MAX = 20;
const MIN = 1;

const generarNumeroAleatorio = () => {
    return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

const generarNumerosAleatorios = () => {
    return new Promise((resolve) => {
        setTimeout(() => {

            const numeros = [];

            for (let i = 0; i < vueltas; i++) {
                numeros.push(generarNumeroAleatorio());
            }

            const conteo = numeros.reduce((acc, numero) => {
                acc[numero] = (acc[numero] || 0) + 1;
                return acc;
            }, {});

            resolve({ numeros, conteo });

        }, 3000);
    });
}

console.log("Inicio del script");

generarNumerosAleatorios().then((resultado) => {
    console.log(resultado.numeros);
    console.log(resultado.conteo);
});

console.log("Fin del script");