import { mongoose } from 'mongoose';

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  parentPost: { type: Schema.Types.ObjectId, ref: "Blogpost", required: true },
  content: { type: String, required: true, minLength: 1 },
  author: { type: String, required: true, minLength: 1, maxLength: 100 },
  timestamp: { type: Date, required: true },
  responseToComment: { type: Schema.Types.ObjectId, ref: "Comment" },
});

export default mongoose.model("Comment", CommentSchema);