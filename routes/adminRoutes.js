const express = require("express")
const { registerAdmin, loginAdmin, adminChange } = require("../controllers/adminControllers")
const router = express.Router()

router.route('/signup').post(registerAdmin)
router.route("/signin").post(loginAdmin)
router.route("/:id").put(adminChange)

module.exports = router