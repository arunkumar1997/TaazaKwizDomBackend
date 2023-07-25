const express = require('express')
const { getAllStudents, studentRequest, searchResult, forgotNumber, searchSchoolList, missingRecords, } = require('../controllers/studentControllers.js')

const router = express.Router()

router.route("/search").post(searchResult)
router.route("/schoolList").get(searchSchoolList)
router.route("/forgot/new").post(forgotNumber)
router.route("/getAllStudents").get(getAllStudents) // pagination
router.route("/:id/new").put(studentRequest)
router.route("/missingRecord").post(missingRecords)

module.exports = router