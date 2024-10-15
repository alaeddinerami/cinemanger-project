const commentService = require("../services/comment.service");
const CommentService = require("../services/comment.service");
class CommentController {
  async createComment(req, res) {
    try {
      const { comment } = req.body;
      const user = req.user;
      const { filmId } = req.params;
      // console.log(filmId);
      
      const newComment = await CommentService.createComment(
        user,
        filmId,
        comment
      );
      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getComments(req, res){
      try {
        const comments = await CommentService.getComments();
        res.status(200).json(comments)     
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
  async removeComment(req,res){    
      try {
          const {id}= req.params
         await commentService.removeComment(id);
        res.status(200).json('comment removed successufully')
        
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
  }
}

module.exports = new CommentController();
