import React, { useEffect, useState } from 'react';
import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from "../../../api/User.api.js";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        const fetchUsers = async () => {
            try {
                const data = await getUsers(token);
                setUsers(data.data || []); // Sửa ở đây: lấy đúng mảng user từ API
            } catch (error) {
                setSnackbar({ open: true, message: 'Không thể tải danh sách người dùng', severity: 'error' });
            }
        };
        fetchUsers();
    }, [token, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await deleteUser(id, token);
                setUsers(users.filter((u) => u._id !== id));
                setSnackbar({ open: true, message: 'Xóa thành công!', severity: 'success' });
            } catch (error) {
                setSnackbar({ open: true, message: 'Xóa thất bại!', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    return (
        <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>Danh sách người dùng</Typography>
            <Box sx={{ overflow: 'auto', width: '100%' }}>
                <Table aria-label="bảng người dùng" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            {['STT', 'Tên', 'Email', 'Vai trò', 'Hành động'].map((header, idx) => (
                                <TableCell key={idx}>
                                    <Typography variant="subtitle2" fontWeight={600}>{header}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.length > 0 ? (
                            users.map((user, idx) => (
                                <TableRow key={user._id}>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{idx + 1}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{user.name || user.username}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{user.email}</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{user.role}</Typography></TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="primary" size="small" onClick={() => navigate(`/admin/users/${user._id}`)} sx={{ mr: 1 }}>Xem</Button>
                                        <Button variant="outlined" color="secondary" size="small" onClick={() => navigate(`/admin/users/update/${user._id}`)} sx={{ mr: 1 }}>Sửa</Button>
                                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(user._id)}>Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="subtitle1">Không có người dùng nào.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
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

export default UsersList;
