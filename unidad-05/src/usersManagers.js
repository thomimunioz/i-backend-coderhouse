import crypto from 'crypto'
import fs from 'fs/promises'

class UsersManager {
    constructor(path){
        this.path = path;
        this.users = [];
        this._loaded = false;
    }

    async init() {
        if (this._loaded) return;
        this.users = await this.getUsers();
        this._loaded = true;
    }

    async createUser(user) {
        await this.init();

        const { name, email, password, avatar, role='client' } = user;
        // Validamos campos obligatorios
        if( !name || !email || !password) {
            throw new Error('name, email y password son Obligatorios');
        }
        // Verificamos que email no exista
        const exists = this.users.some( u => u.email === email);
        if(exists){
            throw new Error('El email ya existe');
        }
        const _id = crypto.randomUUID();
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        const newUser = {
            _id,
            name,
            email,
            password: passwordHash,
            avatar,
            role
        }
        this.users.push(newUser);
        const text = JSON.stringify( this.users, null, 2)
        await fs.writeFile(this.path, text);
        const data = { _id, name, email} 
        return data;
        
    }

    async getUsers() {
        try {        
            const data = await fs.readFile( this.path, 'utf-8');
            this.users = JSON.parse(data);
            return this.users
        } catch (error) {
            console.error(error)
            return []
        }
    }
    async deleteUserById(id) {
        await this.init();

        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            return null;
        }

        const [deletedUser] = this.users.splice(index, 1);

        const text = JSON.stringify(this.users, null, 2);
        await fs.writeFile(this.path, text);

        const { password, ...safeUser } = deletedUser;
        return safeUser;
    }

    async auth(email, password){
        await this.init();

        const user = this.users.find( u => u.email === email );
        if( !user) return null;


    }
}

export default UsersManager