const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  themeName: { type: String, required: true },
  primaryColor: String,
  font: String
});

module.exports = mongoose.model('Theme', themeSchema);