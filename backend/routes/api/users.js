const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

// @route   POST api/user
// @desc    Register User
// @access  Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("company", "Company is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters and must contain one lowercase and uppercase alphabet!"
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, company, password } = req.body;

    try {
      let user = await User.findOne({ email });
      let user_name = await User.findOne({ name });

      if (user || user_name) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        company,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          /*   res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 36000 * 1000),
            path: "/",
          }); */
          return res.status(200).json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            company: user.company,
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/auth
// @desc    Authenticate User & get token
// @access  Public

router.post(
  "/auth",
  [
    check("username", "Please enter a valid email").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user_username = await User.findOne({ name: username });
      let user_email = await User.findOne({ email: username });
      let user;
      if (user_username) {
        user = user_username;
      } else if (user_email) {
        user = user_email;
      } else if (!user_username && !user_email) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: /* 1800 */ 36000 },
        (err, token) => {
          if (err) throw err;
          /*  res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 36000 * 1000),
            path: "/",
          }); */
          return res.status(200).json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            company: user.company,
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
router.post("/logout", auth, async (req, res) => {
  /*  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }); */
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get(
  "/",
  auth,

  async (req, res) => {
    try {
      const users = await User.find({ role: "user" }).select("-password");
      if (users.length === 0) {
        return res.status(404).json({ msg: "Users not found" });
      }
      res.status(200).json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @desc    Update user
// @route   patch /api/users
// @access  Public
router.patch(
  "/",
  auth,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const users = await User.findById(req.user.id);
      let { name, image, company, email, description, password } = req.body;

      if (email !== users.email) {
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Email already exists" }] });
        }
        users.email = email;
      }
      if (password) {
        const isMatch = await bcrypt.compare(password, users.password);
        if (!isMatch) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
          if (!passwordRegex.test(password) && password.length < 8) {
            return res.status(404).json({
              msg: "Please enter a password with 6 or more characters and must contain one lowercase and uppercase alphabet!",
            });
          }
          const salt = await bcrypt.genSalt(10);

          users.password = await bcrypt.hash(password, salt);
        }
      }

      users.name = name;
      users.company = company;
      users.description = description;
      users.image = image;
      await users.save();
      const payload = {
        user: {
          id: users.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: /* 1800 */ 36000 },
        (err, token) => {
          if (err) throw err;
          /*  res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 36000 * 1000),
            path: "/",
          }); */
          return res.status(200).json({
            token,
            _id: users._id,
            name: users.name,
            email: users.email,
            company: users.company,
            role: users.role,
            updatedAt: users.updatedAt,
            createdAt: users.createdAt,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Public
router.get("/:id", auth, async (req, res) => {
  try {
    const users = await User.findById(req.params.id).select("-password");

    if (!users) {
      return res.status(404).json({ msg: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @desc    Send Forgot Passsword Link
// @route   POST /api/users/forgotPassword
// @access  Public
router.post("/forgotPassword", async (req, res) => {
  try {
    let { useremail } = req.body;
    const user_email = await User.findOne({ email: useremail });
    const user_name = await User.findOne({ name: useremail });
    let user;
    if (!user_email && !user_name) {
      return res.status(404).json({ msg: "User does not exist" });
    }
    if (user_email) {
      user = user_email;
    }
    if (user_name) {
      user = user_name;
    }
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

    const htmlMessage = `
    <div style="background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
        <h1 style="color: #333333; font-size: 20px;">Reset Password</h1>
        <p style="color: #666666; font-size: 16px;">Dear ${user.name},  
        
        </p>
        <p style="color: #666666; font-size: 16px;">Click on the following link to reset your password:  
        
        </p>
        ${link}
        
      </div>
    </div>
  `;
    const mail = transporter.sendMail({
      to: user.email,
      from: `${process.env.ADMIN_MAIL}`,
      subject: "Reset Password",
      html: htmlMessage,
    });
    res
      .status(200)
      .json({ message: "Password reset link has been sent to your email" });
  } catch (error) {
    console.error(error);
  }
});

// @desc    Reset Passord
// @route   Post /api/users/resetPassword/:id/:token
// @access  Public
router.post(
  "/resetPassword/:id/:token",
  [
    check(
      "password",
      "Please enter a password with 6 or more characters and must contain one lowercase and uppercase alphabet!"
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z]).*$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { id, token } = req.params;
      let { password } = req.body;
      const userVerify = await User.findById(id);
      if (!userVerify) {
        return res.status(404).json({ msg: "Invalid Id" });
      }
      const secret = process.env.JWT_SECRET + userVerify.password;
      const payload = jwt.verify(token, secret);
      const user = await User.findOne({ email: payload.email });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const new_payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        new_payload,
        process.env.JWT_SECRET,
        { expiresIn: /* 1800 */ 36000 },
        (err, token) => {
          if (err) throw err;
          /*   res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 36000 * 1000),
            path: "/",
          }); */
          return res.status(200).json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            company: user.company,
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = router;
