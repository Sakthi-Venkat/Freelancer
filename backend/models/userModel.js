const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type : String ,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String ,
        required : true
    },
      role: {
        type : String ,enum :['client' , 'freelancer'],
         required : true
      },

      profile : {
         bio:{
            type : String

         },
         skills: [{
            type : String
         }],
         portfolioLinks : [{
            type : String 
         }],
         githubLinks : [{
            type : String
         }]
      },

      rating : {
            type : Number,
            default : 0
      ,
    createdAt: {
        type: Date,
        default: Date.now
    }},
    updatedAt :{
        type : Date,
        default : Date.now
    },


});

 // this is a functionality where we can change something if we ned to change 
 // live date of updation  before saving it

 userSchema.pre('save',function(next) {
    this.updatedAt = Date.now();
    next();
 } )

 module.exports = mongoose.model('UserModel', userSchema);