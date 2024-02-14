const mongoose = require('mongoose');

const Schema = mongoose.Schema

const BlogpostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 200 },
  content: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true }
});

BlogpostSchema.virtual("url").get(function () {
  return `/blogpost/${this._id}`
});

module.exports = mongoose.model("Blogpost", BlogpostSchema);