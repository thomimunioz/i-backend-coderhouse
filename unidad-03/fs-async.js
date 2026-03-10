const fs = require('fs/promises')
const path = 'data.txt'

const main = async () => {
    try {
        await fs.writeFile(path, 'Hola!')
        const data = await fs.readFile(path, 'utf-8')
        console.log({data})
        await fs.writeFile(path, 'Chau!')
    } catch (error) {
        console.error({error})
    }
}
console.log('Inicio')
main().then( () => {
    console.log('Fin') 
})

