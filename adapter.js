import { Lucia, TimeSpan } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import UserModel from "./models/user.js";
import SessionModel from "./models/session.js";
import { mongoose } from 'mongoose';



const adapter = new MongodbAdapter(
	mongoose.connection.collection("sessions"),
	mongoose.connection.collection("users")
);

const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "w"), // 2 weeks
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production",
		}
	}
});

export default lucia