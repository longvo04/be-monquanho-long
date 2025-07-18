import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Homeadmin from "../views/Homeadmin";
import UsersList from "../views/User/users_list";
import UserDetail from "../views/User/user_detail";
import UpdateUser from "../views/User/update-user";



// Dummy pages for example (replace with real admin pages)
const Orders = () => <div>Quản lý đơn hàng</div>;
const Settings = () => <div>Cài đặt hệ thống</div>;
const NotFound = () => <div>404 - Không tìm thấy trang</div>;

const Routeradmin = () => (
    <Routes>
        {/* Redirect /admin sang /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Homeadmin />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/users/:id" element={<UserDetail />} />
            <Route path="/admin/users/update/:id" element={<UpdateUser />} />
         
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
);

export default Routeradmin;

