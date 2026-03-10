import express from 'express'
const app = express()
app.use(express.json())
const port = 8080

const usuarios = [
    {
        id: 1,
        name: "Sofia",
        lastName: "Ruiz",
        userName: "SofiR",
    },
    {
        id: 2,
        name: "Juan",
        lastName: "Gonzalez",
        userName: "JGonzalez",
    },
    {
        id: 3,
        name: "Pepe",
        lastName: "Mujica",
        userName: "PepitoM",
    }
]

console.log('Servidor arrancó a', new Date())

app.get('/', (req, res) => {
    res.send('Hola desde Express')
})

app.get('/bienvenida', (req, res) => {
    res.send('<h4> Bienvenido usuario </h4>')
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

app.get('/usuario/:id', (req, res) => {
    const id = Number(req.params.id)
    const usuarioEncontrado = usuarios.find(u => u.id === id)
    if(!usuarioEncontrado) {
        return res.status(404).json({error: 'Usuario no encontrado'})
    }
    res.json({
        status: 'Success',
        data: usuarioEncontrado
    })
})


app.post('/usuario', (req, res) => {
    const {name, email} = req.body
    const nuevoUsuario = {
        id: usuarios.length + 1,
        name,
        email
    }

    usuarios.push(nuevoUsuario)
    res.json({status: 'Success', data:{}})
})

app.delete('/usuario/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = usuarios.findIndex(u => u.id === id)
    if (index != -1) {
        usuarios.splice(index, 1)
        res.json({
            status: 'Success'
        })
    }
})


app.listen(port, () => {
    console.log(`Servidor con Express en el puerto ${port}`)
})