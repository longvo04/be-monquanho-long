const express = require("express");
const router = express.Router();

const authRouter = require("../controllers/authenticate.controller");
const postRouter = require("../routes/post.route");

// Auth routes
router.use("/auth", authRouter);
// Post routes
router.use("/posts", postRouter);

module.exports = router;