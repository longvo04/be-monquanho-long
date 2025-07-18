import React from "react";
import { FaGift } from "react-icons/fa";

const CallToAction = () => (
    <section className="w-full my-12 flex flex-col items-center bg-[#A7EFC3] rounded-2xl py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Trao đi món đồ cũ, nhận lại niềm vui mới!</h2>
        <p className="mb-6 text-gray-700 text-center max-w-xl">
            Hãy để những món đồ không còn dùng đến của bạn tìm được ngôi nhà mới, nơi chúng tiếp tục mang lại giá trị và niềm vui.
        </p>
        <button className="bg-[#22C55E] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#16a34a] transition flex items-center gap-2">
            <FaGift />
            Tặng quà ngay hôm nay
        </button>
    </section>
);

export default CallToAction;
