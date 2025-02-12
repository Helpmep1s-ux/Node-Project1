import { prisma } from "../db/index.js"

export const getPostService = async () =>{
    const posts = await prisma.post.findMany({include:{user:{omit:{password:true}}},orderBy:{createdAt:'desc'}});
    return posts;
}

export const createPostService = async (postText,userId) => {
    console.log(postText.content, userId);
    const res = await prisma.post.create({
        data:{
            content: postText.content,
            userId: userId
        }   
    })
    console.log("Posted",res.userId);
    return ({message: "Posted Successfully.", content: res.content});
}

export const getPostByIdService = async (post)=>{
    const res = await prisma.post.findUnique({where:{id: post.postId}});
    if(!res){
        throw new Error("NO POST FOUND",{cause : "PostIdError"});
    }
    else{
        return ({message: 'Found Post'},res);
    }
}

export const getPostByUidService = async (user)=>{
    const res = await prisma.post.findMany({where:{userId:user.userId}});
    if(!res){
        throw new Error("NO USER FOUND",{cause : "UserIdError"});
    }
    else{
        if(!res.posts){
            return({message: `No Post made by User`})
        }
        return ({message: 'Found User'},res.posts);
    }
}

export const deletePostbyIdService = async (post, userId)=>{
    const postToDelete = await prisma.post.findUnique({where:{id:post.postId}});
    if(!postToDelete){
        throw new Error("No such posts",{cause:"UserIdError"});
    }
    const checkUser = (userId==postToDelete.userId);
    if(!checkUser){
        throw new Error("FakeUser",{cause : "UserIdError"});
    }
    else{
        await prisma.post.delete({where:postToDelete});
        return {message:'Succesfully Deleted'};
    }
}

export const postUpdateService = async (postId, loggedInUserId, updateData) => {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new Error("Not Found", { cause: "CustomError" });
    }
  
    if (updateData.like){
      post.likesCount=post.likesCount+1;
      const data = await prisma.post.update({
        where: { id: postId },
        data: {
          likesCount:post.likesCount
        },
    })
    return data;
    }
  
    if (post.userId !== loggedInUserId) {
      throw new Error("You cannot perform this action", {
        cause: "UnauthorizedError",
      });
    } else {
      const data = await prisma.post.update({
        where: { id: postId },
        data: {
          content: updateData.content,
        },
      });
      return data;
    }
  };