//user models
const userModel = require("../models/userCredentials");
const userVerification = require("../models/userVerification");

//bcrypt
const bcrypt = require("bcrypt");
const { hashPassword, comparePassword } = require("../crypt/auth");

//path
const path = require("path");

//jwt
const jwt = require("jsonwebtoken");

//email handling
const nodeMailer = require("nodemailer");

//google-auth-library
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
  process.env.AUTH_CLIENT_ID,
  process.env.AUTH_CLIENT_SECRET,
  process.env.AUTH_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.AUTH_REFRESH_TOKEN });

//unique string
const { v4: uuidv4 } = require("uuid");
const { error, log } = require("console");

//env variables
require("dotenv").config();

//node mailer stuff
let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.AUTH_EMAIL,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    refreshToken: process.env.AUTH_REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
    // pass: process.env.AUTH_PASS,
  },
});

//test success
transporter.verify((error, success) => {
  if (error) {
    console.log("hi", error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

//registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!password && password < 6) {
      return res.json({
        error: "Password is required and should be greater than 6",
      });
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      verified: false,
      userType: "user",
    });
    user
      .save()
      .then((result) => {
        sendVerificationEmail(result, res);
        //res.status(200).json(user);
      })
      .catch(() => {
        res.json({
          error: "error while registering user",
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//send verification email
const sendVerificationEmail = ({ _id, email }, res) => {
  const currentUrl = "http://localhost:3000/";
  const uniqueString = uuidv4() + _id;
  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email verification",
    html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
      currentUrl + "verifyUser/" + _id + "/" + uniqueString
    }>here</a> to proceed.</p>`,
  };

  // uniquestring hashing
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      // Set value in userVerification collection
      const newVerification = new userVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });

      newVerification.save();
    })
    .then(() => {
      transporter.sendMail(mailOptions);
    })
    .then(() => {
      // Email sent & verification record saved
      res.json({
        status: "PENDING",
        message: "Verification email sent",
      });
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        // Handle validation errors separately if needed
        res.json({
          status: "FAILED",
          message: "Validation error",
        });
      } else {
        // Handle other errors
        res.json({
          status: "FAILED",
          message: "An error occurred",
        });
      }
    });
};

const hello = (req,res) =>{
  res.json({
    message:"WORKING"
  });
}

const verifyEmail = async (req, res) => {
  let { userId, uniqueString } = req.params;

  userVerification
    .findOne({ userId })
    .then((result) => {
      if (result) {
        const expiresAt = result.expiresAt;
        const hashedUniqueString = result.uniqueString;

        if (expiresAt < Date.now()) {
          userVerification
            .deleteOne({ userId })
            .then(() => {
              userModel
                .deleteOne({ _id: userId })
                .then(() => {
                  let message = "Link has expired. Please sign up again.";
                  res.json({
                    error: message,
                  });
                })
                .catch((err) => {
                  let message =
                    "Clearing user with expired unique string failed";
                  res.json({
                    error: message,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              let message =
                "An error occured while clearing expired user verification record";
              res.json({
                error: message,
              });
            });
        } else {
          //valid record exists
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                userModel
                  .updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    userVerification
                      .deleteOne({ userId })
                      .then(() => {
                        res.json({
                          success: "Email Verified Successfully!",
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        let message =
                          "An error occured while finalizing successful verification.";
                        res.json({
                          error: message,
                        });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    let message =
                      "An error occured while updating user record to show verified.";
                    res.json({
                      error: message,
                    });
                  });
              } else {
                let message =
                  "Invalid verification details passed. Check your inbox.";
                res.json({
                  error: message,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              let message = "An error occured while comparing unique strings.";
              res.json({
                error: message,
              });
            });
        }
      } else {
        let message =
          "Account record doesn't exist or has been verified already. Please sign up or log in.";
        res.json({
          error: message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      let message =
        "An error occured while checking for existing user verification";
      res.json({
        error: message,
      });
    });
};

//verified page route
const verifiedPage = async (req, res) => {
  const { email } = req.params;
  await userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        console.log(user);
        res.json({ user });
      } else {
        res.json({
          error: "User not exist",
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });

  // res.sendFile(path.join(__dirname, "./../../client/src/verified"));
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == process.env.SUPER_ADMIN &&
      password == process.env.SUPER_PASS
    ) {
      jwt.sign(
        { email: process.env.SUPER_ADMIN, name: process.env.SUPER_NAME },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ admin: true });
        }
      );
    } else {
      //user exists?
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({
          error: "No user found",
        });
      } else {
        //check whether user verified
        if (!user.verified) {
          res.json({
            status: "FAILED",
            message: "Email not verified!",
          });
        } else {
          //password match?
          const match = await comparePassword(password, user.password);
          if (match) {
            jwt.sign(
              { email: user.email, id: user._id, name: user.name },
              process.env.JWT_SECRET,
              {},
              (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json(user);
              }
            );
          }
          if (!match) {
            res.json({ error: "Passwords do not match" });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const specificUser = async (req, res) => {
  try {
    const email = req.params;
    if (email._id === process.env.SUPER_ADMIN) {
      res.json({ userType: "admin" });
    } else {
      const user = await userModel.findOne({ email });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          error: "User not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  await userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          error: "User not found",
        });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        let mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: "Reset Password",
          text: `http://localhost:3000/reset-password/${user._id}/${token}`,
        };

        transporter.sendMail(mailOptions);
      }
    })
    .then(() => {
      res.json({
        status: "SUCCESS",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Token error" });
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        userModel
          .findByIdAndUpdate({ _id: id }, { password: hash })
          .then(() => res.json({ Status: "Success" }))
          .catch((err) => res.json({ Status: err }));
      }).catch((err) => res.json({ Status: err }));
    }
  });
};

const read = async (req, res) => {
  await userModel
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

const logout = (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      message: "Logged out successfully",
    });
};

module.exports = {
  hello,
  read,
  registerUser,
  loginUser,
  logout,
  getProfile,
  verifyEmail,
  verifiedPage,
  specificUser,
  forgotPassword,
  resetPassword,
};
