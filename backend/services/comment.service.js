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

    async removeComment(id){
        try {
            
            const comment =   await Comment.findByIdAndDelete(id)
            console.log(comment);
            if(!comment){
                throw new Error('comment not found')
            }
            return removeComment;
        } catch (error) {
            throw new Error(`error deleting comment in serves: ${error.message}`)
        }
    }
}
module.exports = new CommentService();