const express = require("express");
const router = express.Router();
const RedisStore = require('connect-redis');
const session = require("express-session");
const { createClient } = require('redis');
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

const redisClient = createClient();
redisClient.connect().catch(console.error);

//middleware
router.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
  })
);

router.use(
  session({
    store: new RedisStore({
    client: redisClient,
    prefix: "prefix:",
    host: process.env.BACK_URL,
    port: process.env.PORT, 
    }),
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
