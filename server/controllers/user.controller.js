const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { setUser } = require("../services/auth");
const User = require("../models/User.model");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

// Post Request to Signup
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        message: "Registration successful!",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST Request to Login
const findUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("user object before sending response:", user);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Final response
    res.status(200).json({
      _id: user._id,
      username: user.name,
      email: user.email,
      token: generateToken(user._id), // JWT
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// GET Request
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get a Single Request
const getUser = async (req, res) => {
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Request
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const UpdatedUser = await User.findById(id);
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Request
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export controllers

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  findUser,
};
