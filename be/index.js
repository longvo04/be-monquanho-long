// Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình môi trường
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Cấu hình view engine
app.set("view engine", "ejs");

app.use("/api", require("./routes/index.routes"));

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
