import CryptoJS from 'crypto-js';
const cryptkey = 'p6u6wJIPl52IZckMoSFF+k331lO1qzpaPECathNx7uw6lpHujZ7D3OsusIR8jvvM';
const Crypto = {
  encodeByAES256: data => {
    const encrypted = CryptoJS.AES.encrypt(data, cryptkey).toString();
    return encrypted;
  },

  decodeByAES256: data => {
    const decrypted_bytes = CryptoJS.AES.decrypt(data, cryptkey);
    const decrypted = decrypted_bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  },
};

export default Crypto;
