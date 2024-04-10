const { ObjectId } = require("mongodb");
const { Post } = require("../models/Post");
const createPaginator = require("../utils/paginator");

const writePost = async (data) => {
  const post = Post(data);
  post.hits = 0;
  post.createdDate = new Date().toISOString();

  const result = await post.save();
  return result;
};

const postList = async (page, search) => {
  const perPage = 10;
  // /: start and end point, search: target of string, i: flag (Do not discriminate lowercase and uppercase)
  const query = { title: new RegExp(search, "i") };
  const cursor = Post.find(query)
    .limit(perPage)
    .skip((page - 1) * perPage)
    .sort({ createdDate: -1 }); // result: mongodb query

  const totalCount = await Post.find().count(query);
  const posts = await cursor.lean().exec();
  // Mongo DB is BSON, so we have to change BSON to JS object using lean function.
  // If we want to get promise from query, we have to use exec function

  const newPaginator = createPaginator({ totalCount, page, perPage: perPage });
  return [posts, newPaginator];
};

const projectionOption = {
  projection: {
    password: 0,
    "comments.password": 0,
  },
};

const getDetailPost = async (postID) => {
  return Post.findOneAndUpdate(
    { _id: postID },
    { $inc: { hits: 1 } },
    projectionOption
  ).lean();
};

const getPostByIdAndPassword = async (id, password) => {
  const target = await Post.findOne(
    { _id: id, password: password },
    projectionOption
  )
    .lean()
    .exec();
  return target;
};

const getPostById = async (id) => {
  return Post.findOne({ _id: id }, projectionOption).lean().exec();
};

const updatePost = async (id, post) => {
  const { title, content, createdDate } = post;
  const updateCtx = {
    $set: {
      title: title,
      content: content,
      createdDate: createdDate,
    },
  };
  return Post.updateOne({ _id: id }, updateCtx);
};

const deletePost = async (id, password) => {
  try {
    const target = await Post.deleteOne(
      { _id: id, password: password },
      projectionOption
    );

    if (target.deletedCount > 0) {
      return { ok: true };
    }
  } catch {
    return { ok: false };
  }
};

module.exports = {
  writePost,
  postList,
  getDetailPost,
  getPostByIdAndPassword,
  getPostById,
  updatePost,
  deletePost,
};
