const User = require('../models/user');

// GET all users (REAL)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST create user
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json(newUser);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    // ERROR HANDLING (IMPORTANTE)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
  console.log(err);
  console.log("ERROR:", err);
  res.status(500).json({ message: err.message });
}
};