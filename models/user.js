const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  helper: { type: Boolean, required: true },
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