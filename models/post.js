const mongoose = require('mongoose');

const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 200 },
  content: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true }
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`
});

module.exports = mongoose.model("Post", PostSchema);