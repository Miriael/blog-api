import asyncHandler from "express-async-handler";
import User from '../models/user.js'; 
import Blogpost from '../models/blogpost.js';
import Comment from '../models/comment.js';

export const comment_create = asyncHandler((async (req, res, next) => {
  const newComment = new Comment({
    parentPost: req.body.parentid,
    content: req.body.content,
    author: req.body.author,
    email: req.body.email,
    timestamp: new Date(),
    responseToComment: req.body.response ? req.body.response : null
  });
  await newComment.save();
  res.setHeader("Content-Type", 'text/html').status(200).send('Comment created');
}))

export const comment_read = asyncHandler((async (req, res, next) => {
  const requestedComment = await Comment.find({ _id: req.body.id }).populate('parentPost').populate('responseToComment').exec();
  res.json(requestedComment);
}))

export const comment_delete = asyncHandler((async (req, res, next) => {
  await Comment.findByIdAndDelete(req.body.id);
  res.setHeader("Content-Type", 'text/html').status(200).send('Comment deleted');
}))