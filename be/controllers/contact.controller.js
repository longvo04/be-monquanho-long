const express = require("express");
const router = express.Router();
const contactService = require("../services/contact.service");

// Tạo yêu cầu liên hệ mới
router.post("/create", async (req, res) => {
    try {
        const contactData = req.body;
        const newContact = await contactService.createContact(contactData);
        return res.status(201).json({
            error: 0,
            error_text: "Yêu cầu liên hệ đã được tạo thành công!",
            data_name: "Yêu cầu liên hệ",
            data: [newContact],
        });
    } catch (error) {
        console.error("Lỗi tạo yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Yêu cầu liên hệ",
            data: [],
        });
    }
});

// Lấy danh sách yêu cầu liên hệ
router.get("/list", async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        return res.status(200).json({
            error: 0,
            error_text: "Lấy danh sách yêu cầu liên hệ thành công!",
            data_name: "Danh sách yêu cầu liên hệ",
            data: contacts,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Danh sách yêu cầu liên hệ",
            data: [],
        });
    }
});

// Cập nhật trạng thái yêu cầu liên hệ
router.put("/update/:id", async (req, res) => {
    try {
        const contactId = req.params.id;
        const updateData = req.body;
        const updatedContact = await contactService.updateContact(contactId, updateData);
        if (!updatedContact) {
            return res.status(404).json({
                error: 404,
                error_text: "Yêu cầu liên hệ không tồn tại!",
                data_name: "Yêu cầu liên hệ",
                data: [],
            });
        }
        return res.status(200).json({
            error: 0,
            error_text: "Cập nhật yêu cầu liên hệ thành công!",
            data_name: "Yêu cầu liên hệ",
            data: [updatedContact],
        });
    } catch (error) {
        console.error("Lỗi cập nhật yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Yêu cầu liên hệ",
            data: [],
        });
    }
});

// Xóa yêu cầu liên hệ
router.delete("/delete/:id", async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await contactService.deleteContact(contactId);
        if (!deletedContact) {
            return res.status(404).json({
                error: 404,
                error_text: "Yêu cầu liên hệ không tồn tại!",
                data_name: "Yêu cầu liên hệ",
                data: [],
            });
        }
        return res.status(200).json({
            error: 0,
            error_text: "Xóa yêu cầu liên hệ thành công!",
            data_name: "Yêu cầu liên hệ",
            data: [],
        });
    } catch (error) {
        console.error("Lỗi xóa yêu cầu liên hệ:", error.message);
        return res.status(500).json({
            error: 500,
            error_text: error.message,
            data_name: "Yêu cầu liên hệ",
            data: [],
        });
    }
});

module.exports = router;
