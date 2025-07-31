import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CheckoutResponse,
  DownloadHistoryResponse,
  DownloadUrls,
  IPayment,
  VerifyPaymentResponse,
} from "../../types/payment.types";
import { paymentApiService } from "../../services/payment.api.service";

interface PaymentContextType {
  currentPayment: IPayment | null;
  downloadUrls: DownloadUrls | null;

  loading: boolean;
  error: string | null;

  isPaymentValid: boolean;
  verificationChecked: boolean;

  createCheckout: (beatId: string) => Promise<CheckoutResponse | null>;
  verifyPayment: (orderId: string, token: string) => Promise<boolean>;
  getDownloadPage: (orderId: string, token: string) => Promise<boolean>;
  downloadFile: (fileType: "full" | "stems") => Promise<void>;
  refreshDownloadLinks: () => Promise<boolean>;
  getDownloadHistory: () => Promise<DownloadHistoryResponse | null>;

  clearError: () => void;
  resetPaymentState: () => void;
  setCurrentPayment: (payment: IPayment | null) => void;

  getRemainingDownloads: () => number;
  isDownloadAvailable: (fileType: "full" | "stems") => boolean;
  isPaymentExpired: () => boolean;
  canDownload: () => boolean;
}

interface PaymentProviderProps {
  children: ReactNode;
  orderId?: string;
  token?: string;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
  orderId: initialOrderId,
  token: initialToken,
}) => {
  const [currentPayment, setCurrentPayment] = useState<IPayment | null>(null);
  const [downloadUrls, setDownloadUrls] = useState<DownloadUrls | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isPaymentValid, setIsPaymentValid] = useState<boolean>(false);
  const [verificationChecked, setVerificationChecked] =
    useState<boolean>(false);

  const [credentials, setCredentials] = useState<{
    orderId: string;
    token: string;
  } | null>(
    initialOrderId && initialToken
      ? { orderId: initialOrderId, token: initialToken }
      : null
  );

  const handleRequest = useCallback(
    async <T,>(
      requestFn: () => Promise<T>,
      successCallback?: (result: T) => void
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await requestFn();
        successCallback?.(result);

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Payment operation failed:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createCheckout = useCallback(
    async (beatId: string) => {
      return handleRequest(() => paymentApiService.createCheckout(beatId));
    },
    [handleRequest]
  );

  const verifyPayment = useCallback(
    async (orderId: string, token: string): Promise<boolean> => {
      const result = await handleRequest(
        () => paymentApiService.verifyPayment(orderId, token),
        (response: VerifyPaymentResponse) => {
          if (response.isValid && response.payment) {
            const completePayment: IPayment = {
              ...response.payment,
              downloadToken: response.payment.downloadToken,
              isCompleted: response.payment.isCompleted,
            };
            setCurrentPayment(completePayment);
            setCredentials({ orderId, token });
            setIsPaymentValid(true);
          } else {
            setIsPaymentValid(false);
          }
          setVerificationChecked(true);
        }
      );

      return result?.isValid || false;
    },
    [handleRequest]
  );

  const getDownloadPage = useCallback(
    async (orderId: string, token: string): Promise<boolean> => {
      const result = await handleRequest(
        () => paymentApiService.getDownloadPageData(orderId, token),
        (response) => {
          if (response.status === "success") {
            const payment: IPayment = {
              _id: "",
              orderId: response.orderId,
              customerEmail: response.customerEmail,
              amountPaid: response.amountPaid,
              paymentDate: response.paymentDate,
              downloadToken: token,
              downloadCount:
                response.maxDownloads - response.downloadsRemaining,
              maxDownloads: response.maxDownloads,
              beat: {
                _id: "",
                title: response.title,
                producer: response.producer,
                price: response.amountPaid,
                coverImageUrl: response.cover,
                duration: 0,
                genre: [],
                bpm: 0,
                key: "",
                description: "",
                tags: [],
                lemonsqueezyId: "",
                previewAudioUrl: "",
                fullAudioKey: "",
                stemsZipKey: "",
                isPublished: false,
                createdAt: "",
                updatedAt: "",
              },
              isCompleted: true,
              expiresAt: "",
              downloadIPs: [],
            };
            setCurrentPayment(payment);
            setDownloadUrls(response.downloadUrls);
            setCredentials({ orderId, token });
            setIsPaymentValid(true);
            setVerificationChecked(true);
          }
        }
      );

      return !!result;
    },
    [handleRequest]
  );

  const downloadFile = useCallback(
    async (fileType: "full" | "stems"): Promise<void> => {
      if (!credentials) {
        setError("No payment credentials available");
        return;
      }

      await handleRequest(
        () =>
          paymentApiService.downloadFile(
            credentials.orderId,
            fileType,
            credentials.token
          ),
        () => {
          if (currentPayment) {
            setCurrentPayment({
              ...currentPayment,
              downloadCount: currentPayment.downloadCount + 1,
            });
          }
        }
      );
    },
    [handleRequest, credentials, currentPayment]
  );

  const refreshDownloadLinks = useCallback(async (): Promise<boolean> => {
    if (!credentials) {
      setError("No payment credentials available");
      return false;
    }

    const result = await handleRequest(
      () =>
        paymentApiService.refreshDownloadLinks(
          credentials.orderId,
          credentials.token
        ),
      (response) => {
        if (response.status === "success") {
          setDownloadUrls(response.downloadUrls);
        }
      }
    );

    return !!result;
  }, [handleRequest, credentials]);

  const getDownloadHistory = useCallback(async () => {
    if (!credentials) {
      setError("No payment credentials available");
      return null;
    }

    return handleRequest(() =>
      paymentApiService.getDownloadHistory(
        credentials.orderId,
        credentials.token
      )
    );
  }, [handleRequest, credentials]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetPaymentState = useCallback(() => {
    setCurrentPayment(null);
    setDownloadUrls(null);
    setLoading(false);
    setError(null);
    setIsPaymentValid(false);
    setVerificationChecked(false);
    setCredentials(null);
  }, []);

  const getRemainingDownloads = useCallback((): number => {
    if (!currentPayment) return 0;
    return Math.max(
      0,
      currentPayment.maxDownloads - currentPayment.downloadCount
    );
  }, [currentPayment]);

  const isDownloadAvailable = useCallback(
    (fileType: "full" | "stems"): boolean => {
      if (!downloadUrls) return false;
      return fileType === "full"
        ? !!downloadUrls.fullAudio
        : !!downloadUrls.stems;
    },
    [downloadUrls]
  );

  const isPaymentExpired = useCallback((): boolean => {
    if (!currentPayment?.expiresAt) return false;
    return new Date(currentPayment.expiresAt) < new Date();
  }, [currentPayment]);

  const canDownload = useCallback((): boolean => {
    return (
      isPaymentValid &&
      !isPaymentExpired() &&
      getRemainingDownloads() > 0 &&
      !!downloadUrls
    );
  }, [isPaymentValid, isPaymentExpired, getRemainingDownloads, downloadUrls]);

  // Auto-verify payment on mount if credentials are provided
  useEffect(() => {
    if (initialOrderId && initialToken && !verificationChecked) {
      verifyPayment(initialOrderId, initialToken);
    }
  }, [initialOrderId, initialToken, verificationChecked, verifyPayment]);

  const value: PaymentContextType = {
    currentPayment,
    downloadUrls,
    loading,
    error,
    isPaymentValid,
    verificationChecked,
    createCheckout,
    verifyPayment,
    getDownloadPage,
    downloadFile,
    refreshDownloadLinks,
    getDownloadHistory,
    clearError,
    resetPaymentState,
    setCurrentPayment,
    getRemainingDownloads,
    isDownloadAvailable,
    isPaymentExpired,
    canDownload,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
