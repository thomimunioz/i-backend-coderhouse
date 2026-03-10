import Cart from './cart'
import CartManager from './cartManager'
import ProductManager from './productManager'
import express from 'express'
const app = express()
app.use(express.json())
const port = 8080

const productManager = new ProductManager()
const cartManager = new CartManager()



// Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.json(products)
    } catch (error) {
        console.error('Error leyendo productos:', error)
        res.send('Ocurrió un error al leer los productos')
    }
})

app.get('/api/products/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid)
        const product = await productManager.getProductById(pid)
        if(!product) {
            return res.send("Producto no encontrado")
        }
        res.json(product)
    } catch (error) {
        console.error(error)
        res.send('Ocurrió un error al buscar el producto')
    }
})

app.post('/api/products', async (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body
    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }

    await productManager.createProduct(newProduct)

    res.json({
        status: 'Success',
        product: newProduct
    })
})

app.put('/api/products/:pid', async (req, res) => {
    const pid = Number(req.params.pid)
    const changes = req.body

    const updatedProduct = await productManager.updateProduct(pid, changes)

    if (!updatedProduct) return res.send('Producto no encontrado')

    res.json(updatedProduct)
})

app.delete('/api/products/:pid', async (req, res) => {
    const pid = Number(req.params.pid)

    const deleted = await productManager.deleteProduct(pid)

    if (!deleted) return res.send('Producto no encontrado')

    res.json({ status: 'Producto eliminado', productId: pid })
})

// Carts
app.post('/api/carts', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json(carts)
    } catch (error) {
        console.error('Error leyendo carritos:', error)
        res.send('Ocurrió un error al leer los carritos')
    }
})

app.get('/api/carts/:cid', async (req, res) => {
    try {
        const cid = Number(req.params.cid)
        const cart = await cartManager.getCartById(cid)
        if(!cart) {
            return res.send("Carrito no encontrado")
        }
        res.json(cart)
    } catch (error) {
        console.error(error)
        res.send('Ocurrió un error al buscar el carrito')
    }
})

app.post('/api/carts/:cid/products/:pid', async (req, res) => {
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)
    const updatedCart = await cartManager.addProductToCart(cid, pid)
    res.json(updatedCart)
})

app.listen(port, () => {
    console.log(`Servidor con Express ene l puerto ${port}`)
})