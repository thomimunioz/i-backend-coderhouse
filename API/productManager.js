import Product from "./product"
const fs = require('fs/promises')
const path = 'products.json'

export default class ProductManager {

    constructor() {
        this.path = path
    }

    async getProducts(){
        try {
            const products = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(products)
        } catch (error) {
            return []
        }
    }

    async createProduct(product){
        
        const products = await this.getProducts()

        const id = await this.assignId(products)
        
        const newProduct = new Product(
            id,
            product.title,
            product.description,
            product.code,
            product.price,
            product.status,
            product.stock,
            product.category,
            product.thumbnails
        )

        products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(products, null, 2))

        return newProduct
    }
    
    assignId(products) {
        const newId = products.length === 0
        ? 1
        : products[products.length - 1].id + 1

        return newId
    }

    async getProductById(pid){
        const products = await this.getProducts()
        const product = products.find(p => p.id === Number(pid))
        if (!product) {return null} 
        return product
    }

    async updateProduct(pid, data){
        const products = await this.getProducts()
        const currentProductIndex = products.findIndex(p => p.id === Number(pid))

        if(currentProductIndex === -1) {
            console.error('Producto no encontrado')
            return null
        }

        const product = products[currentProductIndex]

        const updatedProduct = {
            ...product,
            ...data,
            id: product.id
        }

        products[currentProductIndex] = updatedProduct
        await fs.writeFile(this.path, JSON.stringify(products, null, 2))
        return updatedProduct
    }

    async deleteProduct(pid){
        const products = await this.getProducts()
        const currentProductIndex = products.findIndex(p => p.id === Number(pid))

        if(currentProductIndex === -1) {
            console.error('Producto no encontrado')
            return null
        }
        
        const deletedProduct = products.splice(currentProductIndex, 1)[0]

        await fs.writeFile(this.path, JSON.stringify(products, null, 2))

        return deletedProduct
    }

}
