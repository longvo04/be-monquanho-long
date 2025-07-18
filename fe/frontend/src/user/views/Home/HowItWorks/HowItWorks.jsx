import React from "react";
import { FaCamera, FaEnvelopeOpenText, FaHandshake } from "react-icons/fa";

const steps = [
    { icon: <FaCamera className="text-[#22C55E] text-2xl" />, title: "1. Đăng đồ", desc: "Chụp ảnh và đăng món đồ bạn muốn tặng lên nền tảng." },
    { icon: <FaEnvelopeOpenText className="text-[#22C55E] text-2xl" />, title: "2. Yêu cầu", desc: "Người khác gửi yêu cầu nhận món đồ của bạn." },
    { icon: <FaHandshake className="text-[#22C55E] text-2xl" />, title: "3. Trao tay", desc: "Hẹn gặp và trao đổi trực tiếp với người nhận." },
];

const HowItWorks = () => (
    <section className="w-full my-12 bg-[#E6F4E6] rounded-2xl py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Cách hoạt động</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
            {steps.map((step, idx) => (
                <div key={idx} className="flex-1 bg-white rounded-xl border border-gray-100 p-6 text-center flex flex-col items-center">
                    <div className="mb-2">{step.icon}</div>
                    <div className="font-semibold mb-1">{step.title}</div>
                    <div className="text-gray-500 text-sm">{step.desc}</div>
                </div>
            ))}
        </div>
    </section>
);

export default HowItWorks;
