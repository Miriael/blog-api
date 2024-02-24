import express from 'express';
var router = express.Router();
import * as sessionController from "../controllers/sessionController.js";
import * as userController from "../controllers/userController.js";
import * as commentController from "../controllers/commentController.js";
import * as blogpostController from "../controllers/blogpostController.js";

router.get("/", async(req, res) => {
  console.log(res.locals.session)
  console.log(res.locals.user)
  if (res.locals.session != null) {
    return res.send('You are logged in!')
  }
  return res.send('You are not logged in.')
})

// commentController routes
router.post('/comment', commentController.comment_create)

router.get('/comment', commentController.comment_read)

router.delete('/comment', commentController.comment_delete)

// userController routes
router.post('/user', userController.user_create)

router.get('/user', userController.user_read)

router.put('/user', userController.user_update)

router.delete('/user', userController.user_delete)

// blogpostController routes
router.post('/blogpost', blogpostController.blogpost_create)

router.get('/blogpost', blogpostController.blogpost_read)

router.put('/blogpost', blogpostController.blogpost_update)

router.delete('/blogpost', blogpostController.blogpost_delete)

// sessionController routes
router.post('/session', sessionController.session_create)

router.delete('/session', sessionController.session_delete)



export default router;
