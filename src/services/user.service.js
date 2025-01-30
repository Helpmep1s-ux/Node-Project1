import { prisma } from "../db/index.js";
import { checkPassword, generateHashForPassword } from "../libs/password.util.js";

export const getAllUsersService = async ()=>{
    return await prisma.user.findMany({
        omit:{
            password:true
        }
    });
}

export const registerUserService = async (registerUserData)=>{
    const hashedPassword = await generateHashForPassword(
        registerUserData.password
    );
    
    const res = await prisma.user.create({
        data:{
            email: registerUserData.email,
            fullName: registerUserData.fullName,
            gender: registerUserData.gender,
            password: hashedPassword
        },
        omit:{
            password:true
        }
    })
    return {message: "Registered Successfully."};
}

export const loginUserService = async (loginData)=>{
    console.log(loginData);
    const email = loginData.email;
    const password = loginData.password;
    console.log("Checking Database for login");

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    });
    if(!user){
        throw new Error("Invalid Credentials.",{cause: "CustomError"});
    }
        const hashPass = user.password;
        const isPasswordSame = await checkPassword(password, hashPass);
        if(!isPasswordSame){
            throw new Error("Invalid Credentials.",{cause: "CustomError"});
        }
        delete user.password;
            return {message: "Login Successfull.",user};
}

export const  deleteAllUsersService = async (userData)=>{
    console.log(userData);
    return await prisma.user.deleteMany({where:{fullName: userData.fullName}});
}