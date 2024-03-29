const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',require('./routes/authRoutes'));
app.set('trust proxy', 1);
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
