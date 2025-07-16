const express = require('express');
const router = express.Router();

// Mount từng module con cho post
router.use('/', require('../controllers/post/post.controller'));
router.use('/like', require('../controllers/post/postLike.controller'));
router.use('/comment', require('../controllers/post/postComment.controller'));
router.use('/categories', require('../controllers/post/post.category.controller'));

module.exports = router;
