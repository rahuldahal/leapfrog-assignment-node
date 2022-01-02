import { createUser } from "../models/User";

export async function signUp(req, res){
    const {email, password} = req.body;
    const {error, message} = await createUser({email, password});
    if(error){
        const {reason, errorMessage} = error;
        const statusCode = reason === 'clientError' ? 400 : 500;
        return res.status(statusCode).json({message: {error: errorMessage}});
    }
    return res.status(201).json({message});
}