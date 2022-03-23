const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true,
         unique:true,
         lowercase : true

     },                         //{ mandatory, unique, example iith}, 
    fullName: {
        type: String,
        required: true,
    
    },          //{mandatory, example `Indian Institute of Technology, Hyderabad`}, 
    logoLink: {
        type: String,
        required:true
    },
     isDeleted: {
         type: Boolean,
          default: false
        } 
},{timestamps: true})

module.exports = mongoose.model("colleges",collegeSchema)
