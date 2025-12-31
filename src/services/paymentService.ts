import apiClient from '@/api/client';

export interface CreateRazorpayOrderRequest {
  orderIntentId: string;
  amount: number;
  paymentMethod?: 'upi' | 'card' | 'netbanking';
  idempotencyKey?: string;
}

export interface CreateRazorpayOrderResponse {
  success: boolean;
  data: {
    idempotencyKey: string;
    razorpayOrderId: string;
    razorpayKeyId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    orderIntentId: string;
    retryCount: number;
    isTestMode?: boolean;
  };
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderIntentId?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  data: {
    orderIntentId: string;
    orderId?: string;
    orderNumber?: string;
    paymentId: string;
    status: 'completed' | 'processing';
    note?: string;
  };
}

export interface PaymentStatusResponse {
  success: boolean;
  data: {
    idempotencyKey: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    orderId: string;
    orderNumber: string;
    amount: number;
    paymentMethod: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    errorMessage?: string;
    retryCount: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const paymentService = {
  /**
   * Create Razorpay order
   */
  async createOrder(data: CreateRazorpayOrderRequest): Promise<CreateRazorpayOrderResponse> {
    const response = await apiClient.post<CreateRazorpayOrderResponse>('/v1/payments/create-order', data);
    return response.data;
  },

  /**
   * Verify Razorpay payment
   */
  async verifyPayment(data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    const response = await apiClient.post<VerifyPaymentResponse>('/v1/payments/verify', data);
    return response.data;
  },

  /**
   * Get payment status by idempotency key
   */
  async getPaymentStatus(idempotencyKey: string): Promise<PaymentStatusResponse> {
    const response = await apiClient.get<PaymentStatusResponse>(
      `/v1/payments/status/${idempotencyKey}`
    );
    return response.data;
  },
};

