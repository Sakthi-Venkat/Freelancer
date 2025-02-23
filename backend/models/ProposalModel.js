const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({

    job: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'jobCreationModel',
        required : true
    },

    freelancer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserModel",
        required : true
    },

    proposalText : {
        type : String,
        required : true
    },
    proposalAmount : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        enum : ['pending', 'rejected' , 'accepted'],
        default : 'pending'
    },
    createdAt : {
        type : Date,
        default : Date.now
    },

    updateAt : {
        type : Date,
        default : Date.now
    },
});

proposalSchema.pre("save", function(next) {
    this.updateAt = Date.now();
    next();
})

module.exports = mongoose.model("Proposal", proposalSchema);