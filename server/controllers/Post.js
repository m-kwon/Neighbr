const Post = require('../database/Post');
const Comment = require('../database/Comment');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(['commentId']);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.find({_id: postId}).populate(['commentId']);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const postPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  postPost
};