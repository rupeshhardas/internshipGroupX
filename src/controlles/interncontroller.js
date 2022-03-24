const collegemodel = require("../models/collegemodel")
const internmodel = require("../models/internmodel")
const regex = require('requires-regex')
const { query } = require("express")

const isValid = function (value) {
    if (typeof (value) == 'undefined' || typeof (value) == "null") {
        return false
    }
    if (value.length == 0) {
        return false
    }
    if (value == String || Array || Number && value.length >0 ) {
        return true
    }
}


const createIntern = async function (req, res) {
    try {
        let data = req.body
        let mobile1 = data.mobile
        let email1 = data.email
        let collegeid = data.collegeId

        if(Object.keys(data) ==0) return res.status(400).send({ERROR : "bad request"})

        let emailRepet = await internmodel.findOne({email: email1 })
        if (emailRepet) return res.status(400).send("email already exist")
        

        let mobileRepeat = await internmodel.findOne({mobile: mobile1 })
        if (mobileRepeat == email1)  return res.status(400).send("mobile number already exist")
        

        let college1 = await collegemodel.findById(collegeid)
        if (!college1) return res.status(400).send("college id is not valid")


        const { name, email, mobile } = data

        let req0 = isValid(name)
        if (!req0) return res.status(400).send("name is required")

        let req1 = isValid(email)
        if (!req1) return res.status(400).send("Email is required")

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send("Please enter valid email address")
        }

        let req2 = isValid(mobile)
        if (!req2) return res.status(400).send("Mobile number is required ")

       
        let interndata = await internmodel.create(data)
        res.status(201).send({ status: true, msg: interndata })
    }
    catch (error) {
        res.status(500).send({ mgs: error.message })
    }

}


const getIntern = async function (req, res) {
    try {
        let data = req.query.collegeName
        if (!data) { return res.status(400).send({msg: "plese provide valid college details" }) }


        let colleged = await collegemodel.findOne({ name: data, isDeleted: false })
        if (!colleged) return res.status(400).send({ msg: "College is not in the list " })

        let temp = colleged

        let List1 = colleged._id

        let interned = await internmodel.find({ "collegeId": List1, isDeleted: false }).select({_id:1,name:1,email:1,mobile:1})
        if (!interned) return res.status(400).send({msg :"no interned applied  for this college"})


        let details = {name : temp.name,fullName : temp.fullName,logoLink:temp.logoLink,Interest:interned}

        res.status(200).send({msg:"college created" , College_details: details })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


module.exports.createIntern = createIntern

module.exports.getIntern = getIntern


