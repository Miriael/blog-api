import express from 'express';
var router = express.Router();
import * as sessionController from "../controllers/sessionController.js";
import * as userController from "../controllers/userController.js";
import * as commentController from "../controllers/commentController.js";
import * as blogpostController from "../controllers/blogpostController.js";

router.get("/", async(req, res) => {
  if (res.locals.session === null) {
    return res.status(403).send('You are not logged in.')
  }
  res.json('You are logged in.')
})

// commentController routes
router.post('/comment', commentController.comment_create)

router.get('/comment/:id', commentController.comment_read)

router.delete('/comment', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  commentController.comment_delete
)

// userController routes
router.post('/user', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  userController.user_create
)

router.get('/user/:id', userController.user_read)

router.put('/user', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  userController.user_update
)

router.delete('/user', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  userController.user_delete
)

// blogpostController routes
router.post('/blogpost', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  blogpostController.blogpost_create
)

router.get('/blogpost/:id', blogpostController.blogpost_read)

router.put('/blogpost', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  blogpostController.blogpost_update
)

router.delete('/blogpost', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  blogpostController.blogpost_delete
)

router.get('/blogpost-list', blogpostController.blogpost_list)

// sessionController routes
router.post('/session', sessionController.session_create)

router.delete('/session', (req, res, next) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  next()},
  sessionController.session_delete
)



export default router;
