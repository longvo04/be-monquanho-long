import React from "react";
import RoadmapSection from "./RoadmapSection";
import FeedbackSection from "./FeedbackSection";
import RoadmapNote from "./RoadmapNote";

export default function Roadmap() {
    return (
        <div className="container w-full py-10 px-2 sm:px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header graphic */}
                <div className="mb-6 relative">
                    <div className="absolute -top-12 -right-4 w-24 h-24 opacity-20 rounded-full bg-[#4CAF50] blur-2xl"></div>
                    <div className="absolute top-10 -left-8 w-16 h-16 opacity-10 rounded-full bg-[#FFC107] blur-xl"></div>

                    <nav className="text-sm mb-4">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <a
                                    href="/"
                                    className="text-gray-500 hover:text-[#4CAF50]"
                                >
                                    Trang chủ
                                </a>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li className="text-[#4CAF50] font-medium">
                                Lộ trình phát triển
                            </li>
                        </ol>
                    </nav>

                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#222] relative z-10">
                        Lộ Trình Phát Triển
                    </h1>

                    <div className="w-20 h-1 bg-[#4CAF50] mb-4 rounded-full"></div>

                    <p className="text-base text-gray-600 mb-2">
                        Theo dõi hành trình phát triển nền tảng kết nối cho – nhận đồ cũ. Lộ trình này phác thảo tiến trình hiện tại và kế hoạch tương lai.
                    </p>
                </div>

                <div className="space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
                    <RoadmapSection />
                    <FeedbackSection />
                    <RoadmapNote />
                </div>
            </div>
        </div>
    );
}
