import React from "react";
import { FaLeaf, FaHeart, FaPiggyBank, FaSmile } from "react-icons/fa";

const reasons = [
    { icon: <FaLeaf className="text-[#22C55E] text-2xl" />, title: "Bảo vệ môi trường", desc: "Góp phần tiết kiệm tài nguyên, giảm rác thải, bảo vệ môi trường sống." },
    { icon: <FaHeart className="text-[#22C55E] text-2xl" />, title: "Lan tỏa yêu thương", desc: "Sẻ chia và giúp đỡ những người cần, lan tỏa giá trị tốt đẹp." },
    { icon: <FaPiggyBank className="text-[#22C55E] text-2xl" />, title: "Văn minh & tiết kiệm", desc: "Tiết kiệm chi phí, sử dụng đồ vật hiệu quả, xây dựng lối sống xanh." },
    { icon: <FaSmile className="text-[#22C55E] text-2xl" />, title: "Dễ dàng sử dụng", desc: "Đăng tin, tìm kiếm, nhận đồ nhanh chóng, đơn giản, ai cũng có thể tham gia." },
];

const WhyUs = () => (
    <section className="w-full my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Vì sao nên chọn chúng tôi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {reasons.map((r, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 text-center flex flex-col items-center">
                    <div className="mb-2">{r.icon}</div>
                    <div className="font-semibold mb-1">{r.title}</div>
                    <div className="text-gray-500 text-sm">{r.desc}</div>
                </div>
            ))}
        </div>
    </section>
);

export default WhyUs;
