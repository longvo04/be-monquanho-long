// Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình môi trường
dotenv.config();

const FacebookStrategy = require("./providers/FacebookStrategy");
passport.use(FacebookStrategy)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(session({
//   secret: 'motmonqua',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
// app.use(passport.authenticate('session'));

// Cấu hình view engine
app.set("view engine", "ejs");

app.use("/api", require("./routes/index.routes"));
app.use((err, req, res, next) => {
  if (err && err.message) {
    console.error("Passport error middleware:", err.message);
    return res.status(401).json({
      error: 401,
      error_text: err.message,
      data_name: "Thông tin người dùng",
      data: []
    });
  }
  next(err);
});

// Kết nối MongoDB và khởi động server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
