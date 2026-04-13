const Theme = require('../models/theme');

// GET all themes
exports.getThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.json(themes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST theme
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