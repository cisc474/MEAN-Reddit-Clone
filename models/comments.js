var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.upvote = function(cb) {
  console.log("comment schema start");
  this.upvotes += 1;
  this.save(cb);
  console.log("comment schema end");
};

CommentSchema.methods.downvote = function(cb) {
  console.log("comment downvote schema start");
  this.upvotes -= 1;
  this.save(cb);
  console.log("comment downvote schema end");
};

mongoose.model('Comment', CommentSchema);