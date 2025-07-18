import React from "react";
import { FaHome, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-[#EEF8F1] border-t border-[#EEF8F1] pt-8 pb-4 w-full">
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 px-4 sm:px-6 lg:px-8">
      {/* Liên Hệ */}
      <div className="text-center md:text-left flex flex-col items-center md:items-start">
        <h3 className="text-xl font-bold mb-4 text-[#4CAF50]">Liên Hệ</h3>
        <ul className="space-y-2 text-[#222] text-[15px]">
          <li className="flex items-start gap-2">
            <FaHome className="mt-1 text-[#4CAF50]" />
            <span className="font-semibold">CÔNG TY TNHH CÔNG NGHỆ PHẦN MỀM DUDI</span>
          </li>
          <li className="flex items-start gap-2">
            <FaMapMarkerAlt className="mt-1 text-[#4CAF50]" />
            <span>232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, TP.HCM, Việt Nam</span>
          </li>
          <li className="flex items-center gap-2">
            <FaPhoneAlt className="text-[#4CAF50]" />
            <span>0318776997</span>
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-[#4CAF50]" />
            <span>dudisoftware@gmail.com</span>
          </li>
        </ul>

        {/* Đăng ký email */}
        <form className="flex flex-col sm:flex-row gap-2 mt-6 w-full max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 px-4 py-2 rounded-lg border border-[#D6F5E3] bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition"
          >
            Đăng ký
          </button>
        </form>

        {/* Social icons */}
        <div className="flex gap-4 mt-6 justify-center md:justify-start">
          <a href="#" className="text-[#4CAF50] hover:text-[#388E3C] text-xl transition"><FaFacebookF /></a>
          <a href="#" className="text-[#4CAF50] hover:text-[#388E3C] text-xl transition"><FaLinkedinIn /></a>
          <a href="#" className="text-[#4CAF50] hover:text-[#388E3C] text-xl transition"><FaInstagram /></a>
        </div>
      </div>

      {/* Dịch Vụ */}
      <div className="text-center md:text-left flex flex-col items-center md:items-start">
        <h3 className="text-xl font-bold mb-4 text-[#4CAF50]">Dịch Vụ</h3>
        <ul className="space-y-2 text-[#222] text-[15px]">
          <li>Lập trình máy tính</li>
          <li>Bán buôn máy tính, thiết bị ngoại vi và phần mềm</li>
          <li>Xuất bản phần mềm</li>
          <li>Hoạt động thiết kế chuyên ngành</li>
        </ul>
      </div>

      {/* Địa Chỉ */}
      <div className="text-center md:text-left flex flex-col items-center md:items-start">
        <h3 className="text-xl font-bold mb-4 text-[#4CAF50]">Địa Chỉ</h3>
        <div className="rounded-lg overflow-hidden border border-[#D6F5E3] w-full h-40 max-w-sm">
          <iframe
            title="DUDI Map"
            src="https://www.google.com/maps?q=232+Nguyễn+Thị+Minh+Khai,+Phường+Võ+Thị+Sáu,+Quận+3,+Thành+phố+Hồ+Chí+Minh,+Việt+Nam&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>

    {/* Bản quyền */}
    <div className="max-w-screen-xl mx-auto text-center text-[#4CAF50] text-xs mt-8 px-4 sm:px-6 lg:px-8 font-semibold">
      © {new Date().getFullYear()} CÔNG TY TNHH CÔNG NGHỆ PHẦN MỀM DUDI. All rights reserved.
    </div>
  </footer>
);

export default Footer;
