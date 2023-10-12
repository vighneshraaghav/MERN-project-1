const express = require("express");
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5050

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use('/',require('./routes/authRoutes'))
app.use(cors({
  origin: ["https://deploy-mern-1whq.vercel.app"],
  methods:["POST","GET"],
  credentials: true
}))
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
