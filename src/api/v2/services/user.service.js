// Models v1
import _User from '../../v1/models/user.model.js';
import _Score from '../../v1/models/score.model.js';
import _Subject from '../../v1/models/subject.model.js'; 

export const userServices = {
    insertScore: async ({midterm, endterm, subcode, idStudent}) => {
        try {
            let average = (midterm*1 + endterm*2)/3;
            const scoreSub = {
                "midterm": midterm,
                "endterm": endterm,
                "average": average.toFixed(2)
            };
            const scoreStudent = await _Score.findOne({idStudent});
            const scores = scoreStudent.details;

            for (let i =0; i < scores.length; i++) {
                if (scores[i].Code == subcode) {
                    scores[i].Score = scoreSub;
                    break;
                }
            }

            const score = await _Score.updateOne(
                { "idStudent": idStudent }, 
                { $set: { "details": scores } });


            return {
                code: 201,
                elements: score
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}