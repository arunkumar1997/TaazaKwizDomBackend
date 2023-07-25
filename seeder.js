const mongoose = require("mongoose")
const connectDB = require("./db/db.js")

const Student = require('./models/studentModel.js')
const students = require('./data.js')

connectDB()

const importdata = async() => {
    try {
    await Student.deleteMany()

    await Student.insertMany(students)

    console.log("Data Successfully Imported")
    process.exit()
    } catch (error) {
    
    console.error(`${error}`)
    process.exit(1)
    }
}

const deletedata = async() => {
   try {
    await Student.deleteMany()

    console.log("Data successfully deleted")
    process.exit()

   } catch (error) {
    console.log(`${error}`)
    process.exit(1)
   }
}

if(process.argv[2] === "-d"){
    deletedata()
}else{
    importdata()
}