const mongoose = require('mongoose');

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  parentPost: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, minLength: 1 },
  author: { type: String, required: true, minLength: 1, maxLength: 100 },
  email: { type: String, minLength: 1, maxLength: 100 },
  timestamp: { type: Date, required: true },
  responseToComment: { type: Schema.Types.ObjectId, ref: comment },
});

CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`
});

module.exports = mongoose.model("Comment", CommentSchema);