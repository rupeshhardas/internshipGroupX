const express = require("express");
const router = express.Router();

const collegecontroller = require("../controlles/collegecontroller")
const interncontroller = require("../controlles/interncontroller")

router.post("/functionup/colleges", collegecontroller.createCollege)

router.post("/functionup/interns", interncontroller.createIntern)

router.get("/functionup/collegeDetails",interncontroller.getIntern)



module.exports = router;