import React from "react";

const BannerSection = () => (
  <section className="w-full bg-white rounded-2xl overflow-hidden mb-8 flex flex-col sm:flex-col md:flex-row items-center px-4 sm:px-6 md:px-0 py-6 md:py-0 min-h-[220px] border border-gray-200">
    {/* Text Section */}
    <div className="flex-1 flex flex-col justify-center items-start px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
        Tặng món đồ cũ, trao đi
        <br />
        yêu thương mới
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4">
        Lan tỏa niềm vui từ những điều nhỏ bé
        <br />
        Chia sẻ những món đồ không dùng đến với cộng đồng. Miễn phí, nhanh chóng, đầy nhân văn
      </p>
    </div>

    {/* Image Section */}
    <div className="flex-1 flex justify-center items-center bg-[#E6F4E6] w-full md:w-auto min-h-[160px] sm:min-h-[180px] md:min-h-[220px] px-4 py-4">
      <img
        src="https://cdn.sstatic.net/Img/home/illo-freegifts.png"
        alt="Tặng đồ cũ"
        className="h-32 sm:h-40 md:h-52 object-contain"
      />
    </div>
  </section>
);

export default BannerSection;
