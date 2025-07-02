
const User = require("../models/User.model");

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

// Post Request
const createUser = async (req, res) => {
  const { email } = req.body
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Request
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true});

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

const findUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  res.json({ message: "Login successful" });
}
// Export controllers

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  findUser
};
