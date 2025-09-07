export enum AppView {
  REGISTRATION = 'REGISTRATION',
  DASHBOARD = 'DASHBOARD',
  CROP_DETAIL = 'CROP_DETAIL',
  PAYMENT_FLOW = 'PAYMENT_FLOW',
  PROFILE = 'PROFILE',
}

export interface User {
  name: string;
  contactNumber: string;
  gstId: string;
  bankAccountNumber: string;
  ifsc: string;
  upiId: string;
  registeredDate: string;
  walletBalance: number;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export type SellerCategory = 'Farmer' | 'Wholesaler' | 'Cooperative';

export interface Crop {
  id: string;
  name: string;
  stockKg: number;
  pricePerKg: number;
  sellerName: string;
  rating: number;
  description: string;
  imageUrl: string;
  isOrganic?: boolean;
  isSeasonal?: boolean;
  sellerCategory?: SellerCategory;
  reviews?: Review[];
}

export enum OrderStatus {
  BLOCKED = 'Blocked',
  INSTALLMENT_PAID = 'Installment Paid',
  FULLY_PAID = 'Fully Paid',
  DELIVERED = 'Delivered',
}

export interface Order {
  id: string;
  cropName: string;
  sellerName: string;
  totalAmount: number;
  status: OrderStatus;
  date: string;
  review?: {
    rating: number;
    comment: string;
  };
}