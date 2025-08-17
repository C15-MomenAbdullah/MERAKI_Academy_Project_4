const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password , role } = req.body;


    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all fields",
      });
    }

    
    const existMail = await User.findOne({ email: email.toLowerCase() });
    if (existMail) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const userRole = role || "user"; // edit // 
    const newUser = new User({ firstName, lastName, email, password , role :userRole });
    await newUser.save();

   
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Register failed:", err);
    res.status(500).json({
      success: false,
      message: "register failed",
    });
  }
};
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: " please fill email and password",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "wrong email or password",
      });
    }

    const rightInfo = await bcrypt.compare(password, user.password);
    if (!rightInfo) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

module.exports = { register,logIn };