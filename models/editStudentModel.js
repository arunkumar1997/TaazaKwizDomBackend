const mongoose = require("mongoose")

const editStudent = mongoose.Schema({
    Refid: {
        type: String
    },
    StudentName: {
        type: String
    },
    SchoolName: {
        type: String
    },

})

const EditStudent = mongoose.model("EditStudent", editStudent)

module.exports = EditStudent