import { Router } from 'express'
import ProductManager from '../managers/productManager.js'
import CartManager from '../managers/cartManager.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/isAdmin.middleware.js'
import UserManager from '../managers/userManager.js'

const router = new Router()
const productManager = new ProductManager()
const cartManager = new CartManager()
const userManager = new UserManager();

router.get('/', (req, res) => {
    res.redirect('/products')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/products', isAuthenticated, async (req, res) => {
    try {
        const {limit = 10, page = 1, sort, query} = req.query
        const result = await productManager.getProducts({limit, page, sort, query})
        res.render('products', {
            products: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            user: req.session.user,
            isAdmin: req.session.user.role === 'admin',
            query: query || '',
            sort: sort || ''
        })
    } catch (error) {
        console.error(error)
        res.status(500).send("Error interno del servidor")
    }
})

router.get('/cart', isAuthenticated, async (req, res) => {
    const cartId = req.session.user.cartId
    const cart = await cartManager.getCartById(cartId);

    res.render('cart', {
        cart,
        user: req.session.user
    })
})

router.get('/product/create', isAuthenticated, isAdmin, (req, res) => {
    res.render('admin/createProduct', {user: req.session.user})
})

router.get('/products/:pid', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const pid = req.params.pid
        const product = await productManager.getProductById(pid)

        if(!product){
            return res.status(404).send("Producto no encontrado")
        }

        res.render('admin/product', {
            product,
            user: req.session.user
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
})

router.get('/admin/users', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const users = await userManager.getUsers()
        res.render('admin/users', {
            users,
            user: req.session.user
        })
    } catch (error) {
        res.status(500).send("Error al cargar usuarios");
    }
})

export default router