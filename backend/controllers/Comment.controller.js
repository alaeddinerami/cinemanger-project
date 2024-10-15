const CommentService = require('../services/comment.service')
class CommentController{
async createComment(req, res){
    try {
        const { film, comment}= req.body;
        const user = req.user
        console.log(req.userId);
        
        const newComment = await CommentService.createComment(user, film, comment);
        res.status(200).json(newComment)    
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}
}

module.exports = new CommentController();