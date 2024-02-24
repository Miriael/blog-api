import asyncHandler from "express-async-handler";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import lucia from "../adapter.js";
import User from '../models/user.js'; 

export const user_create = asyncHandler((async (req, res) => {
  const username = req.body.username ?? null;
  if (!username) {
    return res.setHeader("Content-Type", "text/html").status(400).send('Username missing');
  }
  let existinguser = await User.find({ username: username }).exec()
  console.log(existinguser)
  if (existinguser.length > 0) {
    return res.setHeader("Content-Type", "text/html").status(400).send('A user with that name already exists!');
  }
  const password = req.body.password ?? null;
  if (!password) {
    return res.setHeader("Content-Type", "text/html").status(400).send('Password missing');
  }
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  const user = new User({
    username: username,
    password: hashedPassword,
    _id: userId
  })
  await user.save();
  const session = await lucia.createSession(userId, {});
  return res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).send('User Created');
}))

export const user_read = asyncHandler((async (req, res, next) => {
  const requestedUser = await User.findOne({ username: req.body.username }, "-_id username").exec();
  res.json(requestedUser);
}))

export const user_update = asyncHandler((async (req, res, next) => {
  const requestedUser = await User.findOne({ _id: res.locals.user.id }).exec();
  if (await new Argon2id().verify(requestedUser.password, password)) {
    const newPassword = req.body.password != null ? await new Argon2id().hash(req.body.password) : requestedUser.password;
    const newUsername = req.body.username != null ? req.body.username : requestedUser.username;
    const newUser = User.new({
      _id: requestedUser.id,
      username: newUsername,
      password: newPassword
    })
    await User.findByIdAndUpdate(requestedUser.id, newUser, {});
    return res.setHeader("Content-Type", "text/html").status(200).send('User updated');
  }
  res.setHeader("Content-Type", "text/html").status(403).send('Wrong current password');
}))

export const user_delete = asyncHandler((async (req, res, next) => {
  await User.findByIdAndDelete(req.body.username)
  res.setHeader("Content-Type", "text/html").status(200).send(`User ${req.body.username} deleted`)
}))