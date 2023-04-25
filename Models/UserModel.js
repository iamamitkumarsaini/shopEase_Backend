const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name:String,
    flatNumber:String,
    area:String,
    landmark:String,
    city:String,
    state:String,
    pincode:Number
})


const userSchema = new Schema ({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true
    },

    mobileNumber:{
        type:Number,
        require:true,
        unique:true
    },

    addresses:[addressSchema]

},{
    versionKey:false
});


const UserModel = mongoose.model("user", userSchema);


module.exports = { UserModel };