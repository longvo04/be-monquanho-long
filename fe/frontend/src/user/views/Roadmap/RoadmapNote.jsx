import React from "react";

export default function RoadmapNote() {
    return (
        <section className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md px-5 py-6 md:px-8 md:py-6 my-8 border-l-4 border-[#FFC107] border border-[#D6F5E3] hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-[#FFC107] opacity-5 rounded-full"></div>

            <div className="flex items-center gap-3 mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="font-semibold text-base text-[#795548]">Lưu ý</div>
            </div>

            <ul className="space-y-2 text-sm text-[#795548] ml-9">
                <li className="relative">
                    <span className="absolute -left-5 top-1.5">•</span>
                    Lộ trình này phản ánh kế hoạch hiện tại và có thể thay đổi tùy theo phản hồi người dùng, tình hình thực tế và yếu tố kỹ thuật.
                </li>
                <li className="relative">
                    <span className="absolute -left-5 top-1.5">•</span>
                    Chúng tôi ưu tiên phát triển các tính năng được yêu cầu nhiều nhất từ người dùng.
                </li>
            </ul>

            <div className="flex items-center justify-between mt-4 pt-2 border-t border-[#F0F0F0]">
                <div className="text-xs text-gray-500">Cập nhật lần cuối: 06/2025</div>
            </div>
        </section>
    );  
}
