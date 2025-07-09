export const API_BASE_URL =
  import.meta.env.VITE_ENV_MODE === "development"
    ? "http://localhost:3000"
    : import.meta.env.VITE_API_BASE_URL;

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  user: {
    id: string;
    userName: string;
    email: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

class ApiService {
  private async handleTokenRefresh() {
    try {
      const { token } = await this.refreshToken();
      localStorage.setItem("accessToken", token);
      return token;
    } catch (err) {
      throw new Error("Session expired. Please login again.");
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    const response = await fetch(url, config);

    if (response.status === 401 && endpoint !== "/auth/refresh-token") {
      if (endpoint === "/auth/login") {
        throw new Error("Invalid credentials");
      }
      const newToken = await this.handleTokenRefresh();

      return this.makeRequest<T>(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An error occurred",
      }));

      if (endpoint === "/auth/login" && response.status === 401) {
        throw new Error("Invalid credentials");
      }

      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async login(data: LoginData): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async logout(): Promise<void> {
    return this.makeRequest<void>("/auth/logout", {
      method: "POST",
    });
  }

  async refreshToken(): Promise<{ status: string; token: string }> {
    return this.makeRequest<{ status: string; token: string }>(
      "/auth/refresh-token",
      {
        method: "POST",
      }
    );
  }

  async getCurrentUser(): Promise<{ status: string; user: any }> {
    return this.authenticatedRequest<{ status: string; user: any }>("/auth/me");
  }

  async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("accessToken");

    return this.makeRequest<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }
}

export const apiService = new ApiService();
