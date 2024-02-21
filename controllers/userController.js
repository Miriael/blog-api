import asyncHandler from "express-async-handler";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import lucia from "../adapter.js";
import User from '../models/user.js'; 

export const user_create = asyncHandler((async (req, res) => {
  const username = req.body.username ?? null;
  if (!username) {
    return res.setHeader("Content-Type", "text/html").status(400).send('Username missing')
  }
  let existinguser = await User.find({ username: username }).exec()
  console.log(existinguser)
  if (existinguser.length > 0) {
    return res.setHeader("Content-Type", "text/html").status(400).send('A user with that name already exists!')
  }
  const password = req.body.password ?? null;
  if (!password) {
    return res.setHeader("Content-Type", "text/html").status(400).send('Password missing')
  }
  const hashedPassword = await new Argon2id().hash(password)
  const userId = generateId(15)

  const user = new User({
    username: username,
    password: hashedPassword,
    _id: userId
  })
  await user.save()
  const session = await lucia.createSession(userId, {});
  return res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize()).send('User Created')
}))



// const Category = require('../models/category')
// const Item = require('../models/item')
// const { body, validationResult }= require('express-validator');
// const asyncHandler = require('express-async-handler');



// exports.category_create_get = asyncHandler(async (req, res, next) => { 
//   res.render('category_form', {
//     title: "Create Category",
//     category: undefined
//   })
// })

// exports.category_create_post = [
//   // Form input validation and sanitization
//   body("name").trim().isLength({ min: 1 }).escape().withMessage("Category name must be specified."),
//   body("description").trim().isLength({ min: 1 }).escape().withMessage("Category description must be specified."),

//   // Process request
//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req)

//     const category = new Category({
//       name: req.body.name,
//       description: req.body.description
//     });

//     if (!errors.isEmpty()) {
//       res.render("category_form", {
//         title: "Create Category",
//         category: category,
//         errors: errors.array()
//       })
//     } else {
//       await category.save();
//       res.redirect(category.url);
//     }
//   })
// ]

// exports.category_update_get = asyncHandler(async (req, res, next) => {
//   const category = await Category.findById(req.params.id).exec();

//   res.render('category_form', {
//     title: "Update Category",
//     category: category
//   })
// })

// exports.category_update_post = [
//   // Form input validation and sanitization
//   body("name").trim().isLength({ min: 1 }).escape().withMessage("Category name must not be empty."),
//   body("description").trim().isLength({ min: 1 }).escape().withMessage("Category description must not be empty."),

//   // Process request
//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req);

//     const category = new Category({
//       name: req.body.name,
//       description: req.body.description,
//       _id: req.params.id
//     })

//   if (!errors.isEmpty())  {
//     res.render("category_form", {
//       title: "Update Category",
//       category: category,
//       errors: errors
//     })
//   } else {
//     const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {});
//     res.redirect(updatedCategory.url)
//   }
//   })
// ]

// exports.category_delete_get = asyncHandler(async (req, res, next) => {
//   const [category, itemsInCategory] = await Promise.all([
//     Category.findById(req.params.id).exec(),
//     Item.find({ category: req.params.id })
//   ])

//   res.render("category_delete", {
//     title: "Delete Category",
//     category: category,
//     item_list: itemsInCategory
//   })
// })

// exports.category_delete_post = asyncHandler(async (req, res, next) => {
//   const [category, itemsInCategory] = await Promise.all([
//     Category.findById(req.params.id).exec(),
//     Item.find({ category: req.params.id })
//   ])

//   if (itemsInCategory.length > 1) {
//     res.render("category_delete", {
//       title: "Delete Category",
//       category: category,
//       item_list: itemsInCategory
//     })
//     return;
//   } else {
//     await Category.findByIdAndDelete(req.params.id);
//     res.redirect('/categories')
//   }
// })

// exports.category_detail = asyncHandler(async (req, res, next) => {
//   const [category, itemsInCategory] = await Promise.all([
//     Category.findById(req.params.id).exec(),
//     Item.find({ category: req.params.id }).exec()
//   ])

//   res.render('category_detail', {
//     title: "Category details",
//     category: category,
//     itemList: itemsInCategory
//   })
// })

// exports.category_list = asyncHandler(async (req, res, next) => {
//   const allCategories = await Category.find().exec();

//   res.render('category_list', {
//     title: "Categories",
//     categories: allCategories
//   })
// })


