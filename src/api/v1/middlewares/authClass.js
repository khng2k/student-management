// Models
import _Class from '../models/class.model.js';

export const authClass = {
    checkCreateClass: async (req, res, next) => {
        if (req.body.name == "" || req.body.grade == "") {
            return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
        }

        try {
            const idClass = req.body.name;
            const grade = req.body.grade;
            const numberClass = idClass.substring(0, 2);
            const listGrade = ['10', '11', '12'];
            const listClass = await _Class.find({});

            if (!listGrade.includes(numberClass) || numberClass != grade) {
                res.status(400).send({message: "Invalid Class"});
                return;
            }

            for (let i of listClass) {
                if (idClass === i.name) {
                    res.status(400).send({message: "This name class is already in classes !"});
                    return;
                }
            }
            next();
        } catch (error) {
            console.log(error);
        }
    }
}