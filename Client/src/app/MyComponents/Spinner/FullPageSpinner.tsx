import React from "react";

type Props = {
  message?: string;
};

const FullPageSpinner: React.FC<Props> = ({ message = "Loading..." }) => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-75" style={{ zIndex: 1050 }}>
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
        <p className="mt-3 fw-semibold text-dark fs-5">{message}</p>
      </div>
    </div>
  );
};

export default FullPageSpinner;
