const User = require('../model/users.model');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = createToken(user); // FIXED

    res.send({ message: "Login Successful", data: user, token });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


const register = async (req, res) => {
  try {
    console.log("Body:", req.body); // Check what frontend sends

    const { name, email, password } = req.body; // directly take from req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password }); // FIXED

    const token = createToken(newUser);

    res.status(201).json({
      message: "Registration Successful",
      data: newUser,
      token: token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};







module.exports = { login,register }