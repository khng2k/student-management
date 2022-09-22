// Services v2
import { userServices } from "../services/user.service.js";

export const userControllers = {
    InsertScore: async (req, res, next) => {
        try {
            const idStudent =  req.params.id;
            const subcode = req.params.code;
            const midterm = req.body.midterm;
            const endterm = req.body.endterm;

            const { code, elements } = await userServices.insertScore({midterm, endterm, subcode, idStudent});

            return res.status(201).json({
                code, elements
            })
        } catch (error) {
            console.log(error);
        }
    }
};