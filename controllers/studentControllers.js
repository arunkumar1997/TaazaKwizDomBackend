const Student = require("../models/studentModel.js");
const EditStudent = require("../models/editStudentModel.js");
const Schools = require("../models/schoolModel.js");
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

  const schools = await Schools.distinct("name")
  if (schools.length > 0) {
    res.json(schools);
  } else {
    const schoolsStud = await Student.distinct("SchoolName");
    if (schoolsStud.length > 0) {
      // await Schools.insert(schoolsStud)
      res.json(schoolsStud);
    } else {
      res.json({ message: "No Data..." });
    }
  }

}

const getSchoolList = async (req, res) => {
  const SchoolList = await Schools.find({})

  if (SchoolList) {
    res.json(SchoolList)
  } else {
    res.json({ message: "No SchoolList" })
  }
}

const getEditStudentList = async (req, res) => {
  const editStudentlist = await EditStudent.find({})

  if (editStudentlist) {
    res.json(editStudentlist)
  } else {
    res.json({ message: "No Edit Student" })
  }
}

const getMissingRecordsList = async (req, res) => {
  const misingRecordlist = await MissingRecord.find({})

  if (misingRecordlist) {
    res.json(misingRecordlist)
  } else {
    res.json({ message: "No Missing Record" })
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
      res.json(student[0]);
    } else {
      res.json({ message: "No Such Student is Present..." });
    }
  }
};

const forgotNumber = async (req, res) => {
  const { StudentName, SchoolName, DOB } = req.body;

  if (!StudentName && !SchoolName && !DOB) {
    res.json({ message: "Please Fill All the Fields" });
  } else if (!StudentName) {
    res.json({ message: "Student Name not present" });
  } else if (!SchoolName) {
    res.json({ message: "SchoolName not present" });
  }
  else if (!DOB) {
    res.json({ message: "DOB not present" });
  }
  else {
    const student = await Student.find({ StudentName, SchoolName });
    if (student.length > 0) {
      res.json(student[0]);
    } else {
      res.json({ message: "No Such Student is Present..." });
    }
  }
};

// const studentRequest = async (req, res) => {

//   const editStudent = await EditStudent.create({
//     Refid: req.params.id,
//     requestedName : req.body.requestedName || StudentName,
//     requestedSchoolName : req.body.requestedSchoolName || SchoolName,
//     PhoneNumber : req.body.PhoneNumber
//   });

//   const updatedStudent = await editStudent.save();

//   if (updatedStudent) {
//     res.json(updatedStudent);
//   }
// }

const studentRequest = async (req, res) => {
  try {
    const editStudent = await Student.findById(req.params.id);

    if (editStudent) {
      editStudent.requestedName = req.body.requestedName || editStudent.StudentName;
      editStudent.requestedSchoolName = req.body.requestedSchoolName || editStudent.SchoolName;

      const updatedStudent = await editStudent.save();

      if (updatedStudent) {
        // Create a new instance of EditStudent and populate it with the updated data
        const newEditStudent = new EditStudent({
          Refid: editStudent._id,
          requestedName: updatedStudent.requestedName,
          requestedSchoolName: updatedStudent.requestedSchoolName,
          SchoolName: updatedStudent.SchoolName,
          StudentName: updatedStudent.StudentName,
          PhoneNumber: updatedStudent.PhoneNumber
        });

        const savedEditStudent = await newEditStudent.save();

        if (savedEditStudent) {
          res.json(savedEditStudent);
        }
      }
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the student.' });
  }
};


const missingRecords = async (req, res) => {
  const { StudentName, SchoolName, PhoneNumber, DOB, Remarks } = req.body


  const missingStudent = await MissingRecord.create({
    StudentName: StudentName,
    SchoolName: SchoolName,
    PhoneNumber: PhoneNumber,
    DOB: DOB,
    Remarks: Remarks,
  });

  if (missingStudent) {
    res.json(missingStudent)
  } else {
    res.json("Failed to insert")
  }


}

// const getStudentData = async (req, res) => {
//   const id = req.params.id
//   const student = await Student.findById(id)
//   if (student) {
//     res.json({
//       StudentName: student.StudentName,
//       SchoolName: student.SchoolName
//     })
//   }
// }

const getStudentData = async (req, res) => {
  const id = req.params.id
  const student = await Student.findById(id)
  if (student) {
    res.json(student)
  }
}

const createRecord = async (req, res) => {
  const { SchoolName, StudentName, DOB, PhoneNumber } = req.body;

  try {
    // Create a new record using the Student model
    const newRecord = await Student.create({
      SchoolName,
      StudentName,
      DOB,
      PhoneNumber
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the record.' });
  }
};




module.exports = { getStudentData, getAllStudents, studentRequest, searchResult, forgotNumber, searchSchoolList, missingRecords, getSchoolList, getEditStudentList, getMissingRecordsList, createRecord };
