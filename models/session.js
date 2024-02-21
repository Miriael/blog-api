import { mongoose } from 'mongoose';

const Schema = mongoose.Schema

const SessionSchema = new Schema({
  _id: { type: String, required: true},
  user_id: { type: String, required: true },
  expires_at: { type: Date, required: true }
  },
  { _id: false }
);

export default mongoose.model("Session", SessionSchema);