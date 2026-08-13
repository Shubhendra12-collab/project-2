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