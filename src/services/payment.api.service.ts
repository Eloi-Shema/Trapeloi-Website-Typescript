import {
  CheckoutResponse,
  DownloadHistoryResponse,
  DownloadPageData,
  IPayment,
  RefreshLinksResponse,
} from "../types/payment.types";

// const API_BASE_URL = "https://trapeloi-backend.onrender.com";
const API_BASE_URL = "http://localhost:3000";

class PaymentApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const config: RequestInit = {
      headers,
      ...options,
      credentials: "include",
    };

    try {
      const response = await fetch(url, config);

      // Handle different response types
      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.error ||
          `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Request failed: ${error.message}`);
      }
      throw new Error("An unexpected error occurred");
    }
  }

  async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Authentication required. Please log in.");
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    return this.makeRequest<T>(endpoint, {
      ...options,
      headers,
    });
  }

  async createCheckout(beatId: string): Promise<CheckoutResponse> {
    return this.authenticatedRequest<CheckoutResponse>("/checkout/create", {
      method: "POST",
      body: JSON.stringify({ beatId }),
    });
  }

  async handleSuccessCallback(orderId: string, token: string): Promise<void> {
    const params = new URLSearchParams({ orderId, token });

    await this.makeRequest<void>(`/checkout/success?${params}`, {
      method: "GET",
    });
  }

  async getDownloadPageData(
    orderId: string,
    token: string
  ): Promise<DownloadPageData> {
    const params = new URLSearchParams({ token });

    return this.makeRequest<DownloadPageData>(
      `/download/${orderId}?${params}`,
      { method: "GET" }
    );
  }

  async downloadFile(
    orderId: string,
    fileType: "full" | "stems",
    token: string
  ): Promise<void> {
    const params = new URLSearchParams({ token });

    const url = `${API_BASE_URL}/download/${orderId}/file/${fileType}?${params}`;

    window.open(url, "_blank");
  }

  async refreshDownloadLinks(
    orderId: string,
    token: string
  ): Promise<RefreshLinksResponse> {
    return this.makeRequest<RefreshLinksResponse>(
      `/download/${orderId}/refresh?token=${token}`,
      { method: "POST" }
    );
  }

  async verifyPayment(
    orderId: string,
    token: string
  ): Promise<{ isValid: boolean; payment?: IPayment }> {
    const params = new URLSearchParams({ token });

    return this.makeRequest<{ isValid: boolean; payment?: IPayment }>(
      `/payment/verify?orderId=${orderId}&${params}`,
      {
        method: "GET",
      }
    );
  }

  async getDownloadHistory(
    orderId: string,
    token: string
  ): Promise<DownloadHistoryResponse> {
    const params = new URLSearchParams({ token });

    return this.makeRequest<DownloadHistoryResponse>(
      `/download/${orderId}/history?${params}`,
      {
        method: "GET",
      }
    );
  }

  async validatePaymentLink(orderId: string, token: string): Promise<boolean> {
    try {
      await this.getDownloadPageData(orderId, token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getRemainingDownloads(orderId: string, token: string): Promise<number> {
    try {
      const history = await this.getDownloadHistory(orderId, token);
      return history.data.downloadsRemaining;
    } catch (error) {
      throw new Error("Failed to get download information");
    }
  }

  async checkLinksExpiry(orderId: string, token: string): Promise<boolean> {
    try {
      const downloadPage = await this.getDownloadPageData(orderId, token);

      const testUrl = downloadPage.downloadUrls.fullAudio;
      const response = await fetch(testUrl, { method: "HEAD" });

      return !response.ok;
    } catch (error) {
      return true; // Assume expired if we can't check
    }
  }

  async autoRefreshLinks(
    orderId: string,
    token: string
  ): Promise<RefreshLinksResponse | null> {
    const areExpired = await this.checkLinksExpiry(orderId, token);

    if (areExpired) {
      return this.refreshDownloadLinks(orderId, token);
    }

    return null;
  }

  //Error handling
  isPaymentExpiredError(error: Error): boolean {
    return (
      error.message.includes("expired") || error.message.includes("not found")
    );
  }

  isDownloadLimitError(error: Error): boolean {
    return error.message.includes("limit exceeded");
  }

  isInvalidTokenError(error: Error): boolean {
    return (
      error.message.includes("Invalid") ||
      error.message.includes("unauthorized")
    );
  }
}

export const paymentApiService = new PaymentApiService();
