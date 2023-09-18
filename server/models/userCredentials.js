const mongoose = require('mongoose')

const userCredentials = mongoose.Schema(
  {
    name:String,
    email:{
      type:String,
      unique: true
    }, 
    password:String,
    verified:Boolean,
    userType:String,
  },
  {
    timestamps:true
  }
)

const userModel = mongoose.model('userModel',userCredentials);

module.exports = userModel;