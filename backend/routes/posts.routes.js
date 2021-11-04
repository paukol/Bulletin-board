const express = require("express");
const router = express.Router();
const upload = require("./../config/upload");
const Post = require("../models/post.model");

router.get("/posts", async (req, res) => {
  try {
    const result = await Post.find({ status: "published" })
      .select("author created updated title photo text")
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/yourposts", async (req, res) => {
  try {
    const where = { status: "published" };
    if (req.user) {
      where.author = req.user.emails[0].value;
    }

    const result = await Post.find(where)
      .select("author created updated title photo text")
      .sort({ created: -1 });
    console.log(result);
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/posts/add", upload.single("photo"), async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      price,
      phone,
      location,
    } = req.body;

    let photoSrc;
    if (req.file) {
      const { filename } = req.file;
      photoSrc = "/uploads/" + filename;
    } else {
      photoSrc = "";
    }
    const pattern = new RegExp(
      /(<\s*(strong|em)*>(([A-z]|\s)*)<\s*\/\s*(strong|em)>)|(([A-z]|\s|\.)*)/,
      "g"
    );
    const titleMatched = (title.match(pattern) || []).join("");
    const textMatched = (author.match(pattern) || []).join("");
    const locationMatched = (location.match(pattern) || []).join("");
    const emailPattern = new RegExp(
      "^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}"
    );
    const validatedEmail = emailPattern.test(author);

    if (titleMatched.length < title.length)
      throw new Error("Invalid characters in the title...");

    if (location && locationMatched.length < location.length)
      throw new Error("Invalid characters in the location...");

    if (!validatedEmail) throw new Error("Wrong email!");

    if (text.length < 20 || title.length < 10)
      throw new Error("The text is too short");
    if (title && text && author && status) {
      const newPost = new Post({
        author: author,
        created: created,
        updated: updated,
        status: status,
        title: title,
        text: text,
        photo: photoSrc,
        price: price,
        phone: phone,
        location: location,
      });
      await newPost.save();
      res.json({ message: "OK" });
    } else {
      throw new Error("Wrong input!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/posts/:id/edit", upload.single("photo"), async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      price,
      phone,
      location,
      photo,
    } = req.body;

    let photoSrc;
    if (req.file) {
      const { filename } = req.file;
      photoSrc = "/uploads/" + filename;
    } else {
      photoSrc = photo;
    }

    const emailPattern = new RegExp(
      "^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}"
    );
    const validatedEmail = emailPattern.test(author);
    if (!validatedEmail) throw new Error("Wrong email!");
    if (text.length < 20 || title.length < 10)
      throw new Error("The text is too short");

    if (title && text && author && status) {
      const postToEdit = await Post.findById(req.params.id);
      if (postToEdit) {
        const changedPost = await Post.updateOne(
          { _id: req.params.id },
          {
            $set: {
              author: author,
              created: created,
              updated: updated,
              status: status,
              title: title,
              text: text,
              photo: photoSrc,
              price: price,
              phone: phone,
              location: location,
            },
          }
        );
        res.json(changedPost);
      } else {
        throw new Error("Wrong input!");
      }
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;