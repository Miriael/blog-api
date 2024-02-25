import express from 'express';
var router = express.Router();
import * as sessionController from "../controllers/sessionController.js";
import * as userController from "../controllers/userController.js";
import * as commentController from "../controllers/commentController.js";
import * as blogpostController from "../controllers/blogpostController.js";

router.get("/", async(req, res) => {
  if (res.locals.session ===null) {
    return res.status(403).send('You are not logged in.')
  }
  res.send('You are logged in.')
})

// commentController routes
router.post('/comment', commentController.comment_create)

router.get('/comment', commentController.comment_read)

router.delete('/comment', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  commentController.comment_delete
})

// userController routes
router.post('/user', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  userController.user_create
})

router.get('/user', userController.user_read)

router.put('/user', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  userController.user_update
})

router.delete('/user', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  userController.user_delete
})

// blogpostController routes
router.post('/blogpost', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  blogpostController.blogpost_create
})

router.get('/blogpost', blogpostController.blogpost_read)

router.put('/blogpost', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  blogpostController.blogpost_update
})

router.delete('/blogpost', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  blogpostController.blogpost_delete
})

// sessionController routes
router.post('/session', sessionController.session_create)

router.delete('/session', async(req, res) => {
  if (res.locals.session === null) {
    return res.sendStatus(403)
  }
  sessionController.session_delete
})



export default router;
