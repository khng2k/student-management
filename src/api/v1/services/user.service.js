import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Models
import _User from '../models/user.model.js';

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
            const newUser = {
                name: name,
                username: username,
                password: hashPw,
                phone: phone,
                specs: [
                    { "k": "Grade", "v": grade },
                    { "k": "idClass", "v": idClass },
                    { "k": "Score", "v": {
                        "Math": {
                            "Midterm": 0,
                            "Endterm": 0,
                            "average": 0
                        },
                        "Literature": {
                            "Midterm": 0,
                            "Endterm": 0,
                            "average": 0
                        },
                        "Information Technology": {
                            "Midterm": 0,
                            "Endterm": 0,
                            "average": 0
                        },
                        "Total Score": 0
                    } }
                ]
            };

            const user = await _User.create(newUser);

            return {
                code: 201,
                elements: user
            }
        } catch (error) {
            console.log(error);
        }
    }
};  