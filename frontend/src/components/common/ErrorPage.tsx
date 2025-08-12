"use client";

export interface ErrorPageProps {
  errorType?: string;
  errorMessage?: string;
  errorCode?: string | number;
  className?: string;
}

const ErrorPage = ({
  errorType = "Error",
  errorMessage = "Something went wrong",
  errorCode,
  className = "",
}: ErrorPageProps) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6 ${className}`}
    >
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
          {/* Error Type */}
          <h1 className="text-2xl font-bold text-white mb-2">{errorType}</h1>

          {/* Error Message */}
          <p className="text-gray-300 text-lg mb-6">{errorMessage}</p>

          {/* Error Code (if provided) */}
          {errorCode && (
            <div className="inline-block px-4 py-2 bg-white/10 rounded-lg border border-white/20">
              <span className="text-sm text-gray-400">Error Code: </span>
              <span className="text-sm font-mono text-red-400">
                {errorCode}
              </span>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-200 hover:border-white/40"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
