// Services
import { classService } from "../services/class.service.js";

export const classController = {
    createClass: async (req, res, next) => {
        try {
            const { name, grade } = req.body;
            const { code, elements } = await classService.CreateClass({name, grade});

            return res.status(code).json({
                code, elements
            })
        } catch (error) {
            console.log(error)
        }
    }
}