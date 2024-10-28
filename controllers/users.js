const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Model
const User = require('../models/user')

const SALT_LENGTH = 12

// * Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { password, confirmPassword, username, email, helper } = req.body
    // Check the passwords match
    if (password !== confirmPassword) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(400).json({error:'Username already taken.'});
    }

    // Hash password
    req.body.hashedPassword = bcrypt.hashSync(password, SALT_LENGTH)

    // Create a new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      hashedPassword: req.body.hashedPassword,
      helper: req.body.helper,
    })
    
    // Generate a JWT to send to the client
    const payload = {
      username: user.username,
      email: user.email,
      _id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
  
    return res.status(201).json({ user: payload, token })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
