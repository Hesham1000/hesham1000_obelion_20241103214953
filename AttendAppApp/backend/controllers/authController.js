const { Sequelize } = require('sequelize');
const User = require('../models/User');

// Database connection
const sequelize = new Sequelize('AttendAppApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

User.init(sequelize);

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, familyName, email, phoneNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const user = await User.create({
      firstName,
      familyName,
      email,
      phoneNumber,
      password,
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
