const userModel = require("../models/userModel");
const { doHash, doHAshValidation } = require("../utils/hashing");


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


exports.login = async (req,res) =>{
    const {email , password}  = req.body;
     try {
         const existingUser = await userModel.findOne({email});

         if(!existingUser){
             return res.status(400).json({
                 success : false,
                 message : "User does not exist"
             })
         }

         const isPasswordValid = await doHAshValidation(password ,  existingUser.password);

        if (!isPasswordValid){
             return res.status(400).json({
                 success : false,
                 message : "Invalid credentials"
             })
         }
          const token = jwt.sign({
              id : existingUser._id,
              role : existingUser.role,
              email : existingUser.email} ,
               process.env.JWT_SECRET, {
                     expiresIn : "1d"
               }
          );

           res.cookie(
            'Authorization' , `Bearer ${token}`, 
            {
                httpOnly : true,
                expires : new Date(Date.now() + 24*60*60*1000),
                secure : process.env.NODE_ENV === "production",
            }
           )

           res.status(200).json({
            success : true,
            message : "User logged in successfully",
            user : existingUser,
           })
        
     } catch (error) {
         console.log(error);
         res.status(500).json({
             success : false,
             message : error.message
         })
     }
}