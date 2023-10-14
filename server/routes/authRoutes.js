const express = require("express");
const router = express.Router();
const session = require("express-session");
const RedisStore = require('connect-redis').default;
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

const redisClient = createClient(
  {
    username: 'default',
    password: process.env.REDIS_PWD,
    socket: {
        host: 'redis-10964.c9.us-east-1-2.ec2.cloud.redislabs.com',
        port: 10964,
        tls: true,
    }
}
);
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
