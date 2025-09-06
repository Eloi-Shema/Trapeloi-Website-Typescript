import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { paymentApiService } from "../../services/payment.api.service";

interface PendingPurchaseType {
  beatId: string;
  beatTitle: string;
  timestamp: number;
}

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [beatTitle, setBeatTitle] = useState<string | undefined>("");

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Get URL parameters from LemonSqueezy
        const orderId =
          searchParams.get("orderId") || searchParams.get("order_id");
        const token =
          searchParams.get("token") || searchParams.get("download_token");

        if (!orderId || !token) {
          throw new Error("Missing payment verification parameters");
        }

        const pendingPurchaseSession =
          sessionStorage.getItem("pendingPurchase");

        let pendingPurchase: PendingPurchaseType | null = null;

        if (pendingPurchaseSession) {
          pendingPurchase = JSON.parse(pendingPurchaseSession);
          setBeatTitle(pendingPurchase?.beatTitle);

          // Clean up session storage
          sessionStorage.removeItem("pendingPurchase");
        }

        await paymentApiService.handleSuccessCallback(orderId, token);

        setStatus("success");

        // Auto-redirect to download page after 2 seconds
        setTimeout(() => {
          navigate(`/download/${orderId}?token=${token}`, {
            replace: true,
            state: { beatTitle: pendingPurchase?.beatTitle },
          });
        }, 2000);
      } catch (error) {
        console.error("Payment verification failed:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Payment verification failed"
        );

        // Redirect to home after 5 seconds on error
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 5000);
      }
    };

    handlePaymentSuccess();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md mx-4">
        <div className="p-8 text-center bg-white rounded-lg shadow-xl dark:bg-gray-800">
          {status === "processing" && (
            <>
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Processing Payment
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {beatTitle
                  ? `Verifying your purchase of "${beatTitle}"...`
                  : "Verifying your payment..."}
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Payment Successful!
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {beatTitle
                  ? `Your purchase of "${beatTitle}" was successful!`
                  : "Your payment was processed successfully!"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to download page...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Payment Verification Failed
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {errorMessage}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to home page...
              </p>
              <button
                onClick={() => navigate("/", { replace: true })}
                className="px-6 py-2 mt-4 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Go Home Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
