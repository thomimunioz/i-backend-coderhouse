import { Product } from '../models/product.js'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'

export const autoSeed = async () => {
    try {
        const adminExists = await User.findOne({email: "admin@coder.com"})
        if (!adminExists) {
            console.log("🌱 Sembrando usuario admin...")
            const adminUser = {
                name: "Administrador",
                email: "admin@coder.com",
                password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10)),
                role: "admin"
            }
            await User.create(adminUser)
            console.log("✅ Usuario Admin creado con éxito.")
        }

        const productsCount = await Product.countDocuments()
        if (productsCount === 0) {
            console.log("🌱 Base de productos vacía. Sembrando catálogo inicial...")
            const products = [
                { title: "Monitor LG UltraGear 27'' 144Hz", description: "Monitor gamer IPS de 27 pulgadas.", code: "MON-LG-144", price: 320000, stock: 15, category: "monitores", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Mouse Logitech G502 Hero", description: "Mouse gamer con sensor HERO 25K.", code: "MOU-G502", price: 95000, stock: 30, category: "perifericos", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Teclado Mecánico Redragon Kumara", description: "Teclado mecánico compacto.", code: "KEY-KUMARA", price: 78000, stock: 25, category: "perifericos", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Memoria RAM Corsair Vengeance 16GB", description: "Kit de memoria RAM DDR4 3200MHz.", code: "RAM-COR-16", price: 110000, stock: 20, category: "componentes", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Fuente Corsair 750W 80+ Gold", description: "Fuente de alimentación modular.", code: "PSU-COR-750", price: 145000, stock: 12, category: "componentes", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "SSD Samsung 1TB NVMe", description: "Disco sólido NVMe 1TB.", code: "SSD-SAM-1TB", price: 130000, stock: 40, category: "almacenamiento", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Gabinete NZXT H510", description: "Gabinete ATX minimalista.", code: "CASE-NZXT", price: 120000, stock: 10, category: "componentes", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Placa de Video RTX 4060", description: "GPU NVIDIA RTX 4060.", code: "GPU-RTX4060", price: 680000, stock: 8, category: "componentes", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Mousepad XL HyperX", description: "Mousepad de gran tamaño.", code: "PAD-HYPERX", price: 22000, stock: 50, category: "perifericos", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Auriculares HyperX Cloud II", description: "Auriculares gamer 7.1.", code: "HEAD-HYPERX", price: 115000, stock: 18, category: "perifericos", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Monitor LG Ultrawide 34''", description: "Monitor ultrapanorámico, perfecto para visualizar múltiples ventanas y bases de datos grandes.", code: "MON-LG-UW34", price: 450000, stock: 7, category: "monitores", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Sampler Roland SP-404MKII", description: "Sampler creativo y procesador de efectos, ideal para beatmaking en vivo.", code: "SAMP-ROL-404", price: 550000, stock: 5, category: "audio", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Controlador MIDI Akai MPK Mini Mk3", description: "Teclado controlador MIDI de 25 teclas con pads sensibles a la velocidad.", code: "MIDI-AKAI-MINI", price: 120000, stock: 12, category: "audio", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Joystick Inalámbrico Xbox Series X/S", description: "Control oficial de Xbox, ideal para jugar en PC con máxima precisión.", code: "JOY-XBOX", price: 85000, stock: 40, category: "perifericos", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Micrófono HyperX QuadCast", description: "Micrófono condensador USB con iluminación roja.", code: "MIC-HYPERX", price: 160000, stock: 14, category: "audio", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Silla Gamer Corsair T3 Rush", description: "Silla ergonómica de tela transpirable.", code: "CHAIR-COR-T3", price: 380000, stock: 4, category: "accesorios", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Webcam Logitech C920 HD Pro", description: "Cámara web Full HD 1080p.", code: "CAM-LOGI-C920", price: 95000, stock: 22, category: "perifericos", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Motherboard ASUS ROG Strix B550-F", description: "Placa base ATX para procesadores AMD Ryzen.", code: "MOBO-ASUS-B550", price: 210000, stock: 9, category: "componentes", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Cooler CPU Noctua NH-D15", description: "Disipador de aire de doble torre para máximo rendimiento.", code: "COOL-NOC-D15", price: 135000, stock: 11, category: "componentes", thumbnails: ["https://via.placeholder.com/300"] },
                { title: "Disco Duro HDD Seagate 2TB", description: "Disco duro interno SATA 3.5 pulgadas.", code: "HDD-SEA-2TB", price: 65000, stock: 35, category: "almacenamiento", thumbnails: ["https://via.placeholder.com/300"] }
            ]

            await Product.insertMany(products)
            console.log("✅ 20 Productos iniciales cargados con éxito.")
        }
    } catch (error) {
        console.error("❌ Error al ejecutar el auto-seeder:", error)
    }
}