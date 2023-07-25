const Admin = require("../models/adminModel")
const Student = require("../models/studentModel")

const registerAdmin = async(req,res) => {
    const {name,email,password} = req.body;

    const admin = await Admin.create({
        name:name,
        email:email,
        password:password
    })

    res.json(admin)
}

const loginAdmin = async(req,res) => {
    const {email,password} = req.body;

    const admin = await Admin.find({email,password})

    res.json(admin)
}

const adminChange = async (req, res) => {
    const id = req.params.id;
  
    const student = await Student.findById(id);

    if (student) {
        student.StudentName = student.requestedName ,
        student.SchoolName = student.requestedSchoolName ,
        student.requestedName = "No Request",
        student.requestedSchoolName = "No Request"
      }
  
    const updatedStudent = await student.save();
  
    if (updatedStudent) {
      res.json(updatedStudent);
    }
  };

module.exports = {
    registerAdmin,
    loginAdmin,
    adminChange
}