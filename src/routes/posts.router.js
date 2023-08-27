const express = require("express");
const auth = require("../middlewares/auth.middleware")
const posts = require("../usecases/posts.usecase");

const router = express.Router();
 // Crear un nuevo post
router.post("/", auth, async (request, response) => {
    try {
      const postData = request.body;
      const newUser = await posts.create(postData);
  
      response.status(201);
      response.json({
        message: "Post created",
        data: {
          post: newUser,
        },
      });
    } catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      response.status(error.status || status);
      response.json({
        message: "something went wrong",
        error: error.message,
      });
    }
  });

  // Obtener todos los posts
  router.get("/", async (request, response) => {
    try {
      const { titleFilter, user } = request.query
      const allPosts = await posts.getAll(titleFilter, user);
  
      response.json({
        message: "Posts list",
        data: {
          posts: allPosts,
        },
      });
    } catch (error) {
      response.status(500);
      response.json({
        message: "something went wrong",
        error: error.message,
      });
    }
  });

  // Permitir actualizar un post
  router.patch("/:id", auth, async (request, response) => {
    try {
      const { id } = request.params;
      const data = request.body;
  
      const postUpdated = await posts.updateById(id, data);
  
      response.json({
        message: "post updated",
        data: {
          post: postUpdated,
        },
      });
    } catch (error) {
      response.status(error.status || 500);
      response.json({
        message: "something went wrong",
        error: error.message,
      });
    }
  });

  // Permite borrar un post
  router.delete("/:id", auth, async (request, response) => {
    try {
      const { id } = request.params;
      const postDeleted = await posts.deleteById(id);
  
      response.json({
        message: "Post deleted",
        data: {
          post: postDeleted,
        },
      });
    } catch (error) {
      response.status(error.status || 500);
      response.json({
        message: "something went wrong",
        error: error.message,
      });
    }
  });
  
  module.exports = router