const express = require("express");
const router = express.Router();

const collegecontroller = require("../controlles/collegecontroller")
const interncontroller = require("../controlles/interncontroller")

router.post("/colleges", collegecontroller.createCollege)

router.post("/interns", interncontroller.createIntern)

router.get("/collegeDetails",interncontroller.getIntern)



module.exports = router;