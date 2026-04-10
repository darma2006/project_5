require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

app.use(cors());
app.use(express.json());

// conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// prueba
app.get('/', (req, res) => {
  res.send("API working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



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