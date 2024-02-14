var express = require('express');
var router = express.Router();

// commentController routes
router.post('/comment/create', commentController.comment_create)

router.post('/comment/:id/update', commentController.comment_update)

router.post('/comment/:id/delete', commentController.comment_delete)

router.get('/comment/:id', commentontroller.commentdetail)

router.get('/comments/', commentController.commentlist)

// userController routes
router.post('/user/create', userController.user_create)

router.post('/user/:id/update', userController.user_update)

router.post('/user/:id/delete', userController.user_delete)

router.get('/user/:id', userController.user_detail)

router.get('/users/', userController.user_list)

// blogpostController routes
router.blogpost('/blogpost/create', blogpostController.blogpost_create)

router.blogpost('/blogpost/:id/update', blogpostController.blogpost_update)

router.blogpost('/blogpost/:id/delete', blogpostController.blogpost_delete)

router.blogpost('/blogpost/:id', blogpostController.blogpost_detail)

router.blogpost('/blogposts/', blogpostController.blogpost_list)


module.exports = router;
