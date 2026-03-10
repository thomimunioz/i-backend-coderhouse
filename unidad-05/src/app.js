import express from 'express'
import usersRouter from './routes/users.router.js'
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = 8080

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use('/', express.static('public'))

app.get('/home', (req, res) => {
    const isAdmin = true
    let data = {
        title: 'Home',
        user: {
            name: 'Jose',
            isAdmin,
            email: 'jose@coder.edu.ar'
        },
        name: 'Lucas',
        products: [
            {id: 1, title: 'pera'},
            {id: 2, title: 'manzana'},
            {id:3, title: 'naranja'}
        ]
    }
    res.render('index', data)
})

app.use('/api/users', usersRouter)

app.listen(port, () => {
    console.log(`Servidor con Express en el puerto ${port}`)
})