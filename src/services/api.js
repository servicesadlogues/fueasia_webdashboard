import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 30000,
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err.response?.data || err)
);

export const uploadDocuments = (formData, token) =>
  api.post(`/members/upload-documents?token=${encodeURIComponent(token)}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const registerMember = (data) => api.post('/members/register', data);

export const createPaymentOrder = (data) => api.post('/payments/create-order', data);

export const verifyPayment = (data) => api.post('/payments/verify', data);

export const listCoupons = () => api.get('/coupons');

export const validateCoupon = (code) => api.post('/coupons/validate', { code });

export const getCaptcha = () => api.get('/captcha');

export const verifyCaptcha = (data) => api.post('/captcha/verify', data);

export default api;
