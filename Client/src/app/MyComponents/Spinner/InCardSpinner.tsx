import React from "react";
import { Spinner } from "react-bootstrap";

type Props = {
  message?: string;
};

const InCardSpinner: React.FC<Props> = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" variant="primary" />
      {message && <p className="mt-2 text-muted fw-semibold">{message}</p>}
    </div>
  );
};

export default InCardSpinner;
