import { Router } from "express"
import UserManager from "../managers/userManager.js"
import { isAdmin } from "../middleware/isAdmin.middleware.js"

const router = Router()
const userManager = new UserManager()

router.get('/', async (req, res) => {
    try {
        const users = await userManager.getUsers()
        res.json({ status: "success", payload: users })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al obtener usuarios" })
    }
})

router.get('/:uid', async (req, res) => {
    try {
        const user = await userManager.getUserById(req.params.uid)
        if (!user) return res.status(404).json({ status: "error", error: "Usuario no encontrado" })
        res.json({ status: "success", payload: user })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error interno" })
    }
})

router.delete('/:uid', async (req, res) => {
    try {
        const deletedUser = await userManager.deleteUser(req.params.uid)
        if (!deletedUser) return res.status(404).json({ status: "error", error: "Usuario no encontrado" })
        res.json({ status: "success", message: "Usuario eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al eliminar usuario" })
    }
})

router.put('/:uid/role', isAdmin, async (req, res) => {
    try {
        const user = await userManager.getUserById(req.params.uid)
        const newRole = user.role === 'user' ? 'admin' : user
        await userManager.updateUser(req.params.uid, {role: newRole})
        res.json({ status: 'success', message: 'Rol actualizado' });
    } catch (error) {
        {res.status(500).json({ error: "Error" })}
    }
})

router.delete('/:uid', isAdmin, async (req, res) => {
    try {
        await userManager.deleteUser(req.params.uid)
        res.json({ status: 'success', message: 'Usuario eliminado' });
    } catch (error) {
        { res.status(500).json({ error: "Error" })}
    }
})

export default router