import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import clsx from "clsx";
import { KTIcon } from "../../../../../_metronic/helpers";
import {
  createCandidate,
  updatCandidate,
} from "../../../../../ApiRequests/CandidateRequest";
import { IRecruiterList } from "../../../../../Types/RecruiterInterface";

interface Recruiter {
  id: string;
  name: string;
}

interface CreateCandidateFormProps {
  recruiters?: Recruiter[];
  selectedRecruiter?: IRecruiterList;
  candidateItem?: any | null; // Candidate item for edit mode
  show: boolean;
  handleClose: (isCreatedOrUpdated?: boolean) => void;
}

const CandidateSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  recruiterId: Yup.string().required("Recruiter is required"),
  resume: Yup.mixed().required("Resume is required"),
});

const CreateCandidateForm: React.FC<CreateCandidateFormProps> = ({
  recruiters = [],
  selectedRecruiter,
  candidateItem = null, // Default is null (create mode)
  show,
  handleClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  useEffect(() => {
    if (candidateItem) {
      formik.setValues({
        firstName: candidateItem.firstName,
        lastName: candidateItem.lastName,
        email: candidateItem.email,
        phoneNumber: candidateItem.phoneNumber,
        recruiterId: candidateItem.recruiterId || selectedRecruiter?._id || "",
        resume: candidateItem?.resumeUpload, // Existing resume will be shown via `resumePreview`
      });

      if (candidateItem.resumeUrl) {
        setResumePreview(candidateItem.resumeUrl);
      }
    } else {
      formik.resetForm();
      setResumePreview(null);
    }
  }, [candidateItem, show]);
  // Function to Submit Candidate Data to API
  const submitCandidate = async (values: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("recruiterId", values.recruiterId);
    formData.append("password", "password");
    if (values.resume) {
      formData.append("resume", values.resume);
    }

    try {
      const response = await createCandidate(formData);

      if (!response) {
        throw new Error("Failed to create candidate");
      }

      console.log("Candidate created successfully!");
      formik.resetForm();
      setResumePreview(null);
      handleClose(true);
    } catch (error) {
      console.error("Error creating candidate:", error);
      formik.setStatus("Failed to create candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateCandidate = async (values: any) => {
    setLoading(true);
    const request = {
      _id: candidateItem?._id,
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      phoneNumber: values?.phoneNumber,
      // recruiterId: values?.recruiterId,
      resume: values?.resume,
    };
    try {
      const response = await updatCandidate(request);

      if (!response) {
        throw new Error("Failed to update candidate");
      }

      console.log("Candidate updated successfully!");
      formik.resetForm();
      setResumePreview(null);
      handleClose(true);
    } catch (error) {
      console.error("Error updating candidate:", error);
      formik.setStatus("Failed to update candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      recruiterId: selectedRecruiter ? selectedRecruiter._id : "",
      resume: null,
    },
    validationSchema: CandidateSchema,
    onSubmit: (values) =>
      candidateItem ? updateCandidate(values) : submitCandidate(values),
  });

  const handleCloseModal = () => {
    formik.resetForm();
    setResumePreview(null);
    handleClose();
  };

  const recruiterOptions = recruiters.map((rec) => ({
    value: rec.id,
    label: rec.name,
  }));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("resume", file);
      setResumePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px"
    >
      {/* Modal Header */}
      <div className="pb-2 pt-4 d-flex justify-content-between align-items-center modal-header">
        <h2>{candidateItem ? "Update Candidate" : "Create Candidate"}</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleCloseModal}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      {/* Modal Body */}
      <div className="modal-body">
        <form className="p-4" onSubmit={formik.handleSubmit} noValidate>
          {formik.status && (
            <div className="mb-lg-15 alert alert-danger">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}

          <div className="row g-4">
            {/* First Name */}
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                {...formik.getFieldProps("firstName")}
                className={clsx("form-control", {
                  "is-invalid":
                    formik.touched.firstName && formik.errors.firstName,
                })}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-danger">{formik.errors.firstName}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                {...formik.getFieldProps("lastName")}
                className={clsx("form-control", {
                  "is-invalid":
                    formik.touched.lastName && formik.errors.lastName,
                })}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-danger">{formik.errors.lastName}</div>
              )}
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className={clsx("form-control", {
                  "is-invalid": formik.touched.email && formik.errors.email,
                })}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Phone Number */}
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                {...formik.getFieldProps("phoneNumber")}
                className={clsx("form-control", {
                  "is-invalid":
                    formik.touched.phoneNumber && formik.errors.phoneNumber,
                })}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-danger">{formik.errors.phoneNumber}</div>
              )}
            </div>

            {/* Recruiter Selection */}
            <div className="col-md-6">
              <label className="form-label">Recruiter</label>
              {selectedRecruiter ? (
                <input
                  type="text"
                  className="form-control"
                  value={
                    selectedRecruiter.firstName +
                    " " +
                    selectedRecruiter.lastName
                  }
                  disabled
                />
              ) : (
                <Select
                  className="react-select-styled react-select-solid"
                  classNamePrefix="react-select"
                  options={recruiterOptions}
                  placeholder="Select Recruiter"
                  onChange={(option: any) =>
                    formik.setFieldValue("recruiterId", option?.value)
                  }
                  value={recruiterOptions.find(
                    (option) => option.value === formik.values.recruiterId
                  )}
                />
              )}
              {formik.touched.recruiterId && formik.errors.recruiterId && (
                <div className="text-danger">{formik.errors.recruiterId}</div>
              )}
            </div>

            {/* Resume Upload */}
            <div className="col-md-6">
              <label className="form-label">Resume</label>
              <div className="d-flex align-items-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {resumePreview && (
                  <button
                    type="button"
                    className="btn btn-icon btn-light ms-2"
                    onClick={() => window.open(resumePreview, "_blank")}
                  >
                    <KTIcon className="fs-1" iconName="eye" />
                  </button>
                )}
              </div>
              {formik.touched.resume && formik.errors.resume && (
                <div className="text-danger">{formik.errors.resume}</div>
              )}
            </div>

            {/* {resumePreview && (
              <div className="mt-2">
                <p>Preview:</p>
                <iframe
                  src={resumePreview}
                  title="Resume Preview"
                  width="100%"
                  height="200px"
                />
              </div>
            )} */}
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary btn-sm mt-4"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : candidateItem
                ? "Update Candidate"
                : "Create Candidate"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCandidateForm;
