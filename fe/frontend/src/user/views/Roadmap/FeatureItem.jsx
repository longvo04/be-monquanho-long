import React from "react";

export default function FeatureItem({ name, desc, color = "#4CAF50" }) {
  return (
    <li className="group flex items-start gap-3 p-1.5 rounded-md hover:bg-[#F8FFF9] transition-all duration-200">
      <span className="mt-1 flex-shrink-0" style={{ color }}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="group-hover:scale-110 transition-transform duration-300"
        >
          <circle cx="6" cy="6" r="5" fill="currentColor" />
          <circle
            cx="6"
            cy="6"
            r="3"
            fill="white"
            opacity="0.3"
            className="group-hover:opacity-50"
          />
        </svg>
      </span>
      <div className="pb-1 border-b border-[#F0F0F0] group-hover:border-[#D6F5E3] w-full transition-colors duration-200">
        <span className="font-semibold text-[#222] group-hover:text-[#4CAF50] transition-colors duration-200">
          {name}
        </span>
        {desc && (
          <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            {desc}
          </div>
        )}
      </div>
    </li>
  );
}
