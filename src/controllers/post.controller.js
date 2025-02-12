import { StatusCodes } from "http-status-codes";
import { createPostService, deletePostbyIdService, getPostByIdService, getPostByUidService, getPostService, postUpdateService } from "../services/post.service.js";
import { createPostSchema, updatePostSchema } from "../schema/post.schema.js";

export const getAllPosts = async (req,res,next)=>{
    try{
        const data = await getPostService();
        res.status(StatusCodes.OK).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const createPost = async (req,res,next)=>{
    try{
        createPostSchema.parse(req.body);
        const data = await createPostService(req.body, req.userId);    
        res.status(StatusCodes.ACCEPTED).json(data);
        console.log("Post Created SUCCESSFULLY");
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const updatePostController = async (req,res,next)=>{
    try{
        updatePostSchema.parse(req.body);
        const data = await postUpdateService(req.params.postId, req.userId,req.body);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const getPostByIdController = async (req,res,next)=>{
    try{
        const data = await getPostByIdService(req.params);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const getPostByUserId = async (req,res,next)=>{
    try{
        const data = await getPostByUidService(req.params);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

export const deletePostbyId = async (req,res,next)=>{
    try{
        const post = req.params;
        const loggedInUserId = req.userId;
        const data = await deletePostbyIdService(post, loggedInUserId);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
}