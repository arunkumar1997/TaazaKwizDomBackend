const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

// mongodb://root:kwizdom$1234@3.144.83.203:27017/

const connectDB = async () => {
    try {

        

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB is successfully connected:${conn.connection.host}`)

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB