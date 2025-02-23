const mongoose = require("mongoose");

const jobCreationSchema = new mongoose.Schema({
     client :{
        type:  mongoose.Schema.Types.ObjectId, 
        ref: "UserModel" ,
        required: true
     },

     title : {
        type: String,
        required: true
     },
     description : {
        type: String,
        required: true

     },

     budget : {
        type : Number,
        required: true
     },

     status :{
        type : String,
        enums : ["open", "in rogress" , "completed"],
        default : "open"
     },

     category : {
        type : String,
        
     },
     
     tags : [{
        type : String,
     }],
      createdAt : {
        type : Date ,
        default : Date.now
      },
      updatedAt: {
        type : Date,
        default : Date.now
      }
 })

 jobCreationSchema.pre("save" , function(next) {
    this.updatedAt = Date.now();
    next();

 });

 module.exports = mongoose.model("JobCreation", jobCreationSchema);