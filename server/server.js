const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const app = express();
const PORT = 5050

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',require('./routes/authRoutes'))
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database not connected",error);
  });
