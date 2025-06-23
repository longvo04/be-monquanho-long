const Contact = require("../models/contact/contact.model");

// Tạo yêu cầu liên hệ mới
exports.createContact = async (contactData) => {
    try {
        const contact = new Contact(contactData);
        return await contact.save();
    } catch (error) {
        console.error("Lỗi khi tạo yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi tạo yêu cầu liên hệ: " + error.message);
    }
};

// Lấy danh sách yêu cầu liên hệ
exports.getAllContacts = async () => {
    try {
        return await Contact.find();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi lấy danh sách yêu cầu liên hệ: " + error.message);
    }
};

// Cập nhật trạng thái yêu cầu liên hệ
exports.updateContact = async (id, updateData) => {
    try {
        return await Contact.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error("Lỗi khi cập nhật yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi cập nhật yêu cầu liên hệ: " + error.message);
    }
};

// Xóa yêu cầu liên hệ
exports.deleteContact = async (id) => {
    try {
        return await Contact.findByIdAndDelete(id);
    } catch (error) {
        console.error("Lỗi khi xóa yêu cầu liên hệ:", error.message);
        throw new Error("Lỗi khi xóa yêu cầu liên hệ: " + error.message);
    }
};
