import React, { useState } from "react";

export default function FeedbackSection() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulated submission
        setTimeout(() => {
            setSubmitted(true);
            setTimeout(() => {
                setIsExpanded(false);
                setFeedback('');
                setEmail('');
                setSubmitted(false);
            }, 2000);
        }, 500);
    };

    return (
        <section className="w-full max-w-2xl mx-auto mt-10 mb-4">
            <div className="text-base font-bold mb-3 text-[#4CAF50] flex items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h10m-8 4h6" />
                </svg>
                Yêu cầu tính năng
            </div>

            <div className={`bg-gradient-to-br from-[#23272f] to-[#2d3748] rounded-2xl border border-[#D6F5E3] shadow-lg transition-all duration-300 overflow-hidden ${isExpanded ? 'p-6' : 'p-5'}`}>
                <div className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Bạn có ý tưởng về các tính năng bạn muốn thấy trong Món Quà Nhỏ? Ý kiến đóng góp của bạn rất quý báu và sẽ được xem xét khi lập kế hoạch lộ trình phát triển.
                </div>

                {!isExpanded ? (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="w-fit px-5 py-2 rounded-[8px] bg-[#4CAF50] text-white font-semibold flex items-center gap-2 hover:bg-[#388E3C] transition shadow-md hover:shadow-lg"
                    >
                        <span className="text-xl">+</span> Gửi phản hồi
                    </button>
                ) : (
                    <div className="animate-[fadeIn_0.3s_ease-in-out]">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-xs mb-1">Email của bạn</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email (tùy chọn)"
                                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d23] border border-gray-700 text-white focus:outline-none focus:border-[#4CAF50] transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-xs mb-1">Ý tưởng của bạn</label>
                                    <textarea
                                        rows="3"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Mô tả tính năng bạn muốn thấy..."
                                        className="w-full px-4 py-3 rounded-lg bg-[#1a1d23] border border-gray-700 text-white focus:outline-none focus:border-[#4CAF50] transition resize-none"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-[8px] bg-[#4CAF50] text-white font-semibold flex items-center gap-2 hover:bg-[#388E3C] transition"
                                    >
                                        Gửi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(false)}
                                        className="px-5 py-2 rounded-[8px] bg-transparent text-gray-300 border border-gray-700 font-medium hover:bg-[#1a1d23] transition"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-4 animate-[fadeIn_0.3s_ease-in-out]">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" className="mx-auto mb-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-gray-300">Cảm ơn bạn đã gửi phản hồi!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
