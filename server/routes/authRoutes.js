const express = require("express");
const router = express.Router();
const session = require("express-session");
const cors = require("cors");
const {
  hello,
  read,
  registerUser,
  loginUser,
  getProfile,
  verifyEmail,
  verifiedPage,
  logout,
  specificUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

//middleware
router.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
  })
);

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/",hello);
router.get("/users", read);
router.get("/specificUser/:_id", specificUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/profile", getProfile);
router.get("/verify/:userId/:uniqueString", verifyEmail);
router.get("/verified/:email", verifiedPage);
router.post("/forgot-password",forgotPassword);
router.post('/reset-password/:id/:token',resetPassword);

module.exports = router;
