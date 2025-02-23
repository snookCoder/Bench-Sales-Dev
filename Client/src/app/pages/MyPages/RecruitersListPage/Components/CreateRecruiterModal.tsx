import React from "react";
import { Modal, Button } from "react-bootstrap";
import { KTIcon } from "../../../../../_metronic/helpers";
// import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateRecruiterModal: React.FC<Props> = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      id="kt_modal_scrollable_2"
      centered
      scrollable
    >
      {/* Modal Header */}
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title>Modal title</Modal.Title>
        <div
          className="btn btn-icon btn-sm btn-active-light-primary"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleClose}
        >
          <KTIcon iconName="cross" className="fs-2x" />
        </div>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body>
        <input
          className="form-control form-control-lg form-control-solid"
          type="text"
          value={"Deepak"}
          //   onChange={(e) => updateData({username: e.target.value})}
        />
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer>
        <Button variant="light" data-bs-dismiss="modal" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { CreateRecruiterModal };
