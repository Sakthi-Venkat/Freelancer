const userModel = require("../models/userModel")

exports.getProfile = async (req,res) =>{
    try {
          
        const profile = await userModel.findOne({email : req.user.email}).select("-password");

        if(!profile ){
            return res.status(404).json({message : "Profile not found"})
        }

        res.status(200).json({success : true , profile})
        
    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }

}


exports.updateProfile = async (req ,res) => {
    try {

        const allowedUpdatableFields = ["name" , "email" , "profile"];
        const updateData = {};

        for(let key of allowedUpdatableFields){
            if(req.body[key] !== undefined){
                updateData[key] = req.body[key];
            }
        }

        const updateUser = await userModel.findOneAndUpdate(
           {email : req.user.email},
            updateData,
            {new:true , runValidators : true}
    ).select("-password");

    if(!updateUser){
        return res.status(404).json({message : "User not found"})
    }

    res.status(200).json({success : true , updateUser})
    } catch (error) {
        res.status(500).json({success : false , message : error.message})

    }
};