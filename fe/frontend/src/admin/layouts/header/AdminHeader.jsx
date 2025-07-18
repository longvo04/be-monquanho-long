import React from "react";
import Logo from "../shared/logo/Logo";
import AdminProfileMenu from "./AdminProfileMenu";

const getUserFromLocalStorage = () => {
    const fullname = localStorage.getItem("fullname") || "";
    const email = localStorage.getItem("email") || "";
    const avatar = localStorage.getItem("avatar") || "https://randomuser.me/api/portraits/men/32.jpg";
    return { fullname, email, avatar };
};

const AdminHeader = () => {
    const user = getUserFromLocalStorage();
    const firstName = user.fullname ? user.fullname.split(" ")[0] : "Admin";
    return (
        <header className="w-full h-16 bg-white border-b border-gray-100 flex items-center px-6 justify-between">
            <div className="flex items-center gap-4">
                <Logo size={36} />
                <span className="font-bold text-lg text-[#17805C]">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-6">
                {/* Notification icon */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#222" strokeWidth="2">
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <AdminProfileMenu user={user} firstName={firstName} />
            </div>
        </header>
    );
};

export default AdminHeader;
