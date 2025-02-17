import { StatusCodes } from "http-status-codes";
import { loginUserService, getAllUsersService, registerUserService, deleteAllUsersService, getUserProfileService } from "../services/user.service.js";
import { createUserSchema, loginUserSchema } from "../schema/user.schema.js";

export const getAllUsersController = async (req,res,next)=>{
    console.log(req);
    try{
        const data = await getAllUsersService(req.body);
        res.status(StatusCodes.OK).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const registerUserController = async (req,res,next)=>{
    console.log(req);
    try{
        createUserSchema.parse(req.body);
        const data = await registerUserService(req.body);
        res.status(StatusCodes.ACCEPTED).json(data);
        console.log("REGISTERED SUCCESSFULLY");
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const userLoginController = async (req,res,next)=>{
    // console.log(req);
    try{
        loginUserSchema.parse(req.body);
        const data = await loginUserService(req.body);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const deleteAllUsersController = async (req,res,next)=>{
    console.log(req);
    try{
        const data = await deleteAllUsersService(req.body);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const getUserProfile = async (req,res,next)=>{
    console.log(req.userId);
    try{
        const data = await getUserProfileService(req.userId);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}