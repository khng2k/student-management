// Models
import _Subject from '../models/subject.model.js';

export const subjectService = {
    CreateSubject: async({
        name, cod
    }) => {
        try {
            const newSubject = {
                name: name,
                code: cod
            }

            const Subject = await _Subject.create(newSubject);

            return {
                code: 201,
                elements: Subject
            }
        } catch (error) {
            console.log(error)
        }
    }
}