import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => (
    <div className="w-full flex items-center mb-4 bg-[#F6F6F6] rounded-xl px-4 py-3 border border-gray-200">
        <FaSearch className="text-gray-400 mr-2" />
        <input
            type="text"
            placeholder="Tìm kiếm đồ bạn cần (áo, đồ chơi, sách, đồ điện...)"
            className="flex-1 px-2 py-1 bg-transparent outline-none text-gray-800"
        />
        <button className="bg-[#22C55E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#16a34a] transition ml-2">
            Tìm Kiếm
        </button>
    </div>
);

export default SearchBar;
