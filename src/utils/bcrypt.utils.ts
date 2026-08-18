import bcrypt from "bcryptjs";

//* Hashes a password using bcrypt.
export const hashPassword = async (password: string) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }catch(error){
        console.log(error);
        throw error;
    }
};

//* compare passwords
export const comparePassword = async(password: string, hashedPassword: string) =>{
    try{
        return await bcrypt.compare(password, hashedPassword);
    } catch(error){
        console.log(error);
        throw error;
    }
};