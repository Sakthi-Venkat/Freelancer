const userModel = require("../models/userModel");
const { doHash } = require("../utils/hashing");


exports.register = async (req,res) =>{

    const {email, password, role,name} = req.body;
    try {
        if(!email || !password || !role || !name){
            return res.status(400).json({
                success : false,
                message : "Please provide all the details"
            })
        }
    
        const existingUser = await userModel.findOne({email});
    
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }
    
        const hashedPassword = doHash(password, 15);
    
        const newUser = new userModel({
            name,
            email,
            password : hashedPassword,
            role
        });
    
        const savedUser = await newUser.save();
        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;
    
        return res.status(200).json({
            success : true,
            message : "User created successfully",
            user : userWithoutPassword
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
        
    }

    
}