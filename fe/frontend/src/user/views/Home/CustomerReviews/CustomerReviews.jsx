import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "Sản phẩm rất tốt, giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop lâu dài!",
        rating: 5,
    },
    {
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        content: "Tôi rất hài lòng với dịch vụ và chất lượng sản phẩm. Đặc biệt là quà tặng kèm rất xinh xắn.",
        rating: 5,
    },
    {
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        content: "Sẽ tiếp tục ủng hộ shop trong tương lai! Sản phẩm đúng như mô tả.",
        rating: 4,
    },
];

const CustomerReviews = () => (
    <section className="my-12 w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-10">Khách hàng nói gì về chúng tôi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col items-center hover:shadow-lg transition">
                    <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mb-3 border-4 border-pink-100 shadow" />
                    <div className="font-semibold text-lg text-gray-900 mb-1">{review.name}</div>
                    <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                                size={16}
                            />
                        ))}
                    </div>
                    <div className="text-gray-600 text-center text-base">{review.content}</div>
                </div>
            ))}
        </div>
    </section>
);

export default CustomerReviews;
