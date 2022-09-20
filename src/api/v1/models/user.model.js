import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    phone: String,
    role: String,
    specs: []
}, {
    collection: 'Users',
    timestamps: true
})

export default model('Users', userSchema);