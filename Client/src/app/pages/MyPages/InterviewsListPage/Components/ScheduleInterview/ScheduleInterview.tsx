import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import clsx from "clsx";
import { KTIcon } from "../../../../../../_metronic/helpers";
import Select from "react-select";
import { scheduleInterview } from "../../../../../../ApiRequests/InterviewRequests";
import { getCandidates } from "../../../../../../ApiRequests/CandidateRequest";
import {
  ICandidateList,
  ICandidateListResponse,
} from "../../../../../../Types/CandidatesInterface";
import axios from "axios";

interface Candidate {
  id: string;
  name: string;
}

interface ScheduleInterviewFormProps {
  candidates?: Candidate[];
  show: boolean;
  handleClose: (isCreated?: boolean) => void;
}

const InterviewSchema = Yup.object().shape({
  candidateId: Yup.string().required("Candidate is required"),
  jobId: Yup.string().required("Applied job is required"),
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
  // candidates,
  show,
  handleClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [candidates, setCandidates] = useState<any>([]);
  const [jobs, setJobs] = useState<any>([]);

  const getJobPlacements = async (candidateId: string) => {
    // Example API call: adjust based on your actual endpoint
    return await axios.get(`/api/jobs?candidateId=${candidateId}`);
  };

  const fetchJobsForCandidate = async (candidateId: string) => {
    try {
      const jobsResponse = await getJobPlacements(candidateId);
      const jobsData = jobsResponse.data.payload;

      const jobOptions = jobsData.map((job: any) => ({
        value: job._id,
        label: job.title,
      }));

      setJobs(jobOptions);

      // Reset selected job
      formik.setFieldValue("jobId", jobOptions[0]?.value || "");
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const candidatesResponse = await getCandidates();
        const candidatesData: ICandidateList[] =
          candidatesResponse.data.payload;

        const candidateOptions = candidatesData.map((cand) => ({
          value: cand._id,
          label: `${cand.firstName} ${cand.lastName}`,
        }));

        setCandidates(candidateOptions);

        const firstCandidateId = candidateOptions[0]?.value;
        if (firstCandidateId) {
          await fetchJobsForCandidate(firstCandidateId);
          formik.setFieldValue("candidateId", firstCandidateId);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const formik = useFormik({
    initialValues: {
      candidateId: "",
      jobId: "",
      companyName: "",
      role: "",
      interviewDate: "",
      interviewMode: "Online",
      location: "",
      notes: "",
    },
    validationSchema: InterviewSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const request = {
          candidateId: values.candidateId,
          jobId: values.jobId,
          interviewDate: values.interviewDate,
          feedback: values.notes,
        };
        const response = await scheduleInterview(request);
        console.log("Scheduled Interview:", response);
        handleClose(true);
      } catch (error) {
        console.error("Error scheduling interview:", error);
        formik.setStatus("Failed to schedule interview.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };

  const candidateOptions = candidates.map((cand: any) => ({
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
                options={candidates}
                placeholder="Select Candidate"
                onChange={async (option) => {
                  formik.setFieldValue("candidateId", option?.value);
                  if (option?.value) {
                    await fetchJobsForCandidate(option.value);
                  }
                }}
                value={candidates.find(
                  (option: any) => option.value === formik.values.candidateId
                )}
              />

              {formik.touched.candidateId && formik.errors.candidateId && (
                <div className="text-danger">{formik.errors.candidateId}</div>
              )}
            </div>

            {/* Job Dropdown */}
            <div className="col-md-6">
              <label className="form-label">Applied jobs</label>
              <Select
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={jobs}
                placeholder="Select Job"
                onChange={(option) =>
                  formik.setFieldValue("jobId", option?.value)
                }
                value={jobs.find(
                  (option: any) => option.value === formik.values.jobId
                )}
              />
              {formik.touched.jobId && formik.errors.jobId && (
                <div className="text-danger">{formik.errors.jobId}</div>
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
              disabled={formik.isSubmitting}
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
