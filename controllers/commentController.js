import asyncHandler from "express-async-handler";
import User from '../models/user.js'; 
import Blogpost from '../models/blogpost.js';
import Comment from '../models/comment.js';
import { body, validationResult } from "express-validator"

export const comment_create = [
  // Validation chain
  body('parentid').trim().isLength({ min: 1, max: 24 }).escape(),
  body('content').trim().isLength({ min: 1, max: 100000 }).escape(),
  body('author').trim().isLength({ min: 1}).escape(),
  body('response').trim().isLength({ min: 1 }).escape().optional(),

  asyncHandler((async (req, res, next) => {
    if (!await Blogpost.exists({ _id: req.body.parentid })) {
      return res.setHeader("Content-Type", "text/html").status(400).send("Malformed or nonexisting parent id")}
    if (req.body.response) {
      if (!await Comment.exists({ _id: req.body.response })) {
        return res.setHeader("Content-Type", "text/html").status(400).send("Malformed response id")}
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.setHeader("Content-Type", "text/html").status(400).send(errors);
    }

    const newComment = new Comment({
      parentPost: req.body.parentid,
      content: req.body.content,
      author: req.body.author,
      timestamp: new Date(),
      responseToComment: req.body.response ? req.body.response : null
    });
    await newComment.save();
    await Blogpost.updateOne( { _id: req.body.parentid }, { $inc: { commentCount: 1 } } );
    res.setHeader("Content-Type", 'text/html').status(200).send('Comment created');
}))]

export const comment_read = asyncHandler((async (req, res, next) => {
  const requestedComment = await Comment.find({ parentPost: req.params.id }).populate('parentPost').populate('responseToComment').exec();
  console.log(requestedComment)
  res.json(requestedComment);
}))

export const comment_delete = asyncHandler((async (req, res, next) => {
  await Comment.findByIdAndDelete(req.body.id);
  res.setHeader("Content-Type", 'text/html').status(200).send('Comment deleted');
}))