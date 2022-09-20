import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Models
import _User from '../models/user.model.js';
import _Score from '../models/score.model.js';
// Services
import { scoreServices } from './score.service.js';
// Databases
import { db } from '../../../databases/init.mongodb.js';

// Utils
export const userServices = {
    signIn: async ({
        username, password
    }) => {
        try {
            const user = await _User.findOne({ username });
            if (!user) {
                return {
                    code: 403,
                    message: "Wrong username or password!"
                }
            }

            const isvalid = await bcrypt.compare(password, user.password);

            if (!isvalid) {
                return {
                    code: 403,
                    message: "Wrong username or password!"
                }
            }

            const token = jwt.sign({id: user.id}, process.env.SECRET_ACCESS_TOKEN, {
                expiresIn: 30
            })

            return {
                code: 200,
                elements: { id: user.id, name: user.name, accessToken: token}
            };

        } catch (error) {
            console.log(error);
        }
    },

    regisStudent: async ({
        name, username, password, phone, grade, idClass
    }) => {
        try {
            // hash passwrod
            const salt = await bcrypt.genSalt(10);
            const hashPw = await bcrypt.hash(password, salt);

            const users = await _User.find({role: 'student'});

            let id = ''
            const count = users.length + 1;
            
            if (count < 10) {
                id = 'st00' + count.toString();
            } else if (count >= 10 && count < 100) {
                id = 'st0' + count.toString();
            } else {
                id = 'st' + count.toString();
            }

            const newUser = {
                name: name,
                username: username,
                password: hashPw,
                phone: phone,
                role: "student",
                specs: [
                    { "k": "idStudent", "v": id },
                    { "k": "Grade", "v": grade },
                    { "k": "idClass", "v": idClass }
                ]
            };

            const user = await _User.create(newUser);
            const score = await scoreServices.createTranscript({idStudent: id, grade: grade, idClass, idClass});
            await _Score.create(score);

            return {
                code: 201,
                elements: user
            }

        } catch (error) {
            console.log(error);
        }
    }
};  