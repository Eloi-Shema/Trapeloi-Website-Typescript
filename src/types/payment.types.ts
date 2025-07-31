import { IBeat } from "../services/beat.api.service";

export interface IPayment {
  _id: string;
  orderId: string;
  beat: IBeat;
  customerEmail: string;
  amountPaid: number;
  paymentDate: string;
  downloadToken: string;
  isCompleted: boolean;
  downloadCount: number;
  maxDownloads: number;
  expiresAt: string;
  lastDownloadAt?: string;
  downloadIPs: string[];
}

export interface DownloadUrls {
  fullAudio: string;
  stems: string;
}

export interface VerifyPaymentResponse {
  isValid: boolean;
  payment?: IPayment;
}

export interface DownloadPageData {
  status: string;
  orderId: string;
  title: string;
  producer: string;
  cover: string;
  amountPaid: number;
  paymentDate: string;
  downloadUrls: DownloadUrls;
  customerEmail: string;
  downloadsRemaining: number;
  maxDownloads: number;
}

export interface CheckoutResponse {
  status: string;
  checkoutUrl: string;
  beatDetails: IBeat;
}

export interface RefreshLinksResponse {
  status: string;
  downloadUrls: DownloadUrls;
  downloadsRemaining: number;
}

export interface DownloadHistoryResponse {
  status: string;
  data: {
    orderId: string;
    totalDownloads: number;
    maxDownloads: number;
    downloadsRemaining: number;
    lastDownloadAt?: string;
    expiresAt: string;
  };
}

export interface SuspiciousActivityResponse {
  status: string;
  data: Array<{
    orderId: string;
    beat: {
      title: string;
      producer: string;
    };
    downloadCount: number;
    maxDownloads: number;
    uniqueIPs: number;
    lastDownloadAt?: string;
    customerEmail: string;
  }>;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}
