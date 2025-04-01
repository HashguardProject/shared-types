import { UserPlan } from './user.types';

import { SubscriptionStatus } from './user.types';

// Billing types
export type BillingCycle = 'monthly' | 'yearly';

// Payment types
export interface PaymentMethod {
  id: string;
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  type: 'card' | 'bank' | 'crypto';
}

// Subscription types
export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: SubscriptionStatus;
  plan: UserPlan;
  billingCycle: BillingCycle;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  amount: number;
  currency: string;
  paymentMethodId?: string;
  paymentMethodType?: string;
  lastPaymentError?: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  active: boolean;
  storageLimit: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionResponse {
  subscription: Subscription | null;
  isActive: boolean;
  currentPlan: UserPlan;
  trialEndsAt?: string;
  renewsAt?: string;
  canceledAt?: string;
  paymentMethod?: PaymentMethod;
}

// Checkout types
export interface CheckoutSessionRequest {
  plan: UserPlan;
  billingCycle: BillingCycle;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

// Billing history types
export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
  hostedInvoiceUrl?: string;
  pdfUrl?: string;
}

export interface BillingHistoryResponse {
  invoices: Invoice[];
  hasMore: boolean;
}

export interface WebhookEvent {
  stripeEventId: string;
  type: string;
  processedAt: string;
  metadata?: Record<string, any>;
}
