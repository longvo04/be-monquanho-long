const express = require("express");
const router = express.Router();
const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");
const postRouter = require("../controllers/post.controller");
const categoryRouter = require("../controllers/category.controller");
const commentRouter = require("../controllers/comment.controller");
const reportRouter = require("../controllers/report.controller");

// Mount toàn bộ router của controller vào /auth
router.use("/auth", authRouter);

// Mount toàn bộ router của controller vào /contact
router.use("/contact", contactRouter);

// Mount toàn bộ router của controller vào /posts
router.use("/post", postRouter);

router.use("/category", categoryRouter);

router.use("/comment", commentRouter);

router.use("/report", reportRouter);
module.exports = router;