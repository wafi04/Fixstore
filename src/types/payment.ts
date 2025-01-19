export interface PaymentResponse {
  status: string;
  data: {
    token: string;
    redirect_url: string;
  };
}

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: PaymentResponse) => void;
          onPending: (result: PaymentResponse) => void;
          onError: (result: PaymentResponse) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

export interface CartProcessedProps {
  total: number;
  customerDetails?: {
    name: string;
    email: string;
    phone: string;
  };
}
