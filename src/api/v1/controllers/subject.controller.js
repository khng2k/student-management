// Services
import { subjectService } from "../services/subject.service.js";

export const subjectController = {
    createSubject: async (req, res, next) => {
        try {
            const { name, cod } = req.body;
            const {code, elements} = subjectService.CreateSubject({name, cod});

            return res.status(code).json({
                code, elements
            })
        } catch (error) {
            console.log(error);
        }
    }
}