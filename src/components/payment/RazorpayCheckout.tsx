import { useEffect, useRef } from 'react';
import { paymentService } from '@/services/paymentService';
import { toast } from '@/utils/toast';

// Declare Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  orderIntentId: string;
  amount: number;
  idempotencyKey: string;
  razorpayKeyId: string;
  razorpayOrderId: string;
  onSuccess: (orderNumber: string, paymentId: string) => void;
  onError: (error: string) => void;
}

export const RazorpayCheckout = ({
  orderIntentId,
  amount,
  idempotencyKey,
  razorpayKeyId,
  razorpayOrderId,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) => {
  const razorpayLoaded = useRef(false);

  // Load Razorpay script
  useEffect(() => {
    if (razorpayLoaded.current || window.Razorpay) {
      openRazorpayCheckout();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      razorpayLoaded.current = true;
      openRazorpayCheckout();
    };
    script.onerror = () => {
      toast.error('Failed to load payment gateway. Please refresh and try again.');
      onError('Script load failed');
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup if component unmounts before script loads
    };
  }, []);

  const openRazorpayCheckout = () => {
    if (!window.Razorpay) {
      toast.error('Payment gateway not loaded. Please try again.');
      onError('Razorpay not available');
      return;
    }

    // Check if test mode (test keys start with "rzp_test_")
    const isTestMode = razorpayKeyId.startsWith('rzp_test_');
    
    const options = {
      key: razorpayKeyId,
      amount: Math.round(amount * 100), // Amount in paise
      currency: 'INR',
      name: 'The Nail Artistry',
      description: isTestMode ? `[TEST MODE] Order Intent` : `Order Intent`,
      order_id: razorpayOrderId,
      handler: async function (response: any) {
        // Payment successful - verify on backend
        try {
          const verifyResponse = await paymentService.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderIntentId,
          });

          if (verifyResponse.success) {
            // Check if order was created by webhook
            if (verifyResponse.data.orderNumber) {
              toast.success('Payment successful!');
              onSuccess(verifyResponse.data.orderNumber, response.razorpay_payment_id);
            } else {
              // Webhook might be delayed, poll for order
              toast.success('Payment verified! Processing order...');
              // Poll for order creation (webhook might be delayed)
              pollForOrder(orderIntentId, response.razorpay_payment_id);
            }
          } else {
            toast.error('Payment verification failed');
            onError('Verification failed');
          }
        } catch (error: any) {
          console.error('Payment verification error:', error);
          toast.error(error.response?.data?.message || 'Payment verification failed');
          onError('Verification error');
        }
      },
      prefill: {
        // Pre-fill customer details if available
      },
      notes: {
        orderIntentId,
        idempotencyKey,
      },
      theme: {
        color: '#DD2C6C', // Brand color
      },
      modal: {
        ondismiss: function () {
          // User closed the modal without payment
          // Mark OrderIntent as expired (will be handled by backend expiration)
          onError('Payment cancelled');
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', function (response: any) {
      toast.error(response.error.description || 'Payment failed');
      onError(response.error.description || 'Payment failed');
    });

    razorpay.open();
  };

  // Poll for order creation (webhook might be delayed)
  const pollForOrder = async (intentId: string, paymentId: string, retries = 10) => {
    for (let i = 0; i < retries; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      try {
        const verifyResponse = await paymentService.verifyPayment({
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: '', // Not needed for status check (polling)
          orderIntentId: intentId,
        });

        if (verifyResponse.success && verifyResponse.data.orderNumber) {
          toast.success('Order created successfully!');
          onSuccess(verifyResponse.data.orderNumber, paymentId);
          return;
        }
        
        // If status is still processing, continue polling
        if (verifyResponse.success && verifyResponse.data.status === 'processing') {
          continue;
        }
      } catch (error: any) {
        // If it's a 400 error and not the first retry, stop polling
        // (might be a real error, not just "order not ready yet")
        if (error.response?.status === 400 && i > 2) {
          console.error('Polling stopped due to error:', error);
          break;
        }
        // Continue polling for other errors (network issues, etc.)
      }
    }
    
    // If polling fails, still show success but user needs to check order
    toast.warning('Payment successful! Order is being processed. Please check your orders.');
    onError('Order creation delayed');
  };

  return null; // This component doesn't render anything
};

