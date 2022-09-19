// Models
import _User from '../models/user.model.js';

export const authUser = {
    // check sign up Student
    checkRegisStudent: async (req, res, next) => {
        if (req.body.name == "" || req.body.username == "" || req.body.phone == "" || req.body.password == "" || req.body.grade == "" || req.body.idClass == "") {
            return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
        }

        try {
            const { username, phone } = req.body;
            const getUserByUsername = await _User.findOne({ username });
            const getUserByPhone = await _User.findOne({ phone });

            // check username avaiable
            if (getUserByUsername) {
                res.status(400).send({message: "This username is already in user!"});
                return;
            }

            // check phone avaiable
            if (getUserByPhone) {
                res.status(400).send({message: "This phone is already in user!"});
                return;
            }

            next();
        } catch (error) {
            console.log(error);
        }
    },
    // check sign in
    checkSignIn: async (req, res, next) => {
        try {
            // check null
            if (req.body.username == "" || req.body.password == "") {
                return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
            }

            // check user exists
            const user = _User.findOne({ username: req.body.username });
            if (!user) {
                res.status(403).send({ message: "Wrong username or password!" });
                return;
            }

            next();
        } catch (error) {
            console.log(error);
        }
    }
};