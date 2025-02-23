import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../../../_metronic/helpers";

interface FileUploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isMultipleAllowed?: boolean; // Controls single vs multiple file uploads
  onUpload: (files: File[] | File) => void; // Upload function (handles both cases)
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const FileUploadPopup: React.FC<FileUploadPopupProps> = ({
  isOpen,
  onClose,
  isMultipleAllowed = false,
  onUpload,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setFiles([]);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      if (isMultipleAllowed) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append files
      } else {
        setFiles([newFiles[0]]); // Only allow one file
      }

      event.target.value = ""; // Reset input
    }
  };

  const handleUpload = () => {
    if (files.length > 0) {
      isMultipleAllowed ? onUpload(files) : onUpload(files[0]);
    }
    onClose();
  };

  const handleUploadFile = (file: File) => {
    onUpload(file);
    onClose();
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  if (!isOpen) return null;

  return createPortal(
    <Modal
      id="kt_modal_upload_csv"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-600px"
      show={isOpen}
      onHide={onClose}
      backdrop={true}
    >
      {/* Modal Header */}
      <div className="pb-2 pt-4 d-flex justify-content-between modal-header">
        <h2>Upload File</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      {/* Modal Body */}
      <div className="modal-body py-lg-10 px-lg-10">
        {/* File Upload Button */}
        <div className="mb-3">
          <input
            type="file"
            id="fileInput"
            className="d-none"
            multiple={isMultipleAllowed}
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput" className="btn btn-light-primary btn-sm">
            <KTIcon iconName="plus" className="fs-3 me-2" />
            Add File(s)
          </label>

          {/* Buttons for Multiple File Mode */}
          {/* {isMultipleAllowed && files.length > 0 && ( */}
          <span className="ms-3">
            {files.length > 1 && (
              <button
                className="btn btn-light-primary btn-sm me-2"
                onClick={handleRemoveAll}
              >
                <KTIcon iconName="trash" className="fs-3 me-2" />
                Remove All
              </button>
            )}
            {files.length > 1 && (
              <button className="btn btn-primary btn-sm" onClick={handleUpload}>
                <KTIcon iconName="add-files" className="fs-3 me-2" />
                Upload All
              </button>
            )}
            {files.length == 1 && (
              <button
                className="btn btn-primary btn-sm ms-3"
                onClick={handleUpload}
              >
                <KTIcon iconName="add-files" className="fs-3 me-2" />
                Upload File
              </button>
            )}
          </span>
          {/* )} */}

          {/* Single File Mode Upload Button */}
          {/* {!isMultipleAllowed && files.length > 0 && (
            <button
              className="btn btn-primary btn-sm ms-3"
              onClick={handleUpload}
            >
              <KTIcon iconName="add-files" className="fs-3 me-2" />
              Upload File
            </button>
          )} */}
        </div>

        {/* File Size & Format Message */}
        <small className="text-muted d-block">
          Max file size: 2MB | Format: .csv
        </small>

        {/* Attached Files List */}
        {files.length > 0 && (
          <div className="mt-4">
            <h6>Attached Files:</h6>
            <ul className="list-group">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {file.name}
                  <div>
                    {isMultipleAllowed && (
                      <button
                        type="button"
                        className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary me-2"
                        onClick={() => handleUploadFile(file)}
                      >
                        <KTIcon iconName="upload" className="fs-3" />
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-sm btn-icon btn-color-danger btn-active-light-danger"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>,
    modalsRoot
  );
};

export default FileUploadPopup;
