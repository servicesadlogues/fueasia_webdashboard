import http, {
  MEMBER_TOKEN_KEY,
  MEMBER_REFRESH_KEY,
  persistMemberSession,
  clearMemberSession,
} from './http';

export {
  MEMBER_TOKEN_KEY,
  MEMBER_REFRESH_KEY,
  persistMemberSession,
  clearMemberSession,
};

export const uploadDocuments = (formData, token) =>
  http.post(`/members/upload-documents?token=${encodeURIComponent(token)}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const createPaymentOrder = (data) => http.post('/payments/create-order', data);

export const verifyPayment = (data) => http.post('/payments/verify', data);

export const validateCoupon = (code) =>
  http.post('/coupons/validate', { code }, { skipErrorToast: true });

export const getCaptcha = () => http.get('/captcha', { skipLoader: true });

export const verifyCaptcha = (data) => http.post('/captcha/verify', data);

export const requestMemberOtp = (membershipId) =>
  http.post('/auth/request-otp', { membershipId }, { skipErrorToast: true });

export const verifyMemberOtp = (membershipId, otp) =>
  http.post('/auth/verify-otp', { membershipId, otp }, { skipErrorToast: true });

export const logoutMember = (refreshToken) =>
  http.post('/auth/logout', { refreshToken }, { silent: true, skipErrorToast: true });

export const getMemberMe = () => http.get('/auth/me', { silent: true, skipErrorToast: true });

export const getDashboardProfile = () => http.get('/members/me');

export const getDashboardPayments = () =>
  http.get('/members/me/payments', { skipErrorToast: true });

export const getDashboardDocuments = () =>
  http.get('/members/me/documents', { skipErrorToast: true });

export default http;
