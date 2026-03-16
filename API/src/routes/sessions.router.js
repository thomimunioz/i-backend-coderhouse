import { Router } from 'express'
import UserManager from '../managers/userManager.js'
import CartManager from '../managers/cartManager.js'
import bcrypt from 'bcrypt'

const router = Router()
const userManager = new UserManager()
const cartManager = new CartManager()

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await userManager.getUserByEmail(email)

    if(!user) {
        return res.status(401).send("Usuario no encontrado")
    }

    if(!bcrypt.compareSync(password, user.password)){
        return res.status(401).send("Contraseña incorrecta")
    }

    let cartId = user.cart

    if(!cartId) {
        const newCart = await cartManager.createCart()
        cartId = newCart._id
        await userManager.updateUserCart(user._id, cartId)
    }

    req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
        cartId: cartId
    }

    res.redirect('/products')
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

router.post('/register', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()

        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

        const userData = {
        ...req.body,
        password: hashedPassword,
        cart: newCart._id,
        role: 'user'
        }
        await userManager.createUser(userData)
        res.redirect('/login');
    } catch (error) {
        res.status(500).send("Error al registrar usuario");
    }
})

export default router