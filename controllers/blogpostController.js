import asyncHandler from "express-async-handler";
import User from '../models/user.js'; 
import Blogpost from '../models/blogpost.js';

export const blogpost_create = asyncHandler((async (req, res, next) => {
  const newBlogpost = new Blogpost({
    title: req.body.title,
    content: req.body.content,
    timestamp: new Date(),
    published: req.body.published,
    author: req.params.id
  });
  console.log(newBlogpost)
  await newBlogpost.save();
  res.setHeader("Content-Type", 'text/html').status(200).send('Blogpost created');
}))

export const blogpost_read = asyncHandler((async (req, res, next) => {
  const requestedBlogpost = await Blogpost.find({ _id: req.body.id }).populate('author', '-_id username').exec();
  res.json(requestedBlogpost);
}))

export const blogpost_update = asyncHandler((async (req, res, next) => {
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
}))

export const blogpost_delete = asyncHandler((async (req, res, next) => {
  await Blogpost.findByIdAndDelete(req.body.id);
  res.setHeader("Content-Type", "text/html").setStatus(200).send('Blogpost deleted');
}))