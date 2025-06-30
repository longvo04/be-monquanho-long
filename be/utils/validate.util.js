const ObjectId = require("mongoose").Types.ObjectId;

// Kiểm tra xem id có phải là ObjectId hợp lệ hay không
const validateId = (id) => {
  return ObjectId.isValid(id);
}

module.exports = {
  validateId
};
