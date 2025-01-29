import { StatusCodes } from "http-status-codes";

export const errorHandler=(req,res,error)=>{
    console.log("Error Handling Reached : ");

    if(error?.cause=="CustomError"){
        res.status(StatusCodes.UNAUTHORIZED).json({
            error:"Unathorized Error",
            message: error.message
        })
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:"Internal Server Error",
        message:"An unexpected error appeared"
    })
}