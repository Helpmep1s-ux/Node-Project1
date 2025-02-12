import jsonwebtoken from "jsonwebtoken"

export const generateJwtToken = async (userID) => {
    const payload = {
        sub:userID,
        issueDate : new Date()
    };

    const options = {
        expiresIn:"2h",
    };

    try{
        const token = await jsonwebtoken.sign(payload, process.env.JWT_SECRET ,options);
        return token;
    }catch(error){
        console.log(error);
        throw new Error("Internal Server Error");
    }
}