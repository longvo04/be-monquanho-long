import React from "react";
import { NavLink } from "react-router-dom";

const SidebarMenuItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            [
                "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition",
                isActive
                    ? "bg-[#E6F4E6] text-[#17805C]"
                    : "text-gray-700 hover:bg-[#F6F6F6]"
            ].join(" ")
        }
    >
        <span>{icon}</span>
        <span>{label}</span>
    </NavLink>
);

export default SidebarMenuItem;
