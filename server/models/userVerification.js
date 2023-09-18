const mongoose = require('mongoose')

const userVerificationCredentials = mongoose.Schema(
  {
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:Date
  },
  {
    timestamps:true
  }
)

const userVerificationModel = mongoose.model('userVerificationModel',userVerificationCredentials);

module.exports = userVerificationModel;