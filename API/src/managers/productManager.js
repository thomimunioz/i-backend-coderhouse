import { Product } from '../models/product.js'

export default class ProductManager {
    
    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            let filter = {}
            if(query){
                if (query === 'true' || query === 'false'){
                    filter.status = query === 'true'
                } else {
                    filter.category = query
                }
            }

            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                lean: true
            }

            if (sort) {
                options.sort = {price: sort === 'asc' ? 1 : -1}
            }

            return await Product.paginate(filter, options)
        } catch (error) {
            console.error("Error al obtener productos:", error)
            return null
        }
    }

    async createProduct(product) {
        try {
            const newProduct = await Product.create(product)
            return newProduct
        } catch (error) {
            console.error("Error creando producto:", error)
            return null
        }
    }
    
    async getProductById(pid){
        try {
            return await Product.findById(pid).lean()
        } catch (error) {
            console.error("Producto no encontrado")
            return null
        }
    }

    async updateProduct(pid, data) {
        try {
            return await Product.findByIdAndUpdate(pid, data, { new: true}).lean()
        } catch (error) {
            console.error("Error actualizando producto:", error)
            return null
        }
    }

    async deleteProduct(pid){
        try {
            return await Product.findByIdAndDelete(pid).lean()
        } catch (error) {
            console.error("Error eliminando producto:", error)
            return null
        }
    }
}