const Comment = require('../models/Comment.model');
const FilmModel = require('../models/Film.model');

class CommentService{
    async createComment(userId,filmId,comment){
        console.log(userId,filmId,comment);

        try {
            const filmexist = await FilmModel.findById(filmId); 
            
            if (!filmexist) {
                throw new Error('Film not found');
            }
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

    async getComments(){
        try {
            return await Comment.find();
        } catch (error) {
            throw new Error(`error geting comment in serves: ${error.message}`)
        }
    }
    async updateComment(userId, commentId, updateMessage) {
        try {
            // console.log(userId);
            const comment = await Comment.findById(commentId);
            
            if (!comment) {
                throw new Error('Comment not found');
            }
            console.log(comment.user.toString());
            console.log(userId);
            
            if (comment.user.toString() !== userId) {
                throw new Error('Unauthorized: You cannot update someone else\'s comment');
            }

            comment.comment = updateMessage;
            await comment.save();

            return comment;
        } catch (error) {
            throw new Error(`Error updating comment in service: ${error.message}`);
        }
    }
    async removeComment(id){
        try {
            
            const removecomment =   await Comment.findByIdAndDelete(id)
            // console.log(removecomment);
            if(!removecomment){
                throw new Error('comment not found')
            }
            return removecomment;
        } catch (error) {
            throw new Error(`error deleting comment in serves: ${error.message}`)
        }
    }
}
module.exports = new CommentService();