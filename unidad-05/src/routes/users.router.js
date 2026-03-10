import express from 'express'
import UsersManager from '../usersManagers.js'
import {uploader} from '../utils/utils.js'
const router = express.Router()
const manager = new UsersManager('./data/users.json')

router.get('/', async (req, res) => {
    const users = await manager.getUsers()
    res.json({status: 'success', data:users})
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

router.post('/', uploader.single('file'), async (req, res) => {

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