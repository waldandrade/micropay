export type PaymentDTO = {
  id: string;
  amount: number;
  currency: string;
  customerId: string;
  metadata?: Record<string, any>;
};

export type PaymentResult = {
  success: boolean;
  legacyId?: string;
  raw?: any;
};
