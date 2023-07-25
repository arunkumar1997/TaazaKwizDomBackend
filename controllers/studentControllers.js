const Student = require("../models/studentModel.js");
const MissingRecord = require("../models/missingRecords.js");
const res = require("express/lib/response.js");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (students) {
      res.json(students);
    } else {
      res.json({ message: "No student found" });
    }
  } catch (error) {
    console.log(error);
  }
};
const searchSchoolList = async (req, res) => {
  console.log("Input")
  const schools = await Student.distinct("SchoolName");
  if (schools.length > 0) {
    res.json(schools);
  } else {
    res.json({ message: "No Data..." });
  }
}


const searchResult = async (req, res) => {
  const { SchoolName, PhoneNumber } = req.body;

  if (!SchoolName && !PhoneNumber) {
    res.json({ message: "Please Fill All the Fields" });
  } else if (!SchoolName) {
    res.json({ message: "School Name not present" });
  } else if (!PhoneNumber) {
    res.json({ message: "Phone Number not present" });
  } else {
    const student = await Student.find({ SchoolName, PhoneNumber });
    if (student.length > 0) {
      res.json(student);
    } else {
      res.json({ message: "No Such Student is Present..." });
    }
  }
};

const forgotNumber = async (req, res) => {
  const { StudentName, DOB } = req.body;

  if (!StudentName && !DOB) {
    res.json({ message: "Please Fill All the Fields" });
  } else if (!StudentName) {
    res.json({ message: "Student Name not present" });
  } else if (!DOB) {
    res.json({ message: "DOB not present" });
  } else {
    const student = await Student.find({ StudentName, DOB });
    if (student.length > 0) {
      res.json(student);
    } else {
      res.json({ message: "No Such Student is Present..." });
    }
  }
};

const studentRequest = async (req, res) => {
  const id = req.params.id;

  const student = await Student.findById(id);

  if (student) {
    (student.requestedName = req.body.requestedName || student.requestedName),
      (student.requestedSchoolName = req.body.requestedSchoolName || student.requestedSchoolName)
  }

  const updatedStudent = await student.save();

  if (updatedStudent) {
    res.json(updatedStudent);
  }
};

const missingRecords = async (req, res) => {
  const { SchoolName, StudentName, DOB, PhoneNumber } = req.body

  if (SchoolName && StudentName && DOB && PhoneNumber) {
    const missingStudent = await MissingRecord.save();

    if (missingStudent) {
      res.json(missingStudent)
    }
  }

}

module.exports = { getAllStudents, studentRequest, searchResult, forgotNumber, searchSchoolList, missingRecords };
