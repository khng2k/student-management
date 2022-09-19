import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: String
}, {
    collection: 'Roles',
    timestamps: true
})

export default model('Roles', roleSchema);