/**
 * Gửi mã xác thực SMS qua Twilio Verify Service
 * @param {string} phone - Số điện thoại người dùng (định dạng quốc tế, ví dụ: +84123456789)
 * @returns {Promise} - Trả về Promise chứa kết quả gửi mã
 */

const twilio = require('twilio');

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_SERVICE_ID = process.env.TWILIO_SERVICE_ID || '';

const twilioVerifyClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const sendVerificationCode = async (phone) => {
  try {
    const response = await twilioVerifyClient.verify.v2.services(TWILIO_SERVICE_ID)
        .verifications.create({ to: phone, channel: 'sms' })
    return response;
  } catch (error) {
    console.error('Lỗi khi gửi mã xác thực:', error.message);
    throw new Error('Lỗi khi gửi mã xác thực: ' + error.message);
  }
}

const checkVerificationCode = async (phone, code) => {
  try {
    const response = await twilioVerifyClient.verify.v2.services(TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: phone, code });
    return response;
  } catch (error) {
    console.error('Lỗi khi xác thực mã:', error.message);
    throw new Error('Lỗi khi xác thực mã: ' + error.message);
  }
}

module.exports = {
  sendVerificationCode,
  checkVerificationCode
};