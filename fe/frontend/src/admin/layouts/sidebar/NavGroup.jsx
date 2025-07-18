import React, { useState } from "react";

const NavGroup = ({ label, icon, children }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="mb-2">
            <button
                className="flex items-center gap-2 px-4 py-2 w-full text-left font-semibold text-gray-800 hover:bg-[#F6F6F6] rounded-lg"
                onClick={() => setOpen((v) => !v)}
            >
                <span>{icon}</span>
                <span>{label}</span>
                <span className="ml-auto">{open ? "▼" : "►"}</span>
            </button>
            {open && <div className="pl-6">{children}</div>}
        </div>
    );
};

export default NavGroup;
