const { PostReport, CommentReport } = require("../models/report/report.model");
const CommunityPostsModel = require("../models/post/community_posts.model");
const CommunityCommentsModel = require("../models/comment/community_comments.model");

// Tạo báo cáo mới
exports.createReport = async (reportData) => {
    try {
        if (reportData.type === 'post') {
            reportData.target_id = await CommunityPostsModel.findById(reportData.target_id);
            if (!reportData.target_id) {
                throw new Error("Bài viết không tồn tại");
            }
            return await new PostReport(reportData).save();
        }

        if (reportData.type === 'comment') {
            reportData.target_id = await CommunityCommentsModel.findById(reportData.target_id);
            if (!reportData.target_id) {
                throw new Error("Bình luận không tồn tại");
            }
            return await new CommentReport(reportData).save();
        }
    } catch (error) {
        console.error("Lỗi khi tạo báo cáo:", error.message);
        throw new Error("Lỗi khi tạo báo cáo: " + error.message);
    }
}

// Lấy tất cả báo cáo
exports.getAllReports = async () => {
    try {
      const postReports = await PostReport.find()
        .populate("user_id", "_id name avatar_url")
        .populate("target_id", "_id content created_at");
      const commentReports = await CommentReport.find()
        .populate("user_id", "_id name avatar_url")
        .populate("target_id", "_id post_id content created_at");
      return [...postReports, ...commentReports];
    } catch (error) {
        console.error("Lỗi khi lấy tất cả báo cáo:", error.message);
        throw new Error("Lỗi khi lấy tất cả báo cáo: " + error.message);
    }
}

// Lấy báo cáo theo ID
exports.getReportById = async (reportId) => {
    try {
        const postReport = await PostReport.findById(reportId)
            .populate("user_id", "_id name avatar_url")
            .populate("target_id", "_id content created_at");
        if (!postReport) {
            throw new Error("Báo cáo không tồn tại");
        }
        if (postReport) return postReport;

        const commentReport = await CommentReport.findById(reportId)
            .populate("user_id", "_id name avatar_url")
            .populate("target_id", "_id post_id content created_at");
        if (commentReport) return commentReport;

        throw new Error("Báo cáo không tồn tại");
    } catch (error) {
        console.error("Lỗi khi lấy báo cáo:", error.message);
        throw new Error("Lỗi khi lấy báo cáo: " + error.message);
    }
}

exports.getRelatedReports = async (targetId) => {
    try {
        const postReports = await PostReport.find({ target_id: targetId })
            .populate("user_id", "_id name avatar_url")
            .populate("target_id", "_id content created_at");

        const commentReports = await CommentReport.find({ target_id: targetId })
            .populate("user_id", "_id name avatar_url")
            .populate("target_id", "_id post_id content created_at");
        return [...postReports, ...commentReports];
    } catch (error) {
        console.error("Lỗi khi lấy báo cáo liên quan:", error.message);
        throw new Error("Lỗi khi lấy báo cáo liên quan: " + error.message);
    }
}

// Lấy báo cáo theo loại (post hoặc comment)
exports.getReportsByType = async (type) => {
    try {
        if (type === 'post') {
            return await PostReport.find()
                .populate("user_id", "_id name avatar_url")
                .populate("target_id", "_id content created_at");
        } else if (type === 'comment') {
            return await CommentReport.find()
                .populate("user_id", "_id name avatar_url")
                .populate("target_id", "_id post_id content created_at");
        } else {
            throw new Error("Loại báo cáo không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi khi lấy báo cáo theo loại:", error.message);
        throw new Error("Lỗi khi lấy báo cáo theo loại: " + error.message);
    }
}

// Xóa báo cáo theo ID
exports.deleteReportById = async (reportId) => {
    try {
        const deletedReport = await PostReport.findByIdAndDelete(reportId) || await CommentReport.findByIdAndDelete(reportId);
        if (!deletedReport) {
            throw new Error("Báo cáo không tồn tại");
        }
        return deletedReport;
    } catch (error) {
        console.error("Lỗi khi xóa báo cáo:", error.message);
        throw new Error("Lỗi khi xóa báo cáo: " + error.message);
    }
}

// Update status
exports.updateStatus = async (reportId, status, note) => {
  try {
    const report = await PostReport.findById(reportId) || await CommentReport.findById(reportId);
    if (!report) {
      throw new Error("Báo cáo không tồn tại");
    }
    report.status = status;
    if (note) {
      report.note = note;
    }
    return await report.save();
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái báo cáo:", error.message);
    throw new Error("Lỗi khi cập nhật trạng thái báo cáo: " + error.message);
  }
}

// Submit xử lý báo cáo
exports.resolveReport = async (reportId, action) => {
  try {
    const report = await PostReport.findById(reportId) || await CommentReport.findById(reportId);
    if (!report) {
        throw new Error("Báo cáo không tồn tại");
    }

    if (action === 'delete') {
        const reportedContent = await CommunityPostsModel.findById(report.target_id) || await CommunityCommentsModel.findById(report.target_id);
        if (!reportedContent) {
            throw new Error("Nội dung không tồn tại");
        }
        reportedContent.status = 'deleted';
        report.status = 'resolved';
        await reportedContent.save();
        return await report.save();
    } else {
        throw new Error("Hành động không hợp lệ");
    }
  } catch (error) {
        console.error("Lỗi khi xử lý báo cáo:", error.message);
        throw new Error("Lỗi khi xử lý báo cáo: " + error.message);
  }
}

