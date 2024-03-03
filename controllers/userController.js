import asyncHandler from "express-async-handler";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import lucia from "../adapter.js";
import User from '../models/user.js'; 
import { body, validationResult } from "express-validator"

export const user_create = [
  // Validation chain
  body('username').trim().isLength({ min: 1 }).escape().withMessage("Username missing."),
  body('password').trim().isLength({ min: 1 }).matches("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$").escape().withMessage("Password does not meet requirements."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.setHeader("Content-Type", "text/html").status(400).send(errors);
    }

    let existinguser = await User.find({ username: req.body.username }).exec();
    if (existinguser.length > 0) {
      return res.setHeader("Content-Type", "text/html").status(400).send("A user with that name already exists!");
    }
    const hashedPassword = await new Argon2id().hash(req.body.password);
    const userId = generateId(15);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      _id: userId
    })
    await user.save();
    const session = await lucia.createSession(userId, {});
    return res.send('User Created');
  })
]

export const user_read = asyncHandler((async (req, res, next) => {
  const requestedUser = await User.findOne({ username: req.body.username }, "-_id username").exec();
  res.json(requestedUser);
}))

export const user_update = [
  // Validation chain
  body('username').trim().isLength({ min: 1 }).escape().withMessage("Username missing."),
  body('password').trim().isLength({ min: 1 }).matches("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$").escape().withMessage("Password does not meet requirements."),
  
  asyncHandler((async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.setHeader("Content-Type", "text/html").status(400).send(errors);
    }
    
    const requestedUser = await User.findOne({ _id: res.locals.user.id }).exec();
    if (await new Argon2id().verify(requestedUser.password, password)) {
      const newPassword = req.body.password != null ? await new Argon2id().hash(req.body.password) : requestedUser.password;
      const newUsername = req.body.username != null ? req.body.username : requestedUser.username;
      const newUser = new User({
        _id: requestedUser.id,
        username: newUsername,
        password: newPassword
      })
      await User.findByIdAndUpdate(requestedUser.id, newUser, {});
      return res.setHeader("Content-Type", "text/html").status(200).send('User updated');
    }
    res.setHeader("Content-Type", "text/html").status(403).send('Wrong current password');
}))]

export const user_delete = asyncHandler((async (req, res, next) => {
  await User.findByIdAndDelete(req.body.username);
  res.setHeader("Content-Type", "text/html").status(200).send(`User ${req.body.username} deleted`);
}))