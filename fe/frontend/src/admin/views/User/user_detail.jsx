import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from "../../../api/User.api.js";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(id, token);
                setUser(data.user || data);
            } catch (error) {
                setSnackbar({ open: true, message: 'Không thể tải thông tin người dùng', severity: 'error' });
            }
        };
        fetchUser();
    }, [id, token]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await deleteUser(id, token);
                setSnackbar({ open: true, message: 'Xóa thành công!', severity: 'success' });
                setTimeout(() => navigate('/admin/users'), 1000);
            } catch (error) {
                setSnackbar({ open: true, message: 'Xóa thất bại!', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    if (!user) return <Typography>Đang tải...</Typography>;

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>Chi tiết người dùng</Typography>
            <Typography variant="subtitle1"><strong>Tên:</strong> {user.name || user.username}</Typography>
            <Typography variant="subtitle1"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="subtitle1"><strong>Vai trò:</strong> {user.role}</Typography>
            {/* Thêm các trường khác nếu cần */}
            <Button variant="contained" color="secondary" onClick={() => navigate(`/admin/users/update/${id}`)} sx={{ mt: 2, mr: 2 }}>Sửa</Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, mr: 2 }}>Xóa</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/users')} sx={{ mt: 2 }}>Quay lại</Button>
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

export default UserDetail;
