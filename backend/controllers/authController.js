const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"})
}
//Register User
exports.registerUser = async (req, res) =>{
    console.log(req.body);
    const {fullName, email, password, profileImageUrl} = req.body;

    //Validation: Check for missing fields
    if(!fullName || !email || !password) {
        return res.status(400).json({message: "You lazy fuck, fill in the fields goddammit"})
    }

    try{
        //check if email already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "You want a duplicate of yourself? don't enter an existing email you dumb fuck"})
        }

        //Create The User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch(err){
        res
            .status(500)
            .json({message: "Error Creating User", error: err.message})
    }
}
//Login User
exports.loginUser = async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "My god you're so dumb enter the crendentials bruh"});
    }

    try{
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "Wrong credentials lmaooo"});
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    }catch(err){
        return res.status(500).json({message: "Error loggin in the User", error: err.message});
    }
};
//Get User
exports.getUserInfo = async (req, res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({ user });
    }catch(err){
        res.status(500).json({message: "Error getting the User", error: err.message})
    }
};