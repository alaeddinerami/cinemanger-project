const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true }, 
  role: { 
    type: String, 
    enum: ["admin", "client"], 
    default: "client" 
  }
}, 
{
  timestamps: true 
});

const User = mongoose.model("User", userSchema);
module.exports = User;
