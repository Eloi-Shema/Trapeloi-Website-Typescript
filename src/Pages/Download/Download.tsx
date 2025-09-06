import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import {
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Music,
  Archive,
} from "lucide-react";
import { usePayment } from "../../contexts/Payment/PaymentContext";

const DownloadPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const token = searchParams.get("token");

  const {
    currentPayment,
    downloadUrls,
    loading,
    error,
    getDownloadPage,
    downloadFile,
    refreshDownloadLinks,
    getRemainingDownloads,
    canDownload,
    clearError,
  } = usePayment();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<{
    [key: string]: "idle" | "downloading" | "completed";
  }>({});

  const [autoRefreshAttempted, setAutoRefreshAttempted] = useState(false);

  // Initialize download page
  useEffect(() => {
    if (orderId && token && !currentPayment) {
      getDownloadPage(orderId, token);
    }
  }, [orderId, token, currentPayment, getDownloadPage]);

  // Auto-refresh links if they're expired (one time attempt)
  useEffect(() => {
    const attemptAutoRefresh = async () => {
      if (currentPayment && downloadUrls && !autoRefreshAttempted) {
        setAutoRefreshAttempted(true);

        try {
          const testUrl = downloadUrls.fullAudio;

          if (testUrl) {
            const response = await fetch(testUrl, { method: "HEAD" });
            if (!response.ok) {
              console.log("Links appear expired, auto-refreshing...");
              await handleRefreshLinks();
            }
          }
        } catch (error) {
          console.log("Auto-refresh check failed, but continuing...");
        }
      }
    };

    attemptAutoRefresh();
  }, [currentPayment, downloadUrls, autoRefreshAttempted]);

  const handleDownload = useCallback(
    async (fileType: "full" | "stems") => {
      if (!canDownload()) return;

      setDownloadStatus((prev) => ({ ...prev, [fileType]: "downloading" }));

      try {
        await downloadFile(fileType);
        setDownloadStatus((prev) => ({ ...prev, [fileType]: "completed" }));

        // Reset status after 3 seconds
        setTimeout(() => {
          setDownloadStatus((prev) => ({ ...prev, [fileType]: "idle" }));
        }, 3000);
      } catch (error) {
        console.error(`Download failed for ${fileType}:`, error);
        setDownloadStatus((prev) => ({ ...prev, [fileType]: "idle" }));
      }
    },
    [canDownload, downloadFile]
  );

  const handleRefreshLinks = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshDownloadLinks();
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshDownloadLinks]);

  // Clear any existing errors when component mounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading your download...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md mx-4">
          <div className="p-8 text-center bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Download Not Available
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{error}</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Return to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPayment || !downloadUrls) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No download information available.
          </p>
        </div>
      </div>
    );
  }

  const remainingDownloads = getRemainingDownloads();
  const beatTitle =
    location.state?.beatTitle || currentPayment.beat?.title || "Your Beat";

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full dark:bg-green-900">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Download Ready!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your purchase of "{beatTitle}" is complete
          </p>
        </div>

        {/* Payment Info Card */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {remainingDownloads}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Downloads Remaining
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${(currentPayment.amountPaid / 100).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Amount Paid
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {currentPayment.maxDownloads}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Downloads
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Download Files
            </h2>
            <button
              onClick={handleRefreshLinks}
              disabled={isRefreshing}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh Links
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Full Audio Download */}
            <div className="p-6 border border-gray-200 rounded-lg dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Music className="w-6 h-6 mr-3 text-blue-500" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Full Beat (MP3)
                </h3>
              </div>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                High-quality stereo mix ready for your projects
              </p>
              <button
                onClick={() => handleDownload("full")}
                disabled={
                  !canDownload() || downloadStatus.full === "downloading"
                }
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadStatus.full === "downloading" ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Downloading...
                  </>
                ) : downloadStatus.full === "completed" ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Beat
                  </>
                )}
              </button>
            </div>

            {/* Stems Download */}
            <div className="p-6 border border-gray-200 rounded-lg dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Archive className="w-6 h-6 mr-3 text-purple-500" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Stems (ZIP)
                </h3>
              </div>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Individual tracks for maximum mixing flexibility
              </p>
              <button
                onClick={() => handleDownload("stems")}
                disabled={
                  !canDownload() || downloadStatus.stems === "downloading"
                }
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadStatus.stems === "downloading" ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Downloading...
                  </>
                ) : downloadStatus.stems === "completed" ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Stems
                  </>
                )}
              </button>
            </div>
          </div>

          {!canDownload() && (
            <div className="p-4 mt-6 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm text-yellow-800 dark:text-yellow-300">
                  {remainingDownloads === 0
                    ? "No downloads remaining. You have reached the maximum number of downloads for this purchase."
                    : "Downloads are temporarily unavailable. Please try refreshing the links or contact support."}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-6 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
          <h3 className="mb-3 text-lg font-medium text-blue-900 dark:text-blue-300">
            Important Notes
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>
              • You have {currentPayment.maxDownloads} total downloads for this
              purchase
            </li>
            <li>
              • Download links expire periodically for security - use the
              refresh button if needed
            </li>
            <li>• Save your files immediately after downloading</li>
            <li>
              • For support, contact us with your order ID:{" "}
              {currentPayment.orderId}
            </li>
            <li>
              • A confirmation email has been sent to{" "}
              {currentPayment.customerEmail}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
