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

exports.getJobs = async (req,res) =>{
    try {
      const {filter , sort} = req.query;
         
       let query = {};
       if(filter){
        query.category = {
            $regex : filter,
            $options : "i"
        }
       }
         let sortOptions = {};
         
         if(sort === "budget"){
            sortOptions.budget = 1;
         } else if (sort === "createdAt") {
            sortOptions.createdAt = -1;

         }


        
        

        const jobs = await jobCreationModel
             .find(query)
             .sort(sortOptions)        
        .find().populate("client" , "name email");


        res.status(200).json({
            success : true,
            jobs
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message,
            success : false
        })

    }
}

exports.getJobById = async(req,res) =>{
    try {
        const job = await jobCreationModel.findById(req.params.id).populate("client" , "name email");

        if(!job){
            return res.status(404).json({
                message : "Job not found",
                success : false
            })
        }

        res.status(200).json({
            success : true,
            job
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message,
            success : false
        })
    }
}

exports.updateJob = async(req,res) =>{
    try {
        const updateJob = await jobCreationModel.findByIdAndUpdate(req.params.id,
            {status : req.body.status},
            {new : true}
         )

         if(!updateJob){
            return res.status(404).json({
                message : "Job not found",
                success : false
            })
         }

         res.status(200).json({
            message : "Job updated successfully",
            success : true,
            job : updateJob
         })
        
    } catch (error) {
        res.status(400).json({
            message : error.message,
            success : false
        })
    }
}

exports.deleteJob = async (req ,res) =>{
    try {
         const deleteJob = await jobCreationModel.findByIdAndDelete(req.params.id);

         if(!deleteJob){
            return res.status(404).json({   
                message : "Job not found",
                success : false
            })
         }

         res.status(200).json({
            message : "Job deleted successfully",
            success : true
         })

    } catch (error) {
        res.status(400).json({
            message : error.message,
            success : false
        })
    }
};