import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../utils/Loading/Loading";
import { useAuth } from "../../contexts/Auth/AuthContext";

const AuthSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { googleAuthSuccess } = useAuth();

  const processed = useRef(false); //this prevents multiple executions

  useEffect(() => {
    const verifyGoogleAuth = async () => {
      if (processed.current) {
        return;
      }

      if (token) {
        try {
          localStorage.setItem("accessToken", token);
          await googleAuthSuccess();
          navigate("/", { replace: true });
        } catch (error) {
          navigate("/login", { replace: true });
        }
      } else {
        navigate("/login", { replace: true });
      }
    };
    verifyGoogleAuth();
  }, []);

  return <Loading />;
};

export default AuthSuccess;
