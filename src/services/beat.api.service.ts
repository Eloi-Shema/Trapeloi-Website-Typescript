const API_BASE_URL = import.meta.env.VITE_BACKEND_HOST;

export interface IBeat {
  _id: string;
  title: string;
  producer: string;
  price: number;
  duration: number;
  genre: string[];
  bpm: number;
  key: string;
  description: string;
  tags: string[];
  lemonsqueezyId: string;
  previewAudioUrl: string;
  fullAudioKey: string;
  coverImageUrl: string;
  stemsZipKey: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  result: number;
  status: string;
}

class BeatApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    isFormData: boolean = false
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

    const config: RequestInit = {
      headers,
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An error occurred",
      }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  private async makeAuthenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    isFormData: boolean = false
  ): Promise<T> {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found. Please login first.");
    }

    // Add authorization header to existing options
    const authHeaders: HeadersInit = isFormData
      ? { Authorization: `Bearer ${token}` }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

    const authenticatedOptions: RequestInit = {
      ...options,
      headers: {
        ...authHeaders,
        ...(options.headers || {}),
      },
    };

    return this.makeRequest<T>(endpoint, authenticatedOptions, isFormData);
  }

  async getAllBeats(): Promise<IBeat[]> {
    const response = await this.makeRequest<ApiResponse<IBeat[]>>("/beats", {
      method: "GET",
    });
    return response.data;
  }

  async getBeatById(id: string): Promise<IBeat> {
    return this.makeRequest<IBeat>(`/beat/${id}`, {
      method: "GET",
    });
  }

  async generateDownloadUrl(
    beatId: string,
    fileType: "full" | "stems"
  ): Promise<string> {
    return this.makeAuthenticatedRequest<string>(
      `/beats/${beatId}/download?type=${fileType}`,
      { method: "GET" }
    );
  }
}

export const beatApiService = new BeatApiService();
