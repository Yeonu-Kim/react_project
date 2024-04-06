const { Post } = require("../models/Post");
const createPaginator = require("../utils/paginator");

const writePost = async (data) => {
  const post = Post(data);
  post.hits = 0;
  post.createdDate = new Date().toISOString();

  const result = await post.save();
  console.log(result);
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

module.exports = {
  writePost,
  postList,
};
