const express = require('express')
const router = express.Router();

const CommentController = require('../controllers/Comment.controller');

router.post('/:filmId',CommentController.createComment);
router.get('/',CommentController.getComments);

module.exports = router;