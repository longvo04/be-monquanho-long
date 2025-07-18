import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./header/AdminHeader";
import AdminSidebar from "./sidebar/AdminSidebar";
import AdminFooter from "./footer/AdminFooter";

const AdminLayout = () => (
    <div className="min-h-screen flex flex-col bg-[#F6F6F6]">
        <AdminHeader />
        <div className="flex flex-1">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
        <AdminFooter />
    </div>
);

export default AdminLayout;