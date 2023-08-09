const mongoose = require("mongoose")
const moment = require("moment")

const missingRecordSchema = mongoose.Schema({
    SchoolName: {
        type: String,
        required: true
    },
    StudentName: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        // set: function (dob) {
        //     // Parse the string date using Moment.js
        //     const date = moment(dob, 'DDMMYYYY').utcOffset(0) // Apply UTC offset to prevent timezone adjustment
        //         .hours(0) // Set the hours to 0 to avoid any time discrepancies
        //         .minutes(0) // Set the minutes to 0
        //         .seconds(0) // Set the seconds to 0
        //         .milliseconds(0) // Set the milliseconds to 0.toDate();
        //         .toDate();
        //     return date;
        // },
        // required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Remarks: {
        type: String,
        required: false
    },
    isCreated: {
        type: Boolean,
        default: false
    }
})

const MissingRecords = mongoose.model("MissingRecords", missingRecordSchema)

module.exports = MissingRecords