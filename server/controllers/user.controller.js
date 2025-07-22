const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { setUser } = require("../services/auth");
const User = require("../models/User.model");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "100h",
  });
};

// Post Request to Signup
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email }, { isDeleted: false });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create(
      {
        name: name,
        email: email,
        password: hashedPassword,
      },
      { isDeleted: false }
    );
    if (user) {
      console.log("req.user: ", req.user);
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
    const user = await User.findOne({ email }, { isDeleted: false });

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
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Update Request
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, { isDeleted: false });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update fields manually
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) {
      user.password = req.body.password; // triggers pre-save hook if modified
    }

    await user.save(); // pre('save') will hash the password

    res.status(200).json({
      message: "User updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete Request
const deleteUser = async (req, res) => {
  try {
   const user = await User.findByIdAndDelete(req.user.id, { isDeleted: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user, { message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export controllers

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findUser,
};
