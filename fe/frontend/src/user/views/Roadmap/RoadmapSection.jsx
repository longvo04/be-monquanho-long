import React from "react";
import FeatureItem from "./FeatureItem";

const sections = [
    {
        title: "TÍNH NĂNG HIỆN TẠI (Tháng 6/2025)",
        color: "#4CAF50",
        status: "active",
        progress: 100,
        features: [
            { name: "Đăng ký/Đăng nhập đa kênh", desc: "Email, SĐT, Google, Facebook, OTP" },
            { name: "Quản lý hồ sơ người dùng", desc: "Cập nhật avatar, vị trí, lịch sử cho – nhận" },
            { name: "Đăng tin cho tặng đồ", desc: "Đăng nhanh, upload ảnh, preview, kiểm duyệt" },
            { name: "Tìm kiếm & bộ lọc thông minh", desc: "Theo danh mục, vị trí, khoảng cách, keyword" },
            { name: "Bản đồ quanh đây", desc: "Xem đồ gần mình, filter, popup chi tiết" },
            { name: "Chat Messenger 1-1", desc: "Nhắn tin bảo mật, báo xấu, trạng thái đọc/gửi" },
            { name: "Cộng đồng – Đăng bài viết, cảm ơn, hỏi đáp", desc: "Bình luận, thả tim, phân loại chủ đề" },
            { name: "Giao diện responsive", desc: "Mobile/Web tối ưu thao tác, giao diện hiện đại" },
            { name: "Trung tâm thông báo realtime", desc: "Tin nhắn mới, trạng thái giao dịch, sự kiện" },
            { name: "Quản lý tài khoản, bảo mật cá nhân", desc: "Đổi mật khẩu, xóa tài khoản, quản lý thiết bị" },
            { name: "Liên hệ admin – form hỗ trợ trực tuyến" },
            { name: "Tích hợp credits/quy đổi điểm cộng đồng" },
        ],
    },
    {
        title: "SẮP RA MẮT (Dự kiến Tháng 8/2025)",
        color: "#2196F3",
        status: "inProgress",
        progress: 35,
        features: [
            { name: "Tích hợp AI kiểm duyệt ảnh & nội dung", desc: "Tự động lọc hình, phát hiện tin ảo, nhạy cảm" },
            { name: "Gợi ý món phù hợp & tìm kiếm AI", desc: "Đề xuất món hot quanh bạn, filter cá nhân hóa" },
            { name: "Tích hợp giao hàng/ship tự động", desc: "AhaMove, GrabExpress, tracking vận đơn realtime" },
            { name: "Đăng nhập một chạm qua Apple ID" },
            { name: "Đăng bài cảm ơn/story dạng mini social" },
            { name: "Bảng xếp hạng/huy hiệu người chia sẻ tích cực" },
            { name: "Nhắc nhở tự động: Đồ đăng lâu chưa cho, lịch nhắc lấy đồ" },
        ],
    },
    {
        title: "ĐANG PHÁT TRIỂN (Dự kiến Tháng 10/2025)",
        color: "#FFC107",
        status: "planned",
        progress: 10,
        features: [
            { name: "Tính năng nhóm/cho tổ chức", desc: "Đăng tin số lượng lớn, ưu tiên cho tổ chức thiện nguyện" },
            { name: "Lên lịch đăng tin & hẹn giờ nhận đồ" },
            { name: "Thống kê, báo cáo giao dịch cho người dùng" },
            { name: "Tích hợp đánh giá đối phương (rating & feedback)" },
            { name: "Quản trị nâng cao: phân quyền, audit log, xử lý vi phạm" },
            { name: "Mở API cho bên thứ ba (vận chuyển, tổ chức từ thiện)" },
        ],
    },
];

// Status icon components
const StatusIcon = ({ status, color }) => {
    if (status === "active") {
        return (
            <div className="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center" style={{ borderColor: color }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        );
    }

    if (status === "inProgress") {
        return (
            <div className="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center" style={{ borderColor: color }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" strokeDasharray="50" strokeDashoffset="20" />
                </svg>
            </div>
        );
    }

    return (
        <div className="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center" style={{ borderColor: color }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </div>
    );
};

export default function RoadmapSection() {
    return (
        <section className="w-full max-w-3xl mx-auto">
            <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200 z-0"></div>

                <div className="space-y-8">
                    {sections.map((section, idx) => (
                        <div key={section.title} className="relative z-10 pl-12">
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-0 z-10">
                                <StatusIcon status={section.status} color={section.color} />
                            </div>

                            <div className="bg-white rounded-2xl shadow px-5 py-6 border border-[#D6F5E3] hover:shadow-md transition-shadow duration-300">
                                {/* Header with progress bar */}
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-xl md:text-2xl font-bold flex items-center" style={{ color: section.color }}>
                                            {section.title}
                                            {section.status === "inProgress" && (
                                                <span className="ml-2 px-2 py-0.5 text-xs bg-[#E3F2FD] text-[#2196F3] rounded-full">
                                                    Đang làm
                                                </span>
                                            )}
                                            {section.status === "planned" && (
                                                <span className="ml-2 px-2 py-0.5 text-xs bg-[#FFF8E1] text-[#FFA000] rounded-full">
                                                    Lên kế hoạch
                                                </span>
                                            )}
                                        </h2>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${section.progress}%`,
                                                backgroundColor: section.color
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Feature list - always displayed */}
                                <div className="animate-[fadeIn_0.5s_ease-in-out]">
                                    <ul className="space-y-2 mb-2">
                                        {section.features.map((f, i) => (
                                            <FeatureItem key={i} name={f.name} desc={f.desc} color={section.color} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
