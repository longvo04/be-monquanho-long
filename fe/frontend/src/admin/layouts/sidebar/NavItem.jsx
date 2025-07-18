import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";

const NavItem = ({ to, icon, label }) => (
    <SidebarMenuItem to={to} icon={icon} label={label} />
);

export default NavItem;
