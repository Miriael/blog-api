import express from 'express';
var router = express.Router();

// const blogpostController = require('../controllers/blogpostController');
// const commentController = require('../controllers/commentController');
// const userController = require('../controllers/userController');
import * as sessionController from "../controllers/sessionController.js"
import * as userController from "../controllers/userController.js"

router.get("/", async(req, res) => {
  console.log(res.locals.session)
  console.log(res.locals.user)
  if (res.locals.session != null) {
    return res.send('You are logged in!')
  }
  return res.send('You are not logged in.')
})

// signupRouter.get("/signup", async (_, res) => {
// 	if (res.locals.session) {
// 		return res.redirect("/");
// 	}
// 	const html = await renderPage();
// 	return res.setHeader("Content-Type", "text/html").status(200).send(html);
// });

// signupRouter.post("/signup", async (req, res) => {
// 	const username = req.body.username ?? null;
// 	if (!username || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
// 		return res.setHeader("Content-Type", "text/html").status(400).send(username_value, error);
// 	}
// 	const password = req.body.password ?? null;
// 	if (!password || password.length < 6 || password.length > 255) {
// 		return res.setHeader("Content-Type", "text/html").status(400).send(username_value, error);
// 	}

// 	const hashedPassword = await new Argon2id().hash(password);
// 	const userId = generateId(15);

//    const user = new User({
//      name: req.body.username,
//      password: hashedPassword,
//      _id: userId
//    });
//    user.save()
// 	const session = await lucia.createSession(userId, {});
// 	return res
// 		.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
// 		.redirect("/");
// 	}
// );


// commentController routes
// router.post('/comment', commentController.comment_create)

// router.get('/comment/:id', commentController.comment_read)

// router.put('/comment/:id', commentController.comment_update)

// router.delete('/comment/:id', commentController.comment_delete)

// router.get('/comments', commentController.comment_list)

// // userController routes
router.post('/user', userController.user_create)

router.get('/user', userController.user_read)

router.put('/user', userController.user_update)

router.delete('/user', userController.user_delete)

// router.get('/users', userController.user_list)

// blogpostController routes
// router.post('/blogpost', blogpostController.blogpost_create)

// router.get('/blogpost/:id', blogpostController.blogpost_read)

// router.put('/blogpost/:id', blogpostController.blogpost_update)

// router.delete('/blogpost/:id', blogpostController.blogpost_delete)

// router.get('/blogposts', blogpostController.blogpost_list)

// sessionController routes
router.post('/session', sessionController.session_create)

router.delete('/session', sessionController.session_delete)



export default router;
