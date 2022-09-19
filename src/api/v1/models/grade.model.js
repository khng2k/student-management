import { Schema, model } from "mongoose";

const gradeSchema = new Schema({
    name: Number
}, {
    collection: 'Grades',
    timestamps: true
})

export default model('Grades', gradeSchema);