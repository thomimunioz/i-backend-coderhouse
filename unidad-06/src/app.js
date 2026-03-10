import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils/utils.js'
import path from 'path'
import viewsRouter from './routes/views.routes.js'
import {Server} from 'socket.io'



const app = express()
const port = 8080

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', viewsRouter)

const httpServer = app.listen(port, () => {
    console.log(`Servidor con Express en el puerto ${port}`)
})

const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado con id:', socket.id)
})

