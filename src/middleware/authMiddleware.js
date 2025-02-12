import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { prisma } from "../db/index.js";

export const authMiddleWare = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    const authToken = authHeader?.split(" ")[1];
    if(!authToken){
        res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid token."});
    }
    // console.log(authToken);
    try{
        const saman = jwt.verify(authToken, process.env.JWT_SECRET);
        // console.log(saman);
        const user = await prisma.user.findUnique({where:{id:saman.sub},omit:{password:true}});
        if(!user){
            res.status(StatusCodes.UNAUTHORIZED).json({message:"Wrong Token."});
        }
        req.userId=user.id;
        next();
    }catch(error){
        console.log(error);
    }

}