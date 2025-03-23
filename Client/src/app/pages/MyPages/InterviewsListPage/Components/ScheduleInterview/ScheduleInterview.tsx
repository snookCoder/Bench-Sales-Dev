import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import clsx from "clsx";
import { KTIcon } from "../../../../../../_metronic/helpers";
import Select from "react-select";
import { scheduleInterview } from "../../../../../../ApiRequests/InterviewRequests";

interface Candidate {
  id: string;
  name: string;
}

interface ScheduleInterviewFormProps {
  candidates: Candidate[];
  show: boolean;
  handleClose: (isCreated?: boolean) => void;
}

const InterviewSchema = Yup.object().shape({
  candidate: Yup.string().required("Candidate is required"),
  companyName: Yup.string().required("Company name is required"),
  role: Yup.string().required("Role is required"),
  interviewDate: Yup.date().required("Interview date is required"),
  interviewMode: Yup.string().required("Interview mode is required"),
  location: Yup.string().when("interviewMode", {
    is: "Offline",
    then: () =>
      Yup.string().required("Location is required for offline interviews"),
  }),
  notes: Yup.string(),
});

const ScheduleInterviewForm: React.FC<ScheduleInterviewFormProps> = ({
  candidates,
  show,
  handleClose,
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      candidate: "",
      companyName: "",
      role: "",
      interviewDate: "",
      interviewMode: "Online",
      location: "",
      notes: "",
    },
    validationSchema: InterviewSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        // 🟢 API Call for Scheduling Interview
        const response = await scheduleInterview(values);
        console.log("Scheduled Interview:", response);

        resetForm();
        handleClose(true); // Indicating that an interview was created
      } catch (error) {
        console.error("Error scheduling interview:", error);
        formik.setStatus("Failed to schedule interview.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };

  const candidateOptions = candidates.map((cand) => ({
    value: cand.id,
    label: cand.name,
  }));

  const interviewModeOptions = [
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
  ];

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px"
    >
      <div className="pb-2 pt-4 d-flex justify-content-between align-items-center modal-header">
        <h2>Schedule Interview</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleCloseModal}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>
      <div className="modal-body">
        <form className="p-4" onSubmit={formik.handleSubmit} noValidate>
          {formik.status && (
            <div className="mb-lg-15 alert alert-danger">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}

          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">Candidate</label>
              <Select
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={candidateOptions}
                placeholder="Select Candidate"
                onChange={(option: any) =>
                  formik.setFieldValue("candidate", option?.value)
                }
                value={candidateOptions.find(
                  (option) => option.value === formik.values.candidate
                )}
              />
              {formik.touched.candidate && formik.errors.candidate && (
                <div className="text-danger">{formik.errors.candidate}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                {...formik.getFieldProps("companyName")}
                className={clsx("form-control", {
                  "is-invalid":
                    formik.touched.companyName && formik.errors.companyName,
                })}
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <div className="text-danger">{formik.errors.companyName}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Role/Position</label>
              <input
                type="text"
                {...formik.getFieldProps("role")}
                className={clsx("form-control", {
                  "is-invalid": formik.touched.role && formik.errors.role,
                })}
              />
              {formik.touched.role && formik.errors.role && (
                <div className="text-danger">{formik.errors.role}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Interview Date & Time</label>
              <input
                type="datetime-local"
                {...formik.getFieldProps("interviewDate")}
                className={clsx("form-control", {
                  "is-invalid":
                    formik.touched.interviewDate && formik.errors.interviewDate,
                })}
              />
              {formik.touched.interviewDate && formik.errors.interviewDate && (
                <div className="text-danger">{formik.errors.interviewDate}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Interview Mode</label>
              <Select
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={interviewModeOptions}
                placeholder="Select Mode"
                onChange={(option: any) =>
                  formik.setFieldValue("interviewMode", option?.value)
                }
                value={interviewModeOptions.find(
                  (option) => option.value === formik.values.interviewMode
                )}
              />
            </div>

            {formik.values.interviewMode === "Offline" && (
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  {...formik.getFieldProps("location")}
                  className={clsx("form-control", {
                    "is-invalid":
                      formik.touched.location && formik.errors.location,
                  })}
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="text-danger">{formik.errors.location}</div>
                )}
              </div>
            )}

            <div className="col-12">
              <label className="form-label">Notes</label>
              <textarea
                {...formik.getFieldProps("notes")}
                className="form-control"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary btn-sm mt-4"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && (
                <span className="indicator-label">Schedule Interview</span>
              )}
              {loading && (
                <span className="indicator-progress">
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ScheduleInterviewForm;
