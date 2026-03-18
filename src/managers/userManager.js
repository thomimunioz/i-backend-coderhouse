import { User } from '../models/user.js'

export default class UserManager {

    async getUsers() {
        try {
            return await User.find().lean()
        } catch (error) {
            console.error("Error al obtener usuarios:", error)
            return []
        }
    }

    async createUser(user) {
        try {
            const existingUser = await User.findOne({email: user.email})
            if(existingUser){
                throw new Error("El email ya está registrado")
            }
            const newUser = await User.create(user)
            return newUser
        } catch (error) {
            console.error("Error creando usuario:", error)
            throw error
        }
    }

    async getUserById(uid){
        try {
            return await User.findById(uid).lean()
        } catch (error) {
            console.error("Error al buscar usuario por ID:", error)
            return null
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({email}).lean()
        } catch (error) {
            console.error("Error al buscar usuario por email:", error)
            return null
        }
    }

    async updateUser(uid, data) {
        try {
            return await User.findByIdAndUpdate(uid, data, {new: true}).lean()
        } catch (error) {
            console.error("Error al actualizar usuario:", error)
            return null
        }
    }
    
    async deleteUser(uid) {
        try {
            return await User.findByIdAndDelete(uid).lean()
        } catch (error) {
            console.error("Error al eliminar usuario:", error)
            return null
        }
    }

    async updateUserCart(userId, cartId) {
        try {
            return await User.findByIdAndUpdate(
                userId,
                {cart: cartId},
                {new: true}
            ).lean()
        } catch (error) {
            console.error("Error al actualizar el carrito del usuario:", error)
            throw error;
        }
    }
}