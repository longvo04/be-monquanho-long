import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const createConversation = async (userId, receiverId, itemId) => {
  const res = await axios.post(`${API}/messenger/conversations`, {
    user_id: userId,
    receiver_id: receiverId,
    item_id: itemId,
  });
  return res.data;
};
export const getProductById = async (productId) => {
  return await axios.get(`${API}/products/${productId}`);
};
export const getMessages = async (conversationId) => {
  const res = await axios.get(`${API}/messenger/messages/${conversationId}`);
  return res.data; // response dạng: { error: 0, data: [...] }
};

export const sendMessage = async (conversationId, senderId, content) => {
  const res = await axios.post(`${API}/messenger/messages`, {
    conversation_id: conversationId,
    sender_id: senderId,
    content,
  });
  return res.data;
};

export const getConversationsByUserId = async (userId) => {
  const res = await axios.get(`${API}/messenger/conversations/${userId}`);
  return res.data;
};
