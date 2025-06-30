const mongoose = require("mongoose");

const ReportsModel = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người dùng gửi báo cáo
  type: { type: String, required: true, enum: ['post', 'comment'], default: 'post' }, // Loại báo cáo ['post', 'comment']
  // target_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID của bài viết hoặc bình luận bị báo cáo
  reason: { type: String, enum: ['spam', 'abuse', 'hated_speech', 'other'], required: true }, // Lý do báo cáo
  content: { type: String, default: '' }, // Mô tả chi tiết về báo cáo
  status: { type: String, enum: ['pending', 'reviewed', 'resolved'], default: 'pending' }, // Trạng thái báo cáo
  created_at: { type: Date, default: Date.now }, // Thời điểm gửi báo cáo
  resolved_at: { type: Date, default: null }, // Thời điểm báo cáo được giải quyết
  note: { type: String, default: '' }, // Ghi chú của quản trị viên khi giải quyết báo cáo
});

const ReportBase = mongoose.model("Reports", ReportsModel);

const PostReport = ReportBase.discriminator("PostReport", new mongoose.Schema({
  target_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityPosts", required: true }, // ID của bài viết bị báo cáo
}));

const CommentReport = ReportBase.discriminator("CommentReport", new mongoose.Schema({
  target_id: { type: mongoose.Schema.Types.ObjectId, ref: "CommunityComments", required: true }, // ID của bình luận bị báo cáo
}));

module.exports = {
  ReportBase,
  PostReport,
  CommentReport
};
