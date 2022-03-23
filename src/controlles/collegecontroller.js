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

    const{name,fullName,logoLink} = data 

    let req0 = isValid(name)
    if(!req0) return res.status(400).send("Name is Required")

    let  req1 = isValid(fullName)
    if(!req1) return res.status(400).send("Full name is Required ")

    let req2 = isValid(logoLink)
    if(!req2) return  res.status(400).send("Logo link is requiured ")

    let colleges = await collegemodel.create(data)
    res.status(201).send({status : true , data : colleges})
    }
    catch(error){
        return res.status(500).send({msg: error.message})
    }
}

module.exports.createCollege = createCollege