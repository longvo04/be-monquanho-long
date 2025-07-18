import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfileMenu = ({ user, firstName }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const avatar = user.avatar || "https://randomuser.me/api/portraits/men/32.jpg";
    const name = user.fullname || "Admin";
    const email = user.email || "";
    const navigate = useNavigate();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const handleLogout = () => {
        localStorage.clear();
        setOpen(false);
        navigate("/login");
    };

    return (
        <div className="relative" ref={ref}>
            <button
                className="flex items-center gap-2 px-2 py-1 rounded-full border border-[#22C55E] bg-white hover:bg-[#F6F6F6] transition"
                onClick={() => setOpen((v) => !v)}
            >
                <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover border border-[#22C55E]" />
                <span className="font-bold text-[#17805C] px-2">{firstName}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                    <path d="M5 8l5 5 5-5" stroke="#17805C" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 text-sm text-gray-700">{email}</div>
                    <hr />
                    <button className="w-full text-left px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">Hồ sơ</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">Đổi mật khẩu</button>
                    <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#F6F6F6] text-[#222]" onClick={handleLogout}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="#E53935" strokeWidth="2" strokeLinecap="round" /></svg>
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminProfileMenu;
