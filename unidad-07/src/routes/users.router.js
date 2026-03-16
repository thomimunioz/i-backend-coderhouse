import express from 'express'
import { getDb } from '../db/mongo.js'
const router = express.Router()

const collection = () => getDb().collection('estudiantes')

router.get('/', async (req, res) => {
    const estudiantes = await collection().find().toArray()
    console.log(estudiantes)
    res.json({status: 'success', payload: estudiantes})
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(item => item.id == id);

    if (user) {
        res.json({
            status: 'success',
            data: user
        })
    } else {
        res.status(404).json({
            status: 'success',
            msg: 'Recurso no encontrado'
        })
    }
})

router.post('/', async (req, res) => {

    if(!req.file){
        return res.status(400).json({
            status: 'error', error: 'No se guardo el archivo'
        })
    }
    
    const avatar = req.file.path

    const {name, email, password} = req.body
    const data = await manager.createUser({name, email, password, avatar})

    res.json({status: 'success', data})
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(item => item.id == id);

    if (index != -1) {
        users.splice(index, 1);
        res.json({
            status: 'success'
        })
    } else {
        res.status(404).json({
            status: 'success',
            msg: 'Recurso no encontrado'
        })
    }
})

export default router