import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

export const errorHandler = (error, req, res, next) => {
  console.error("Error logged in error handler:--", error?.message);

  if(error instanceof ZodError){
      console.log("Zod E");
      const errorMessages = error.errors.map((issue)=>({
          message : `${issue.path.join(".")} is ${issue.message}`
      }));
      res.status(StatusCodes.BAD_REQUEST).json({
          error: "Invalid Data",
          message: errorMessages
      })
  }
  
//TODO handle wrong value error
  if (error?.cause == "CustomError") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized error",
      message: error.message,
    });
  }

  if (error?.cause == "PostIdError"){
    res.status(StatusCodes.NOT_FOUND).json({
      error: "Invalid Post ID",
      message: error.message
    })

  }

  if (error instanceof jwt.JsonWebTokenError){
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized error",
      message: "Invalid token",
    });
  }

  // Catch-all for unexpected errors
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
};