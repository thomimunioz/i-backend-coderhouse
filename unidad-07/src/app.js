import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils/utils.js'
import path from 'path'
import viewsRouter from './routes/views.router.js'
import {Server} from 'socket.io'
import { connectMongo } from './db/mongo.js'
import userRouter from './routes/users.router.js'

const app = express()
const port = 8080
const URI_DB = 'mongodb://localhost:27017'
const DB_NAME = 'coderhouse'

await connectMongo(URI_DB, DB_NAME)

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', viewsRouter)

app.use('/api/users', userRouter)

const httpServer = app.listen(port, () => {
    console.log(`Servidor con Express en el puerto ${port}`)
})

const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado con id:', socket.id)
})

