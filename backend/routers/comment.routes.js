const express = require('express')
const router = express.Router();

const CommentController = require('../controllers/Comment.controller');

router.post('/:filmId',CommentController.createComment);
router.get('/',CommentController.getComments);
router.delete('/:id',CommentController.removeComment);
router.put('/:id',CommentController.updateComment);

module.exports = router;