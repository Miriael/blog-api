import asyncHandler from "express-async-handler";
import User from '../models/user.js'; 
import Comment from '../models/comment.js';
import Blogpost from '../models/blogpost.js';
import { body, validationResult } from "express-validator"

export const blogpost_create = [
  // Validation chain
  body('title').trim().isLength({ min: 1, max: 400 }).escape(),
  body('content').trim().isLength({ min: 1, max: 100000 }).escape(),
  body('published').trim().isLength({ min: 1}).escape(),
  body('author').trim().isLength({ min: 1 }).escape(),

  asyncHandler((async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.setHeader("Content-Type", "text/html").status(400).send(errors);
    }

    const newBlogpost = new Blogpost({
      title: req.body.title,
      content: req.body.content,
      timestamp: new Date(),
      published: req.body.published,
      author: req.body.author
    });
    console.log(newBlogpost)
    await newBlogpost.save();
    res.setHeader("Content-Type", 'text/html').status(200).send('Blogpost created');
}))]

export const blogpost_read = asyncHandler((async (req, res, next) => {
  const requestedBlogpost = await Blogpost.find({ _id: req.body.id }).populate('author', '-_id username').exec();
  res.json(requestedBlogpost);
}))

export const blogpost_update = [
  // Validation chain
  body('title').trim().isLength({ min: 1, max: 400 }).escape(),
  body('content').trim().isLength({ min: 1, max: 100000 }).escape(),
  body('published').trim().isLength({ min: 1}).escape(),

  asyncHandler((async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.setHeader("Content-Type", "text/html").status(400).send(errors);
    }

    const requestedBlogpost = await Blogpost.find({ _id: req.body.id }).exec();
    const newTitle = req.body.title != null ? req.body.title : requestedBlogpost.title;
    const newContent = req.body.content != null ? req.body.content : requestedBlogpost.content;
    const newPublished = red.body.published == true ? true : false;
    const updatedBlogpost = new Blogpost({
      _id: req.body.id,
      title: newTitle,
      content: newContent,
      editedTimestamp : new Date.now.toISOString(),
      published: newPublished,
      author: requestedBlogpost.author,
    });
    await Blogpost.findByIdAndUpdate(req.body.id, updatedBlogpost, {});
    res.setHeader("Content-Type", "text/html").setStatus(200).send('Blogpost updated');
}))]

export const blogpost_delete = asyncHandler((async (req, res, next) => {
  await Comment.deleteMany({ parentPost: req.body.id });
  await Blogpost.findByIdAndDelete(req.body.id);
  res.setHeader("Content-Type", "text/html").setStatus(200).send('Blogpost deleted');
}))