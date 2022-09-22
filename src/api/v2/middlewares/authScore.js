// Models v1
import _Score from '../../v1/models/score.model.js';
import _Role from '../../v1/models/role.model.js';
import _User from '../../v1/models/user.model.js';
import _Subject from '../../v1/models/subject.model.js';

export const authScore = {
    checkUserInsertScore: async(req, res, next) => {
        if (req.body.midterm == "" || req.body.endterm == "") {
            return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
        }
        try {
            const idStudent =  req.params.id;
            const subcode = req.params.code;

            // check user
            const user = await _User.findOne({"specs.v": idStudent});
            if (!user) {
                res.status(500).send({message: "Server Error"});
            }
            // class of student
            const classStudent = user.specs[2].v ;

            // check subject
            const subject = await _Subject.find({code: subcode});
            if (!subject) {
                res.status(500).send({message: "Server Error"});
            }

            // get info user login
            const userLogin = await _User.findOne({_id: req.userId});
            if (!userLogin) {
                res.status(500).send({message: "Server Error"});
            }

            // check role is admin
            if (userLogin.role == 'admin') {
                next();
            }

            // subject and class teaching by user
            const teaching = userLogin.specs[2].v.split('-');
            const subTeach = teaching[0];
            const classTeach = teaching.slice(1)
            
            if (subTeach != subcode || !classTeach.includes(classStudent)) {
                return res.status(401).send({message: "Your account does not have access!"});
            }

            next();   
        } catch (error) {
            console.log(error)
        }
    }
}