const Admin = require("../models/adminModel")
const Student = require("../models/studentModel")
const EditStudent = require("../models/editStudentModel.js");

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const admin = await Admin.create({
    name: name,
    email: email,
    password: password
  })

  res.json(admin)
}

const getAdmin = async (req, res) => {
  const getadmin = await Admin.findOne({ email: "admin@example.com" });

  if (getadmin) {
    res.json(getadmin)
  }
}

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Please fill all the fields" });
  } else if (email !== "admin@example.com" || password !== "123456") {
    return res.json({ message: "Invalid Email or Password" });
  }

  try {
    const admin = await Admin.find({ email, password });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};


const adminChange = async (req, res) => {
  try {

    // var student_id = "64ca7272a9b9894eaa57db41";

    const filterStud = { _id: Object(req.params.Refid) };

    const filterEdit = { _id: Object(req.params.id) };

    await Student.findOneAndUpdate(filterStud, { StudentName: req.params.requestedName }).then(res => {



      console.log(res)
    }).catch(err => console.log(err));

    await EditStudent.findOneAndUpdate(filterEdit, { isApproved: true })


    res.json({ message: "worked" })

    // const editStudent =  EditStudent.findById(req.params.id);

    // if (editStudent) {
    //   editStudent.StudentName = editStudent.requestedName;
    //   editStudent.SchoolName = editStudent.requestedSchoolName;
    //   editStudent.requestedName = "No Request";
    //   editStudent.requestedSchoolName = "No Request";
    // }
    // const updatedEditStudent = await editStudent.save();

    // if (updatedEditStudent) {
    //   res.json({
    //     updatedEditStudent: updatedEditStudent,
    //   });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the students." });
  }
};

// const adminChange = async (req, res) => {
//   const id = "64ca726ea9b9894eaa57c9a9"
//   const student = await EditStudent.findOne({ Refid:id});

//  res.json(student)
// };


module.exports = {
  registerAdmin,
  loginAdmin,
  adminChange,
  getAdmin
}