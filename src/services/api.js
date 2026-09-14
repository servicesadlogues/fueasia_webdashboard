import http, { memberTokenStore } from './http';
import { localLoader } from './httpFeedback';

export const uploadDocuments = (formData, token) =>
  http.post('/members/upload-documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-session-token': token,
    },
    ...localLoader,
  });

export const createPaymentOrder = (data) =>
  http.post('/payments/create-order', data, localLoader);

export const verifyPayment = (data) =>
  http.post('/payments/verify', data, localLoader);

export const validateCoupon = (code) =>
  http.post('/coupons/validate', { code }, { skipErrorToast: true, ...localLoader });

export const getCaptcha = () => http.get('/captcha', localLoader);

export const verifyCaptcha = (data) =>
  http.post('/captcha/verify', data, localLoader);

export const requestMemberOtp = (membershipId) =>
  http.post('/auth/request-otp', { membershipId }, { skipErrorToast: true, ...localLoader });

export const verifyMemberOtp = (membershipId, otp) =>
  http.post('/auth/verify-otp', { membershipId, otp }, { skipErrorToast: true, ...localLoader });

export const logoutMember = () =>
  http
    .post('/auth/logout', { refreshToken: memberTokenStore.getRefresh() }, { silent: true, skipErrorToast: true })
    .finally(() => memberTokenStore.clear());

export const getMemberMe = () => http.get('/auth/me', { silent: true, skipErrorToast: true });

export const getDashboardProfile = () => http.get('/members/me', localLoader);

export const updateMemberProfile = (data) => {
  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
  return http.patch('/members/me', data, isFormData
    ? { headers: { 'Content-Type': 'multipart/form-data' }, ...localLoader }
    : localLoader);
};

export const getDashboardPayments = () =>
  http.get('/members/me/payments', { skipErrorToast: true, ...localLoader });

export const getDashboardDocuments = () =>
  http.get('/members/me/documents', { skipErrorToast: true, ...localLoader });

export const deleteMemberDocument = (key) =>
  http.delete(`/members/me/documents/${encodeURIComponent(key)}`, localLoader);

export const listMemberEvents = () =>
  http.get('/members/me/events', { skipErrorToast: true, ...localLoader });

export const getMemberEvent = (id) =>
  http.get(`/members/me/events/${id}`, { skipErrorToast: true, ...localLoader });

export const uploadSpeakerDocuments = (formData, token) =>
  http.post('/speakers/upload-documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-session-token': token,
    },
    ...localLoader,
  });

export const submitSpeakerRegistration = (data) =>
  http.post('/speakers/submit', data, localLoader);
