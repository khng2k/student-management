import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
    name: String,
    code: String
}, {
    collection: 'Subjects',
    timestamps: true
})

export default model('Subjects', subjectSchema);