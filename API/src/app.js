import express from 'express'
import handlebars from 'express-handlebars'
import path from 'path'
import session from 'express-session'

import { __dirname } from './utils/utils.js'
import { connectDB } from './database/mongo.js'
import { autoSeed } from './database/seeder.js'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/sessions.router.js'
import userRouter from './routes/users.router.js'

const app = express()
const port = 8080

connectDB().then(async () => {
    await autoSeed()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'coder-secret',
    resave: false,
    saveUninitialized: false
}))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.set('views', path.join(__dirname, '../views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionRouter)
app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`)
})