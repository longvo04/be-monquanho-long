import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaFileAlt, FaClock, FaCog, FaSignOutAlt } from "react-icons/fa";

// Logo SVG
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 24C8 24 8 16 16 8C24 16 24 24 24 24H8Z" fill="#4CAF50" />
    <rect x="6" y="26" width="20" height="2" rx="1" fill="#222" />
  </svg>
);

const navLinks = [
  { to: "/", label: "Trang chủ" },
  { to: "/products", label: "Khám Phá" },
  { to: "/programs", label: "Chương trình" },
  { to: "/community", label: "Cộng đồng" },
  { to: "/roadmap", label: "Roadmap" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const fullname = localStorage.getItem("fullname");
  const userInitial = fullname
    ? fullname.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "TD";

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#EEF8F1] border-b border-[#EEF8F1] z-50">
      <div className="max-w-[1440px] mx-auto flex items-center h-[60px] px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-[140px]">
          <Logo />
          <span className="text-[18px] sm:text-[20px] lg:text-[22px] font-semibold text-[#4CAF50] ml-1">
            Món Quà Nhỏ
          </span>
        </Link>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="sm:hidden ml-auto p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="#4CAF50" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation (tablet & desktop) */}
        <nav className="hidden sm:flex flex-1 ml-6">
          <ul className="flex gap-2">
            {navLinks.map((link, idx) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      "px-4 py-2 rounded-md font-semibold text-[14px] lg:text-[16px] transition",
                      isActive
                        ? "bg-[#D6F5E3] text-[#222] shadow"
                        : "text-[#22C55E] hover:bg-[#D6F5E3] hover:text-[#222]"
                    ].join(" ")
                  }
                  end={idx === 0}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Đăng tin (tablet & desktop) */}
        <Link
          to="/post-gift"
          className="hidden sm:flex ml-4 px-4 py-2 rounded-md bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition"
        >
          <span className="text-xl">+</span>
          <span className="ml-1 hidden lg:inline">Đăng tin</span>
        </Link>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-4 ml-4 relative">
          {fullname && (
            <>
              <button className="p-2 rounded-full hover:bg-[#D6F5E3] transition" title="Thông báo">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#222" strokeWidth="2">
                  <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3C7.7 6.2 6 8.4 6 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </button>
              <Link to="/messenger" className="p-2 rounded-full hover:bg-[#D6F5E3] transition" title="Tin nhắn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" />
                  <path d="M7 15l4-4 3 3 4-4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </>
          )}

          {/* User Avatar */}
          {fullname ? (
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-full border border-[#4CAF50] bg-white hover:bg-[#D6F5E3] transition"
                onClick={() => setMenuOpen(v => !v)}
              >
                <span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[#222] bg-white text-[16px] border border-[#4CAF50]">
                  {userInitial}
                </span>
                <span className="font-bold text-[#388E3C] px-2">{fullname.split(" ")[0]}</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                  <path d="M5 8l5 5 5-5" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">
                    <FaUser className="text-lg" /> Hồ sơ cá nhân
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">
                    <FaFileAlt className="text-lg" /> Tin đã đăng
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">
                    <FaClock className="text-lg" /> Lịch sử cho nhận
                  </Link>
                  <Link to="/profile/setting" className="flex items-center gap-2 px-4 py-2 hover:bg-[#F6F6F6] text-[#222]">
                    <FaCog className="text-lg" /> Cài đặt
                  </Link>
                  <div className="flex items-center px-4 py-2 hover:bg-[#F6F6F6] cursor-pointer">
                    <span className="font-bold text-[#388E3C] mr-1">VN</span>
                    <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                      <path d="M5 8l5 5 5-5" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-[#F6F6F6] text-[#222]"
                  >
                    <FaSignOutAlt className="text-lg" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <button
                  onClick={() => {
                    navigate(link.to);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[#22C55E] bg-white border rounded-md shadow"
                >
                  {link.label}
                </button>
              </li>
            ))}
            {fullname ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-[#DC2626] bg-white border rounded-md shadow"
                >
                  Đăng xuất
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-[#4CAF50] bg-white border rounded-md shadow"
                >
                  Đăng nhập
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

    </header>
  );
}
