const mongoose = require("mongoose");
const schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
  user: { type: schema.Types.ObjectId, ref: 'User', required: true },
  film: { type: schema.Types.ObjectId, ref: 'Film', required: true },
  comment: { type: String, required: true },
},{
  timestamps:true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
