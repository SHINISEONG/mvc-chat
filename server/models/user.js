const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    profileImg: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
