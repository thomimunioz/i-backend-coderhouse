import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.MONGO_URL

export const connectDB = async () => {
    try {
        if (!connectionString) {
            throw new Error("La URL de MongoDB no está definida en el archivo .env");
        }
        await mongoose.connect(connectionString)
        console.log('✅ - Conectado a MongoDB Atlas (Cloud)')
    } catch (error) {
        console.error('❌ - Error al conectarse a la base de datos:', error)
        process.exit(1)
    }
}