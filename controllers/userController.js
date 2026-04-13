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
    console.log(req.body);
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
  console.log("ERROR:", err);
  res.status(500).json({ message: err.message });
}
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { returnDocument: 'after' } // 👈 actualizado
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username
    });

    // ⚠️ error handling
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const Theme = require('../models/theme');

// GET all
exports.getThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.json(themes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST
exports.createTheme = async (req, res) => {
  try {
    const { themeName, primaryColor, font } = req.body;

    if (!themeName) {
      return res.status(400).json({ message: "themeName required" });
    }

    const theme = new Theme({ themeName, primaryColor, font });
    await theme.save();

    res.status(201).json(theme);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};