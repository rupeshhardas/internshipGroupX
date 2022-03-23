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
    if (value == String || Array && value.length > 0) {
        return true
    }
}


const createIntern = async function (req, res) {
    try {
        let data = req.body
        let mobile1 = data.mobile

        const { name, email, mobile } = data

        let req0 = isValid(name)
        if (!req0) return res.status(400).send("name is required")

        let req1 = isValid(email)
        if (!req1) return res.status(400).send("Email is required")

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send("Plese enter valid email address")
        }

        let req2 = isValid(mobile)
        if (!req2) return res.status(400).send("Mobile number is required ")



        if (mobile1.length != 10) return res.status(400).send("Mobile number contain 10 digits")

        let data1 = data.collegeId
        let findid = await collegemodel.findById(data1)
        if (!findid) return res.status(400).send("College is not in list ")

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
        if (!data) { return res.status(400).send({ status: false, msg: "plese provide valid college details" }) }


        let colleged = await collegemodel.find({ name: data, isDeleted: false })
        if (!colleged) return res.status(400).send({ msg: "College is not in the list " })

        let List1 = colleged[0]._id

        console.log(List1)

        let interned = await internmodel.find({ "collegeId": List1, isDeleted: false })
        if (!interned) return res.status(400).send("college id not exist")
        students = []

        for (let i = 0; i < interned.length; i++) {
            let Object = {}
            Object._id = interned[i]._id
            Object.name = interned[i].name
            Object.email = interned[i].email
            Object.mobile = interned[i].mobile
            students.push(Object)
        }

        const ObjectData = {
            name: colleged[0].name,
            fullName: colleged[0].fullName,
            logoLink: colleged[0].logoLink,
            interest: students
        }

        res.status(201).send({ College_details: ObjectData })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


module.exports.createIntern = createIntern

module.exports.getIntern = getIntern


