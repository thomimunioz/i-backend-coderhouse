import { Cart } from '../models/cart.js'

export default class CartManager {

    async getCarts() {
        try {
            return await Cart.find().lean();
        } catch (error) {
            console.error("Error al obtener carritos:", error);
            return [];
        }
    }

    async createCart(products = []) {
        try {
            const newCart = await Cart.create({ products });
            return newCart;
        } catch (error) {
            console.error("Error al crear carrito:", error);
            return null;
        }
    }

    async getCartById(cid) {
        try {
            return await Cart.findById(cid).populate('products.product').lean();
        } catch (error) {
            console.error("Carrito no encontrado");
            return null;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);

            if (!cart) {
                console.error("Carrito no encontrado");
                return null;
            }

            const existingProduct = cart.products.find(
                p => p.product.toString() === pid.toString()
            );

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.products.push({
                    product: pid,
                    quantity: 1
                });
            }

            await cart.save();

            return await this.getCartById(cid);
        } catch (error) {
            console.error("Error al agregar producto:", error);
            throw error;
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if(!cart) return null

            cart.products = cart.products.filter(p => p.product.toString() !== pid.toString())

            await cart.save()
            return await this.getCartById(cid)
            
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    }

    async updateCart(cid, products){
        try {
            const cart = await Cart.findByIdAndUpdate(
                cid,
                {products: products},
                {new: true}
            ).populate('products.product').lean()
            return cart
        } catch (error) {
            throw error
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await Cart.findById(cid)
            if(!cart) return null
            
            const existingProduct = cart.products.find(p => p.product.toString() === pid.toString())
            if(existingProduct) {
                existingProduct.quantity = quantity
                await cart.save()
                return await this.getCartById(cid)
            }
            
            return null
        } catch (error) {
            throw error
        }
    }

    async emptyCart(cid) {
        try {
            const cart = await Cart.findByIdAndUpdate(
                cid,
                {products: []},
                {new: true}
            ).lean()
            return cart
        } catch (error) {
            throw error
        }
    }
}