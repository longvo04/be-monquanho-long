const mongoose = require('mongoose');

function checkOwnership({ model, idParam = 'id', ownerField = 'user_id', allowAdmin = true }) {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[idParam] || req.body[idParam];
      const userId = req.userData.user._id;

      if (!mongoose.Types.ObjectId.isValid(resourceId)) {
        return res.status(403).json({
          error: 403,
          error_text: `ID tài nguyên không hợp lệ: ${resourceId}`,
          data_name: "Xác thực",
          data: []
      });
      }

      const resource = await model.findById(resourceId);
      if (!resource) {
        return res.status(404).json({
          error: 404,
          error_text: `Tài nguyên không tồn tại`,
          data_name: "Xác thực",
          data: []
        });
      }

      const ownerId = resource[ownerField]?.toString();

      const isOwner = ownerId === userId.toString();
      const isAdmin = req.userData.user?.role === 'admin';

      if (!isOwner && (!allowAdmin || !isAdmin)) {
        return res.status(403).json({
          error: 403,
          error_text: `Bạn không có quyền truy cập tài nguyên này`,
          data_name: "Xác thực",
          data: []
      });
      }

      req.resource = resource;
      next();
    } catch (err) {
      res.status(500).json({
        error: 500,
        error_text: `Bạn cần quyền ${requiredRole} để truy cập!`,
        data_name: "Server error",
        data: []
    });
    }
  };
}

module.exports = checkOwnership;
