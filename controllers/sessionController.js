import asyncHandler from "express-async-handler";
import { Argon2id } from "oslo/password";
import lucia from "../adapter.js";
import User from '../models/user.js'; 
import { body, validationResult } from "express-validator"

export const session_create = [
  // Validation chain 
  body('username').trim().isLength({ min: 1 }).escape().withMessage("Username missing."),
  body('password').trim().isLength({ min: 1 }).escape().withMessage("Password missing."),

  asyncHandler (async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.setHeader("Content-Type", "text/html").status(400).send(errors);
    }

    if (res.locals.session != null) {
      return res.setHeader("Content-Type", "text/html").status(200).send("You are already logged in.")
    }
    const existingUser = await User.findOne({ username: req.body.username }).exec();
    if (!existingUser) {
      return res.setHeader("Content-Type", "text/html").status(403).send("Wrong username or password.")
    }
    console.log(existingUser)
    const validPassword = await new Argon2id().verify(existingUser.password, req.body.password);
    if (!validPassword) {
      return res.setHeader("Content-Type", "text/html").status(403).send("Wrong username or password.")
    }
    const session = await lucia.createSession(existingUser.id, {});
    res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize() + 'sameSite=None; Secure; HttpOnly').appendHeader("Location", "/").send('ok');
})]

export const session_delete = (asyncHandler (async (req, res) => {
  await lucia.invalidateUserSessions(res.locals.user.id);
  res.send('You have been logged out.');
}))