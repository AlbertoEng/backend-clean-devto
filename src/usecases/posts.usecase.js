const mongoose = require("mongoose");
const Post = require('../models/posts.model');
const User = require('../models/users.model');
const createError = require("http-errors");


// GET /posts
async function getAll(titleFilter, user) {
  const filters = {};

  if (titleFilter) {
    filters.title = new RegExp(titleFilter, "i");
  }

  if (user && mongoose.isValidObjectId( user )) {
    filters.user = user;
  }

  return Post.find(filters).populate("user");
}


// POST /posts
async function create( postData ) {
  // validar que el id del user tiene un formato de id
  if (!mongoose.isValidObjectId(postData.user)) {
    throw new createError(400, "Invalid user id");
  }

  // validar que el user exista
  const user = await User.findById(postData.user);

  if (!user) {
    throw new createError(404, "user not found");
  }

  return Post.create( postData );
}


// GET /posts/id
async function getById( id ) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  const post = await Post.findById(id).populate("user");

  if (!post ) {
    throw new createError(404, "post not found");
  }

  return post;
}

// DELETE /posts/id
async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }
  const postDeleted = await Post.findByIdAndDelete(id); // findByIdAndDelete(id)

  if (!postDeleted) {
    throw new createError(404, "post not found");
  }

  return postDeleted;
}

// PATCH /posts/id
async function updateById(id, dataToUpdate) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }
 
  if ( dataToUpdate.user ) {
    // throw new createError(445, "Koder should not be updated");
    if (!mongoose.isValidObjectId( dataToUpdate.user )) {
      throw new createError(400, "Invalid user id");
    }

    const user = await User.findById( dataToUpdate.user );
    if (!user) {
      throw new createError(404, "user not found");
    }
  }

  dataToUpdate.updated_at = new Date();

  const postUpdated = await Post.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!postUpdated) {
    throw new createError(404, "post not found");
  }

  return postUpdated;
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};