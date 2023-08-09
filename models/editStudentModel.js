const mongoose = require("mongoose")

const editStudent = mongoose.Schema({
    Refid: {
        type: String
    },
    requestedSchoolName:{
        type:String,
        default:"No Request"
    },
    requestedName:{
        type:String,
        default:"No Request"
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    StudentName: {
        type: String
    },
    SchoolName: {
        type: String
    },
    PhoneNumber: {
        type: Number,
        // required: true
    },

})

const EditStudent = mongoose.model("EditStudent", editStudent)

module.exports = EditStudent