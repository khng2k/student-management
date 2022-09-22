import jwt from "jsonwebtoken";
import _User from "../models/user.model.js";
import _Role from "../models/role.model.js";

export const authToken = {
    // verify Access Token
    verifyToken: async(req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];

            if (!authHeader) {
                return res.status(403).send({message: "You need sign in"});
            }
        
            const token = authHeader.split(' ')[1]
        
            if (!token) {
                return res.status(403).send({message: "Không có token"});
            }
        
            jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err,decoded) => {
                if (err) {
                    return res.status(401).send({message: "Không có quyền truy cập"});
                }
                req.userId = decoded.id;
                next();
            })
        } catch (error) {
            console.log(error);
        }
    },

    
};

// Role Based Authorization
export const authPage = permission => {
    return (req,res,next) => {
        _User.findById(req.userId).exec((err,user)=>{
            if(err){
                res.status(500).send({message: err});
                return;
            }
    
            if (!user) {
                res.status(500).send({message: "Server Error"});
                return;
            }
    
            if(!permission.includes(user.role)){
                return res.status(401).send({message: "Your account does not have access!"});
            }
    
            next();
        })
    }
}
