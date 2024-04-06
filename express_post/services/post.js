const { Post } = require("../models/Post");
const paginator = require("../utils/paginator");

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
  // /: 시작 및 종료 기호, search: 패턴 (찾는 대상이 되는 문자열), i: 플래그 (대소문자를 구별하지 않음.)
  const query = { title: new RegExp(search, "i") };
  const cursor = Post.findOne(query, {
    limit: perPage,
    skip: (page - 1) * perPage,
  }).sort({ createdDate: -1 });

  const totalCount = await Post.count(query);
  const posts = await cursor.toArray();

  const newPaginator = paginator({ totalCount, page, perPage: perPage });

  return [posts, newPaginator];
};

module.exports = {
  writePost,
  postList,
};
