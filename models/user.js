const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  photo: { type: String },
  location: { type: String },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword
  }
})

// Create and export model
const User = mongoose.model('User', userSchema)
module.exports = User