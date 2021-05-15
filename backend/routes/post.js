const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
router.post("/", async (req, res) => {
  const { from, to, date, freeSeats, user } = req.body;
  try {
    let post = new Post({ from, to, date, freeSeats, user });
    await post.save();
    const id = post._id;
    Post.findById(id)
      .populate("user")
      .then((post) => {
        res.json(post);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/", async (req, res) => {
  //Obtinere posturi
  try {
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
