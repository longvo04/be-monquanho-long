const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

class DatabaseConnection {
    static getMongoClient() {
        // Lấy thông tin từ biến môi trường
        const url = process.env.MONGO_URI;
        const { MongoClient } = require("mongodb");
        const client = new MongoClient(url);
        return client;
    }
}

module.exports = DatabaseConnection;
