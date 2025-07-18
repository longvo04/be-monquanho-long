import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, googleLogin } from "../../../api/User.api.js";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import MonQuaNhoImg from "../../assets/MonQuaNho.png";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Đảm bảo lấy đúng clientId từ biến môi trường

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        try {
            const result = await loginUser(form);
            // Lưu token và thông tin user vào localStorage
            localStorage.setItem("token", result.data[0].token);
            localStorage.setItem("role", result.data[0].role);
            localStorage.setItem("user_id", result.data[0]._id);
            localStorage.setItem("fullname", result.data[0].name);
            localStorage.setItem("phone", result.data[0].phone || ""); // thêm dòng này
            localStorage.setItem("verified", result.data[0].verified); // <-- thêm dòng này
            localStorage.setItem("token", result.data[0].token);
            if (result.data[0].role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
    };

    // Xử lý đăng nhập Google thành công
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const result = await googleLogin(credentialResponse.credential); // Gửi id_token lên backend
            localStorage.setItem("token", result.data[0].token);
            localStorage.setItem("fullname", result.data[0].name || "");
            localStorage.setItem("phone", result.data[0].phone || ""); // thêm dòng này
            localStorage.setItem("role", "user");

            navigate("/");
        } catch (err) {
            setError("Đăng nhập Google thất bại.");
        }
    };

    const handleGoogleError = () => {
        setError("Đăng nhập Google thất bại.");
    };


    return (
        <div className="min-h-screen flex" style={{ background: "#F6F6F6" }}>
            {/* Left: Login Form */}
            <div className="flex flex-1 items-center justify-center">
                <div
                    className="w-full max-w-[370px] bg-white rounded-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.07)] px-8 py-10"
                    style={{ minHeight: 500 }}
                >
                    <div className="mb-1 text-center text-[28px] font-bold" style={{ color: "#43B02A", fontFamily: "inherit" }}>
                        Món Quà Nhỏ
                    </div>
                    <div className="mb-6 text-center text-[18px] font-semibold" style={{ color: "#43B02A" }}>
                        Đăng nhập
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="email"
                            type="text"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                            placeholder="Tên đăng nhập hoặc Email"
                            style={{ color: "#222", fontSize: 16 }}
                        />
                        <div className="relative">
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-[8px] border border-[#D9D9D9] bg-white focus:outline-none focus:border-[#43B02A] text-base shadow-sm"
                                placeholder="Mật Khẩu"
                                style={{ color: "#222", fontSize: 16 }}
                            />
                            {/* Eye icon có thể thêm sau nếu muốn */}
                        </div>
                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        <button
                            type="submit"
                            className="w-full py-2 rounded-[8px] font-semibold text-base"
                            style={{
                                background: "#43B02A",
                                color: "#fff",
                                boxShadow: "0 2px 4px 0 rgba(67,176,42,0.10)"
                            }}
                        >
                            Đăng Nhập
                        </button>
                    </form>
                    <div className="flex justify-center gap-2 mt-4 mb-2">
                        <GoogleLogin
                            clientId={CLIENT_ID} // Đảm bảo clientId được truyền đúng từ biến môi trường
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            width="100%"
                            locale="vi"
                        />
                    </div>
                    <div className="text-center text-[15px] mt-2">
                        <span style={{ color: "#222" }}>Chưa có tài khoản? </span>
                        <Link to="/register" className="font-semibold" style={{ color: "#43B02A" }}>
                            Đăng ký ngay
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

export default Login;