const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { name, last_name, email, password, is_admin, elo, license_number } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      last_name,
      email,
      password: hashedPassword,
      is_admin,
      elo,
      license_number,
    });

    await user.save();

    const token = jwt.sign(
      { email: user.email, isAdmin: user.is_admin, userId: user._id },
      secret,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, userId: user._id, isAdmin: user.is_admin });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: user.email, isAdmin: user.is_admin, userId: user._id },
      secret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: user._id, isAdmin: user.is_admin });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};
