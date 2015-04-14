var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  text: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.methods.upvote = function(cb) {
  console.log("upvote schema start");
  this.upvotes += 1;
  this.save(cb);
  console.log("upvote shcema end");
};

PostSchema.methods.downvote = function(cb) {
  console.log("downvote schema start");
  this.upvotes -= 1;
  this.save(cb);
  console.log("downvote shcema end");
};

mongoose.model('Post', PostSchema);