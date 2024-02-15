var express = require('express');
var router = express.Router();
const blogpostController = require('../controllers/blogpostController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');


// commentController routes
router.post('/comment', commentController.comment_create)

router.get('/comment/:id', commentController.comment_read)

router.put('/comment/:id', commentController.comment_update)

router.delete('/comment/:id', commentController.comment_delete)

router.get('/comments', commentController.comment_list)

// userController routes
router.post('/user', userController.user_create)

router.get('/user/:id', userController.user_read)

router.put('/user/:id', userController.user_update)

router.delete('/user/:id', userController.user_delete)

router.get('/users', userController.user_list)

// blogpostController routes
router.post('/blogpost', blogpostController.blogpost_create)

router.get('/blogpost/:id', blogpostController.blogpost_read)

router.put('/blogpost/:id', blogpostController.blogpost_update)

router.delete('/blogpost/:id', blogpostController.blogpost_delete)

router.get('/blogposts', blogpostController.blogpost_list)


module.exports = router;
