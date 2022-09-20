import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// Test Databases
import dbClass from './test_database/class.database.json' assert { type: "json" };;
import dbGrade from './test_database/grade.database.json' assert { type: "json" };;
import dbRole from './test_database/role.database.json' assert { type: "json" };;
import dbSubject from './test_database/subject.database.json' assert { type: "json" };;
import dbUser from './test_database/user.database.json' assert { type: "json" };;
// Models v1
import _Class from '../api/v1/models/class.model.js';
import _Grade from '../api/v1/models/grade.model.js';
import _Role from '../api/v1/models/role.model.js';
import _Subject from '../api/v1/models/subject.model.js';
import _User from '../api/v1/models/user.model.js';
import _Score from '../api/v1/models/score.model.js';

dotenv.config();

// connect mongose
mongoose
.connect(process.env.MONGO_URI)
.then( _ => console.log('Connected mongoose success!...'))
.catch(err => console.error(`Error: connect:::`, err))

// all executed methods log output to console
mongoose.set('debug', true)

// disable colors in debug mode
mongoose.set('debug', { color: false })

// get mongodb-shell friendly output (ISODate)
mongoose.set('debug', { shell: true })

const db = mongoose.connection;

// insert test database Class
_Class.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
        db.collection('Classes').insertMany(dbClass, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("add test database of Class to collection");
            }
        });
    }
});

// insert test database Grade
_Grade.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
        db.collection('Grades').insertMany(dbGrade, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("add test database of Grade to collection");
            }
        });
    }
});

// insert test database Role
_Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
        db.collection('Roles').insertMany(dbRole, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("add test database of Role to collection");
            }
        });
    }
});

// insert test database Subject
_Subject.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
        db.collection('Subjects').insertMany(dbSubject, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("add test database of Subject to collection");
            }
        });
    }
});

// insert test database User
_User.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
        const salt = await bcrypt.genSalt(10);
        for (let i of dbUser) {
            const hashpw = await bcrypt.hash(i.password, salt);
            i.password = hashpw;
        }
        await db.collection('Users').insertMany(dbUser, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("add test database of User to collection");
            }
        });
        const user = await _User.find({ role: 'student' });
        const subject = await _Subject.find({});
        const scores = [];

        for (let us of user) {
            const score = {
                idStudent: us.specs[0].v,
                grade: us.specs[1].v,
                idClass: us.specs[2].v,
                details: []
            };
            for (let sub of subject) {
                const scoreSub = {};
                scoreSub.Subject = sub.name;
                scoreSub.Code = sub.code;
                scoreSub.Score = {
                    "midterm": -1,
                    "endterm": -1,
                    "average": -1
                };
                score.details.push(scoreSub);
            }
            scores.push(score);
        }
        await db.collection('Scores').insertMany(scores, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
});

export { db };