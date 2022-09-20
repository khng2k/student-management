import { Schema, model } from "mongoose";

const scoreSchema = new Schema({
    idStudent: String,
    grade: Number,
    idClass: String,
    details: []
}, {
    collection: 'Scores',
    timestamps: true
})

export default model('Scores', scoreSchema);