const crypto = require('crypto');
const fs = require('fs/promises')
const path = 'data/users.json'

class UsersManager {
    constructor() {
        this.users = []
    }

    async createUser(user){
        const{name, lastName, userName, password} = user;
        const hash = crypto.createHash('sha256')
        hash.update(password)
        let passwordHash = hash.digest('hex')

        this.users.push({
            name,
            lastName,
            userName,
            password: passwordHash
        })

        const stringify = JSON.stringify(this.users, null, 2)
        await fs.writeFile(path, stringify)

    }

    async getUsers() {
        const data = await fs.readFile(path, 'utf-8')
        this.users = JSON.parse(data)
        return this.users
    }

    authUser(userName, password){
        const passwordHash = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex')

        const usuarioBuscado = this.users.find(
            user => user.userName === userName)

        if(!usuarioBuscado){
            console.log('Usuario no encontrado')
            return
        }

        if (usuarioBuscado.password === passwordHash) {
            console.log('Login exitoso')
        } else {
            console.log('Contraseña incorrecta')
        }
    }
}

const manager = new UsersManager();

manager.createUser({
    name: 'Sofia',
    lastName: 'Ruiz',
    userName: 'SofiR',
    password: '123'
})

manager.createUser({
    name: 'Juan',
    lastName: 'Gonzalez',
    userName: 'JGonzalez',
    password: '456'
})

manager.createUser({
    name: 'Pepe',
    lastName: 'Mujica',
    userName: 'PepitoM',
    password: '789'
})

manager.getUsers().then(r => {
    console.table(r)
})