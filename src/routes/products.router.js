import { Router } from 'express'
import ProductManager from '../managers/productManager.js'
import { isAdmin } from '../middleware/isAdmin.middleware.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query

        const result = await productManager.getProducts({limit, page, sort, query})

        const baseUrl = req.protocol + '://' + req.get('host') + req.baseUrl
        const buildLink = (pageNumber) => {
            let link = `${baseUrl}?page=${pageNumber}&limit=${limit}`
            if(sort) link += `&sort=${sort}`
            if(query) link += `&query=${query}`
            return link
        }

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
        })
    } catch (error) {
            console.error(error)
            res.status(500).json({ status: "error", error: "Error leyendo productos" })
    }
})

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid
    const product = await productManager.getProductById(pid)
    if(!product){
        return res.send("Producto no encontrado")
    }
    res.json(product)
})

router.post("/", isAdmin, async (req, res) => {
    try {
        const newProduct = await productManager.createProduct(req.body)
        res.status(201).json({ status: "success", product: newProduct })
    } catch (error) {
        res.status(400).json({ status: "error", error: "Error al crear el producto" })
    }
})

router.put("/:pid", async (req, res) => {
    const pid = req.params.pid
    const updatedProduct = await productManager.updateProduct(pid, req.body)
    if(!updatedProduct){
        return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json({ status: "success", product: updatedProduct })
})

router.delete("/:pid", isAdmin, async (req, res) => {
    try {
        const pid = req.params.pid
        const deletedProduct = await productManager.deleteProduct(pid)
        if(!deletedProduct){
            return res.status(404).json({ error: "Producto no encontrado" })
        }
        res.json({ status: "success", message: "Producto eliminado" })
    } catch (error) {
        res.status(500).json({ status: "error", error: "Error al eliminar" })
    }
})

export default router