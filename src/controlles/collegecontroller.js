const collegemodel = require ("../models/collegemodel")

const isValid = function(value) {
    if(typeof (value) == 'undefined' ||typeof(value) == 'null'){
    return false 
}
if (value.length == 0) {
    return false 
}
if ( typeof(value) == String || Array || URL && value.length > 0) {
    return true
}
}

const  createCollege = async function(req, res) {
    try{
    let data = req.body 
    let name1 = data.name
    
    let repeatName = await collegemodel.findOne({name : name1})
    if(repeatName) return res.status(400).send("name is already exist")


    const{name,fullName,logoLink} = data 

    let req0 = isValid(name)
    if(!req0) return res.status(400).send("Name is Required")

    let  req1 = isValid(fullName)
    if(!req1) return res.status(400).send("Full name is Required ")

    let req2 = isValid(logoLink)
    if(!req2) return  res.status(400).send("Logo link is requiured ")

    if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink)))
    return res.status(400).send({ status: false, msg: " logoLink is invalid" })


    let colleges = await collegemodel.create(data)
    res.status(201).send({status : true , data : colleges})
    }
    catch(error){
        return res.status(500).send({msg: error.message})
    }
}

module.exports.createCollege = createCollege




// const alreadyUsed = await collegeModel.findOne({fullName})

// if(alreadyUsed){

//     return res.status(400).send({status:false, msg:`${fullName} College is already exists`})   //checking the fullName is already exist or not.

// }