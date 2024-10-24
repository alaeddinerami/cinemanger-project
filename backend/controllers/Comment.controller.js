const commentService = require("../services/comment.service");
class CommentController {

  async getCommentsByFilmId(req, res) {
    try {
      const { id } = req.params; 
      
      
      const comments = await commentService.getCommentsByFilmId(id);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async createComment(req, res) {
    try {
      const { comment } = req.body;
      const user = req.user;
      const { filmId } = req.params;
      // console.log(filmId);

      const newComment = await commentService.createComment(
        user,
        filmId,
        comment
      );
      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getComments(req, res) {
    try {
      const comments = await commentService.getComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateComment(req, res) {
    try {
        const userId = req.user.id
      const { comment } = req.body;
      const commentId = req.params.id;
        // console.log(commentId);
        
      const updatedComment = await commentService.updateComment(
        userId,
        commentId,
        comment
      );
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeComment(req, res) {
    try {
      const { id } = req.params;
      await commentService.removeComment(id);
      res.status(200).json({ message: "comment removed successufully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CommentController();
