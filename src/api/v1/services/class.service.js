// Models
import _Class from '../models/class.model.js';

export const classService = {
    CreateClass: async ({
        name, grade
    }) => {
        try {
            const newClass = {
                name: name,
                grade: grade
            }

            const Class = await _Class.create(newClass);

            return {
                code: 201,
                elements: Class
            }
        } catch (error) {
            console.log(error)
        }
    }
}
