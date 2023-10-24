const mongoose = require('mongoose')

const EventDetails = mongoose.Schema(
  {
    email:{
      type:String,
      unique: true
    }, 
    events:[
      {
        eventName:String,
        registrationStatus:{
          type:Boolean,
          default:false
        }
      }
    ],
    personalDetails:{
      firstName: String,
      lastName: String,
      phoneNumber: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      pincode: String,
    }
  },
  {
    timestamps:true
  }
)

const eventModel = mongoose.model('eventModel',EventDetails);

module.exports = eventModel;