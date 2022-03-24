const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
        },
        unique: true,
    },
    mobile: {
        type: String,
        required: "please enter mobile number",
        match: [/^[789][0-9]{9}$/,
            "please enter valid mobile number"],
    },
    collegeId: {
        type: objectId,
        ref: "colleges"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

module.exports = mongoose.model("intern", internSchema)