import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MonQuaNhoImg from "../../assets/MonQuaNho.png";
import { registerUser } from "../../../api/User.api.js"; // Sử dụng API để đăng ký

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "" // Thêm trường số điện thoại
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }
        try {
            const userData = {
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone // Gửi số điện thoại lên backend
            };
            await registerUser(userData); // Gửi dữ liệu đăng ký lên backend
            setSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError("Đăng ký thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: "#F6F6F6" }}>
            {/* Left: Register Form */}
            <div className="flex flex-1 items-center justify-center">
                <div
                    className="w-full max-w-[370px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.07)] px-8 py-10"
                    style={{ minHeight: 540 }}
                >
                    <div className="mb-1 text-center text-[28px] font-bold" style={{ color: "#43B02A", fontFamily: "inherit" }}>
                        Món Quà Nhỏ
                    </div>
                    <div className="mb-6 text-center text-[18px] font-semibold" style={{ color: "#43B02A" }}>
                        Đăng ký tài khoản
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                            placeholder="Họ và tên"
                            style={{ color: "#222", fontSize: 16 }}
                        />
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                            placeholder="Email"
                            style={{ color: "#222", fontSize: 16 }}
                        />
                        <input
                            name="phone"
                            type="text"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                            placeholder="Số điện thoại (tùy chọn)"
                            style={{ color: "#222", fontSize: 16 }}
                        />
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                            placeholder="Mật khẩu"
                            style={{ color: "#222", fontSize: 16 }}
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                            placeholder="Nhập lại mật khẩu"
                            style={{ color: "#222", fontSize: 16 }}
                        />
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-[8px] font-semibold text-base"
                            style={{
                                background: "#43B02A",
                                color: "#fff",
                                boxShadow: "0 2px 4px 0 rgba(67,176,42,0.10)"
                            }}
                        >
                            Đăng ký
                        </button>
                    </form>
                    <div className="text-center text-[15px] mt-2">
                        <span style={{ color: "#222" }}>Đã có tài khoản? </span>
                        <Link to="/login" className="font-semibold" style={{ color: "#43B02A" }}>
                            Đăng nhập
                        </Link>
                    </div>
                    <div className="text-center mt-2">
                        <Link to="/" className="text-[15px]" style={{ color: "#43B02A" }}>
                            Trở về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
            {/* Right: Illustration */}
            <div
                className="hidden md:flex flex-1 flex-col items-center justify-center"
                style={{ background: "#DDF3E4" }}
            >
                <img
                    src={MonQuaNhoImg}
                    alt="MonQuaNho"
                    className="w-[320px] h-auto object-contain mb-4"
                    draggable={false}
                />
            </div>
        </div>
    );
};

export default Register;
