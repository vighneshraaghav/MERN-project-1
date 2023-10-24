const eventModel = require("../models/EventDetails");

//saveProfileDetails
const saveProfileDetails = async (req, res) => {
  try {
    const { email, creds, personalDetails } = req.body;
    const event = {
			eventName:creds,
			registrationStatus:true
		};
    const emailExist = await eventModel.findOne({ email });

    if (emailExist) {
      const eventExist = emailExist.events.find(
        (obj) => obj.eventName === event.eventName
      );

      if (eventExist) {
        res.json({ message: "Event already registered" });
      } else {
        emailExist.events.push(event);
        await emailExist
          .save()
          .then(res.status(200).json({ message: "Event Registered" }));
      }
    } else {
      const detail = new eventModel({
        email,
        events: [event],
        personalDetails,
      });
      await detail
        .save()
        .then(res.status(200).json({ message: "Event Registered" }));
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

const getProfileDetails = async (req, res) => {
  try {
    const {email} = req.params;
    await eventModel.findOne({ email }).then((result) =>{
      if(result){
        res.json(result);
      }else{
        res.json({EMPTY:true});
      }
    }).catch((e)=> res.json({error:e}));
  } catch (error) {
    res.json({error:error})
  }
};

const getAllEvents = async (req, res) => {
  await eventModel
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

module.exports = {
  saveProfileDetails,
  getProfileDetails,
  getAllEvents
};
