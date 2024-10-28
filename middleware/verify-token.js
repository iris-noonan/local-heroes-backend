const jwt = require('jsonwebtoken')

// Model
const User = require('../models/user')

const verifyToken = async (req, res, next) => {
  try {
    // Extract token (if it exists) from the authorization header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) throw new Error('Token not present in authorization header')

    // Use jwt.verify() to verify the token provided in the authorization header
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // Use payload to get the user._id and check database for that user
    const user = await User.findById(payload._id)

    // If the user does not exist, invalidate the request (by throwing an error)
    if (!user) throw new Error('User does not exist')

    // If the user exists and the token is valid, make the user available in the controller
    req.user = user

    // The user is authorized, pass the user the controller, run the next() middleware
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

module.exports = verifyToken
