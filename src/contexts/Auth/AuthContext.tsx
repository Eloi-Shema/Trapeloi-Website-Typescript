import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  apiService,
  AuthResponse,
  LoginData,
  RegisterData,
} from "../../services/auth.api.service";
import { useLocation, useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  userName: string;
  role: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
  googleAuthSuccess: () => Promise<void>;
  error: string | null;
  clearError: () => void;
  refreshToken: () => Promise<void>;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthLoading(true);
        const token = localStorage.getItem("accessToken");

        if (token) {
          const response = await apiService.getCurrentUser();

          if (response.user) {
            setUser(response.user);
          }
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const manageAuthResponse = (response: AuthResponse) => {
    setUser(response.user);
    setToken(response.token);

    localStorage.setItem("accessToken", response.token);
  };

  const login = async (data: LoginData): Promise<void> => {
    try {
      setAuthLoading(true);
      setError(null);

      const response = await apiService.login(data);
      manageAuthResponse(response);

      //Redirects to previous page before login
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setAuthLoading(true);
      setError(null);

      const response = await apiService.register(data);
      manageAuthResponse(response);

      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      setAuthLoading(true);
      await apiService.logout();

      setUser(null);
      setToken(null);

      localStorage.removeItem("accessToken");

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await apiService.refreshToken();
      setToken(response.token);

      localStorage.setItem("accessToken", response.token);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "https://trapeloi-backend.onrender.com/auth/google";
  };

  const googleAuthSuccess = async () => {
    //Prevent multiple simultaneous calls
    if (authLoading) {
      return;
    }
    try {
      setAuthLoading(true);
      // Verify the session with backend
      const response = await apiService.getCurrentUser();
      if (response.user) {
        setUser({
          ...response.user,
          profilePicture: response.user.profilePicture,
        });
      }
    } catch (err) {
      console.error("Google auth verification failed:", err);
      localStorage.removeItem("accessToken");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    token,
    setToken,
    login,
    register,
    logout,
    loginWithGoogle,
    googleAuthSuccess,
    error,
    clearError,
    refreshToken,
    authLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
