const express = require("express");
const router = express.Router();
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
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
  deleteUser,
} = require("../controllers/authController");

const { saveProfileDetails, getProfileDetails, getAllEvents } = require("../controllers/eventController");

const redisClient = redis.createClient({
  username: "default",
  password: process.env.REDIS_PWD,
  socket: {
    host: "redis-10964.c9.us-east-1-2.ec2.cloud.redislabs.com",
    port: 10964,
  },
});
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
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    callback: (req, res, next) => {},
  })
);

router.get("/", hello);
router.get("/users", read);
router.get("/specificUser/:_id", specificUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/profile", getProfile);
router.get("/verify/:userId/:uniqueString", verifyEmail);
router.get("/verified/:email", verifiedPage);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.post("/deleteUser", deleteUser);

//event
router.post("/eventregister", saveProfileDetails);
router.get("/getevent/:email", getProfileDetails);
router.get("/getAllEvents",getAllEvents);

module.exports = router;
