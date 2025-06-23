// Middleware kiểm tra quyền (role)
function checkRole(requiredRole) {
    return (req, res, next) => {
        if (!req.userData || !req.userData.user) {
            return res.status(403).json({
                error: 403,
                error_text: "Không xác định được người dùng!",
                data_name: "Xác thực",
                data: []
            });
        }
        const { role } = req.userData.user;
        if (role !== requiredRole) {
            return res.status(403).json({
                error: 403,
                error_text: `Bạn cần quyền ${requiredRole} để truy cập!`,
                data_name: "Xác thực",
                data: []
            });
        }
        next();
    };
}

// Middleware kiểm tra nhiều quyền (multi-role)
function checkMultiRole(allowedRoles = []) {
    return (req, res, next) => {
        if (!req.userData || !req.userData.user) {
            return res.status(403).json({
                error: 403,
                error_text: "Không xác định được người dùng!",
                data_name: "Xác thực",
                data: []
            });
        }
        const userRole = req.userData.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                error: 403,
                error_text: `Bạn cần quyền: ${allowedRoles.join(" hoặc ")} để truy cập!`,
                data_name: "Xác thực",
                data: []
            });
        }
        next();
    };
}

// Middleware kiểm tra quyền admin (dễ import riêng)
function checkAdmin(req, res, next) {
    if (!req.userData || !req.userData.user || req.userData.user.role !== "admin") {
        return res.status(403).json({
            error: 403,
            error_text: "Không có quyền Admin để truy cập!",
            data_name: "Xác thực",
            data: []
        });
    }
    next();
}

module.exports = checkRole;
module.exports.checkMultiRole = checkMultiRole;
module.exports.checkAdmin = checkAdmin;