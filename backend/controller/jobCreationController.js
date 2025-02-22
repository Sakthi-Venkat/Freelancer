const jobCreationModel = require("../models/jobCreationModel");

exports.createJob = async (req ,res) =>{
    const {title , description , budget,  category , tags} = req.body;

    try {
        const client = req.user.id || req.user._id
        const newJob = new  jobCreationModel({
            client,
            title,
            description,
            budget,
            category,
            tags
        });
        
        const savedJob = await newJob.save();
        res.status(200).json({
            message: "Job created successfully",
            job : savedJob,
             success : true
        })

    } catch (error) {
         
        res.status(400).json({
            message : error.message,
            success : false
        })
    }

}
