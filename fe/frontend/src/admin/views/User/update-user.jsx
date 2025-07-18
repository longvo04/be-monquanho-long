import React, { useEffect, useState } from "react";
import {
    Typography, Box, TextField, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { getUserById, updateUser } from "../../../api/User.api.js";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", role: "user" });
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(id, token);
                const user = data.user || data;
                setForm({
                    name: user.name || user.username || "",
                    email: user.email || "",
                    role: user.role || "user",
                });
            } catch (err) {
                setSnackbar({ open: true, message: "Không thể tải thông tin người dùng", severity: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSnackbar({ open: false, message: '', severity: 'success' });
        try {
            await updateUser(id, form, token);
            setSnackbar({ open: true, message: "Cập nhật thành công!", severity: 'success' });
            setTimeout(() => navigate(`/admin/users/${id}`), 1000);
        } catch (err) {
            setSnackbar({ open: true, message: "Cập nhật thất bại!", severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (loading) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Cập nhật người dùng</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Tên"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="role-label">Vai trò</InputLabel>
                    <Select
                        labelId="role-label"
                        name="role"
                        value={form.role}
                        label="Vai trò"
                        onChange={handleChange}
                    >
                        <MenuItem value="user">Người dùng</MenuItem>
                        <MenuItem value="admin">Quản trị viên</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>Cập nhật</Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>Quay lại</Button>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdateUser;
