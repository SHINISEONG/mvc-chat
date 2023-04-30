const mongoose = require('mongoose');

const dmSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    userId: { type: String, required: true },
    channel: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dm', dmSchema);
