// src/socket.js
import { io } from "socket.io-client";

// ⚠️ Chỉnh đúng URL backend của bạn
const socket = io("http://localhost:5000", {
  transports: ["websocket"], // đảm bảo realtime mượt
  reconnectionAttempts: 5,
  timeout: 10000,
});

export default socket;
