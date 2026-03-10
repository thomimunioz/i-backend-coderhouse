import Cart from "./cart"
const path = 'carts.json'
const fs = require('fs/promises')

export default class CartManager {

    constructor(){
        this.path = path
    }

    async getCarts(){
        try {
            const carts = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } catch (error) {
            return []
        }
    }

    async createCart(products = []){
        const carts = await this.getCarts()
        const id = this.assignId(carts)
        const newCart = new Cart (
            id,
            products
        )

        carts.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))

        return newCart
    }

    assignId(carts) {
        const newId = carts.length === 0
        ? 1
        : carts[carts.length - 1].id + 1

        return newId
    }

    async getCartById(cid){
        const carts = await this.getCarts()
        const cart = carts.find(c => c.id === Number(cid))
        if (!cart) {return null} 
        return cart
    }

    async addProductToCart(cid, pid){
        const carts = await this.getCarts()
        const currentCartIndex = carts.findIndex(c => c.id === Number(cid))
        
        if(currentCartIndex === -1) {
            console.error('Carrito no encontrado')
            return null
        }

        const cart = carts[currentCartIndex]

        const existingProduct = cart.products.find((product) => product.product === Number(pid))

        if(existingProduct){
            existingProduct.quantity++
        } else {
            cart.products.push({
                product: Number(pid),
                quantity: 1
            })
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))

        return cart
    }

    async removeProductFromCart(cid, pid){
        const carts = await this.getCarts()
        const currentCartIndex = carts.findIndex(c => c.id === Number(cid))
        const cart = carts[currentCartIndex]
        
        if(cart.products.length === 0){
            console.error('El carrito está vacío')
            return
        }

        const existingProductIndex = cart.products.findIndex((product) => product.product === Number(pid))
        const existingProduct = cart.products[existingProductIndex]

        if(existingProductIndex === -1) {
            console.error("El producto no existe en el carrito")
            return
        } else if (existingProductIndex != -1 && existingProduct.quantity > 1){
            existingProduct.quantity--
        } else if (existingProduct.quantity === 1) {
            cart.products.splice(existingProductIndex, 1)
        }

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))

        return cart
    }
}