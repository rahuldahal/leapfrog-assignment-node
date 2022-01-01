export function signUp(req, res){
    const {email, password} = req.body;
    res.status(201).json({message: `user is created with email ${email}`});
}