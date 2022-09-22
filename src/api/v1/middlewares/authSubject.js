// Models
import _Subject from '../models/subject.model.js';

export const authSubject = {
    checkCreateSubject: async (req, res, next) => {
        if (req.body.name == "" || req.body.code == "") {
            return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
        }

        try {
            const name = req.body.name;
            const code = re.body.code;

            const subject = await _Subject.find({});

            for (let sub in subject) {
                if (sub.name === name) {
                    res.status(400).send({message: "This name subject is already in subjects!"});
                    return;
                }

                if (subject.code === code) {
                    res.status(400).send({message: "This code subject is already in subjects!"});
                    return;
                }
            }
            next();
        } catch (error) {
            console.log(error);
        }
    }
}