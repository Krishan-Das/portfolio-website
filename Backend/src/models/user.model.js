import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  avatar: {
    type: String,
    default: null
  }
},
  {
    timestamps: true
  })


const userModel = mongoose.model("user", userSchema);

export default userModel;