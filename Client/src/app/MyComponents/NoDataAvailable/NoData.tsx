import React from "react";

interface NoDataProps {
  message?: string; // Custom error or no data message
  showRetry?: boolean; // Show retry button
  onRetry?: () => void; // Function to retry API call
}

const NoData: React.FC<NoDataProps> = ({
  message = "Unable to fetch data",
  showRetry = false,
  onRetry,
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-10">
      {/* <img
        src="/media/illustrations/no-data.svg" // Replace with an actual image path
        alt="No Data"
        className="mb-3"
        style={{ width: "150px" }}
      /> */}
      <span className="text-gray-600 fw-bold">{message}</span>

      {showRetry && onRetry && (
        <button className="btn btn-sm btn-primary mt-3" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default NoData;
