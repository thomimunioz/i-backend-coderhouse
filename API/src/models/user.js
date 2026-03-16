import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user'},
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }
})

export const User = mongoose.model('users', userSchema)