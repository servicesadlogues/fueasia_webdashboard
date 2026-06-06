import { useCallback } from 'react';

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const useRazorpay = () => {
  const openPayment = useCallback(async ({ orderId, amount, currency, keyId, name, email, mobile, onSuccess, onFailure }) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      onFailure('Failed to load payment gateway. Please check your connection.');
      return;
    }

    const options = {
      key: keyId,
      amount,
      currency,
      name: 'FUE Global',
      description: 'Membership Registration',
      order_id: orderId,
      prefill: { name, email, contact: mobile },
      theme: { color: '#F07800' },
      handler: (response) => {
        onSuccess({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => onFailure('Payment was cancelled.'),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }, []);

  return { openPayment };
};

export default useRazorpay;
