// backend/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Le nom d'utilisateur doit être unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // L'email doit être unique
    match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ // Validation de l'email
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

export default User;
