const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: String, required: true, ref: "User" },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true, minLength: 10 },
  text: { type: String, required: true, minLength: 10 },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model("Post", postSchema);
