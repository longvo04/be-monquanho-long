const express = require("express");
const router = express.Router();
const reportService = require("../services/report.service");
const verifyToken = require("../middleware/VerifyToken.middleware");
const { checkAdmin } = require("../middleware/checkRole.middleware");
const { validateId } = require("../utils/validate.util");

// Tạo báo cáo mới
router.post("/create", verifyToken, async (req, res) => {
  try {
    const reportData = req.body;
    const { type, target_id, reason } = reportData;
    if (type !== "post" && type !== "comment") {
      return res.status(400).json({
        error: 400,
        error_text: "Loại báo cáo không hợp lệ. Chỉ hỗ trợ 'post', 'comment'",
        data_name: "Báo cáo",
        data: [],
      });
    }
    if (!target_id || !reason) {
      return res.status(400).json({
        error: 400,
        error_text: "Thiếu thông tin cần thiết để tạo báo cáo:" + [!target_id ? " target_id" : "", !reason ? " reason" : ""].filter(Boolean).join(", "),
        data_name: "Báo cáo",
        data: [],
      });
    }
    reportData.user_id = req.userData.user._id; // Lấy ID người dùng từ token
    const newReport = await reportService.createReport(reportData);
    return res.status(201).json({
      error: 0,
      error_text: "Báo cáo đã được tạo thành công!",
      data_name: "Báo cáo",
      data: [newReport],
    });
  } catch (error) {
      console.error("Lỗi tạo báo cáo:", error.message);
      return res.status(500).json({
        error: 500,
        error_text: error.message,
        data_name: "Báo cáo",
        data: [],
      });
    }
});

// Lấy tất cả báo cáo
router.get("/list", verifyToken, checkAdmin, async (req, res) => {
    try {
        const reports = await reportService.getAllReports();
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách báo cáo thành công!",
            data_name: "Danh sách báo cáo",
            data: reports,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 
            error: 500, 
            error_text: error.message, 
            data_name: "Báo cáo", 
            data: [] 
        });
    }
});

// Lấy báo cáo theo ID
router.get("/:id", verifyToken, checkAdmin, async (req, res) => {
    try {
        const reportId = req.params.id;
        if (!validateId(reportId)) {
            return res.status(400).json({
                error: 400,
                error_text: "ID báo cáo không hợp lệ.",
                data_name: "Báo cáo",
                data: [],
            });
        }
        const report = await reportService.getReportById(reportId);
        return res.status(200).json({
            error: 0,
            error_text: "Lấy báo cáo thành công!",
            data_name: "Báo cáo",
            data: [report],
        });
    } catch (error) {
        console.error("Lỗi lấy báo cáo:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Báo cáo",
            data: [],
        });
    }
});

// Cập nhật trạng thái báo cáo
router.put("/update/:id", verifyToken, checkAdmin, async (req, res) => {
    try {
        const reportId = req.params.id;
        const { status, note } = req.body;
        if (!validateId(reportId)) {
            return res.status(400).json({
                error: 400,
                error_text: "ID báo cáo không hợp lệ.",
                data_name: "Báo cáo",
                data: [],
            });
        }
        if (status !== "pending" && status !== "resolved" && status !== "reviewed") {
            return res.status(400).json({
                error: 400,
                error_text: "Trạng thái báo cáo không hợp lệ. Chỉ hỗ trợ 'pending', 'resolved', 'reviewed'",
                data_name: "Báo cáo",
                data: [],
            });
        }
        const updatedReport = await reportService.updateStatus(reportId, status, note);
        return res.status(200).json({
            error: 0,
            error_text: "Cập nhật báo cáo thành công!",
            data_name: "Báo cáo",
            data: [updatedReport],
        });
    } catch (error) {
        console.error("Lỗi cập nhật báo cáo:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Báo cáo",
            data: [],
        });
    }
});

module.exports = router;
