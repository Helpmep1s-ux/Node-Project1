import bcrypt from 'bcrypt';

const saltRound = 10;

export const generateHashForPassword = async (password) =>{
    try{
        const hash = await bcrypt.hash(password, saltRound);
        return hash;
    }catch(error){
        console.log(error);
    }
}

export const checkPassword = async (userPassword, dbPassword) => {
    return await bcrypt.compare(userPassword, dbPassword);
}