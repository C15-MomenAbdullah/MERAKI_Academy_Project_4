const User = require("../models/user");


const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;


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

    
    const newUser = new User({ firstName, lastName, email, password });
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

module.exports = { register };