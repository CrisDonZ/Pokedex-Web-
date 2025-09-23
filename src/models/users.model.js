import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [
      {
        id: Number,
        name: String,
        image: String,
      }
    ],
    default: [] 
  }
  
},
{timestamps: true}
);

export default mongoose.model("User", userSchema);