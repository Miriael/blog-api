import { mongoose } from 'mongoose';

const Schema = mongoose.Schema

const BlogpostSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 200 },
  content: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, required: true },
  editedTimestamp: { type: Date },
  published: { type: Boolean, required: true },
  author: { type: Schema.Types.ObjectID, ref: "User", required: true }
});

export default mongoose.model("Blogpost", BlogpostSchema);