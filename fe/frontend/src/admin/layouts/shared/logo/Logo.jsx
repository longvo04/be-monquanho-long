import React from "react";

const Logo = ({ size = 32 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <g>
            <path d="M8 24C8 24 8 16 16 8C24 16 24 24 24 24H8Z" fill="#4CAF50" />
            <rect x="6" y="26" width="20" height="2" rx="1" fill="#222" />
        </g>
    </svg>
);

export default Logo;
