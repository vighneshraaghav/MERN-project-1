const express = require("express");
const router = express.Router();
const cors = require('cors');
const { read, registerUser, loginUser, getProfile, verifyEmail, verifiedPage, logout } = require('../controllers/authController');

//middleware
router.use(
  cors({
    credentials:true,
    origin:'http://localhost:3000'
  })
)

router.get("/",read)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logout)
router.get('/profile',getProfile)
router.get('/verify/:userId/:uniqueString',verifyEmail)
router.get('/verified/:email',verifiedPage)

module.exports = router