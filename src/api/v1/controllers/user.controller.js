import { userServices } from '../services/user.service.js';

export const userControllers = {
    logInUser: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { code, message, elements } = await userServices.signIn({ username, password });

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    RegisStudent: async (req, res, next) => {
        try {
            const { name, username, password, phone, grade, idClass } = req.body;
            const { code, message, elements } = await userServices.regisStudent({ name, username, password, phone, grade, idClass });

            return res.status(code).json({
                code, message, elements
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
};