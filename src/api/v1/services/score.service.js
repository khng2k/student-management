// Models
import _User from '../models/user.model.js';
import _Score from '../models/score.model.js';
import _Subject from '../models/subject.model.js';

// Utils
export const scoreServices = {
    // transcript
    createTranscript: async ({
        idStudent, grade, idClass
    }) => {
        try {
            const subject = await _Subject.find({});
            const score = {
                idStudent: idStudent,
                grade: grade,
                idClass: idClass,
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

            return score;
        } catch (error) {
            console.log(error);
        }
    },
}