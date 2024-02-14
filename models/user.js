const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  login: { type: String, required: true, minLength: 1 },
  password: { type: String, required: true, minLength: 1 },
  posts: { type: Array, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`
});

module.exports = mongoose.model("User", UserSchema);