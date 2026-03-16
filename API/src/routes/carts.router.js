import { Router } from 'express'
import CartManager from '../managers/cartManager.js'

const router = Router()
const cartManager = new CartManager()

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json({ status: "success", payload: carts })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error leyendo carritos" })
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid)
        if(!cart) return res.status(404).json({ status: "error", error: "Carrito no encontrado" })
        
        res.json({ status: "success", payload: cart })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error interno" })
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid)
        if(!updatedCart) return res.status(404).json({ status: "error", error: "Carrito o producto no encontrado" })
        res.redirect('/products') 
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al agregar producto" })
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid)
        res.json({ status: "success", payload: updatedCart })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al eliminar producto del carrito" })
    }
})

router.put('/:cid', async (req, res) => {
    try {
        const updatedCart = await cartManager.updateCart(req.params.cid, req.body.products)
        res.json({ status: "success", payload: updatedCart })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al actualizar carrito completo" })
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity } = req.body
        const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity)
        res.json({ status: "success", payload: updatedCart })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al actualizar cantidad" })
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const emptyCart = await cartManager.emptyCart(req.params.cid)
        res.json({ status: "success", message: "Carrito vaciado", payload: emptyCart })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al vaciar carrito" })
    }
})

export default router