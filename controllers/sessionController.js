import asyncHandler from "express-async-handler";
import { Argon2id } from "oslo/password";
import lucia from "../adapter.js";
import User from '../models/user.js'; 

export const session_create = (asyncHandler (async (req, res) => {
  if (res.locals.session != null) {
    return res.redirect('/');
  }
  const username = req.body.username ?? null;
  if (!username) {
    return res.setHeader("Content-Type", "text/html").status(400).send('Username missing');
  }
  const password = req.body.password ?? null;
  if (!password) {
    return res.setHeader("Content-Type", "text/html").status(400).send('Password missing');
  }
  const existingUser = await User.findOne({ username: username }).exec();
  if (!existingUser) {
    return res.send('go away')
  }
  console.log(existingUser)
  const validPassword = await new Argon2id().verify(existingUser.password, password);
  if (!validPassword) {
    return res.send('go away')
  }
  const session = await lucia.createSession(existingUser.id, {});
	res
		.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.appendHeader("Location", "/")
		.redirect("/");
}))

export const session_delete = (asyncHandler (async (req, res) => {
  await lucia.invalidateUserSessions(res.locals.user.id);
  res.send('You have been logged out.');
}))