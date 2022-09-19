import { Schema, model } from "mongoose";

const classSchema = new Schema({
    name: String,
    grade: Number,
    totalStu: Number
}, {
    collection: 'Classes',
    timestamps: true
})

export default model('Classes', classSchema);