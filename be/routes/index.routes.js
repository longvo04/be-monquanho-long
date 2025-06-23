const express = require("express");
const router = express.Router();
const authRouter = require("../controllers/authenticate.controller");
const contactRouter = require("../controllers/contact.controller");

// Mount toàn bộ router của controller vào /auth
router.use("/auth", authRouter);

// Mount toàn bộ router của controller vào /contact
router.use("/contact", contactRouter);

module.exports = router;