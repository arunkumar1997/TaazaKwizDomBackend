const express = require("express")
const { registerAdmin, loginAdmin, adminChange, getAdmin } = require("../controllers/adminControllers")
const router = express.Router()

router.route('/signup').post(registerAdmin)
router.route("/signin").post(loginAdmin)
router.route("/:id/:Refid/:requestedName").put(adminChange)
router.route("/getadmin").get(getAdmin)

module.exports = router