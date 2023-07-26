const mongoose = require("mongoose")

const schoolSchema = mongoose.Schema({
    name: {
        type: String
    },
})

const Schools = mongoose.model("Schools", schoolSchema)

module.exports = Schools