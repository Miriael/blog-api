import { mongoose } from 'mongoose';

const Schema = mongoose.Schema

const UserSchema = new Schema({
  _id : { type: String, required: true},
  username: { type: String, required: true, minLength: 1, maxLength: 100 },
  password: { type: String, required: true, minLength: 1 }
},
{ _id: false });

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`
});

export default mongoose.model("User", UserSchema);