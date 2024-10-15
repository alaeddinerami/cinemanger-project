const Comment = require('../models/Comment.model')

class CommentService{
    async createComment(userId,filmId,comment){
        console.log(userId,filmId,comment);

        try {
            const newComment = new Comment({
                user: userId,
                film: filmId,
                comment:comment
            })
            
             await newComment.save();
            return newComment;     
                             
        } catch (error) {
            throw new Error(`error adding comment in serves: ${error.message}`)
        }
    }
}
module.exports = new CommentService();