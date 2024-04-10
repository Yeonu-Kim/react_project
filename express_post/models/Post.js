const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 127,
  },
  writer: {
    type: String,
    maxlength: 63,
  },
  password: {
    type: String,
  },
  content: {
    type: String,
    maxlength: 16383,
  },
  hits: {
    type: Number,
  },
  createdDate: {
    type: String,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
