import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import clsx from "clsx";
import { KTIcon } from "../../../../../../_metronic/helpers";
import Select from "react-select";
import { getCandidates } from "../../../../../../ApiRequests/CandidateRequest";
import { createAppliedJob } from "../../../../../../ApiRequests/AppliedJobsRequest";
import { ICandidateList } from "../../../../../../Types/CandidatesInterface";
import { IRecruiterList } from "../../../../../../Types/RecruiterInterface";
import {
  IRecruiterProfile,
  UserRolesEnum,
} from "../../../../../../Types/ProfileInterface";
import { getUserProfileFromLocalStorage } from "../../../../../Helpers/Helpers";
// import { createJob } from "../../../../../../ApiRequests/JobRequests";

interface CreateJobFormProps {
  show: boolean;
  handleClose: (isCreated?: boolean) => void;
  selectedCandidate: ICandidateList;
  recruiter: IRecruiterList;
}

const CreateJobSchema = Yup.object().shape({
  selectedCandidate: Yup.string().required("Candidate is required"),
  title: Yup.string().required("Job title is required"),
  //   description: Yup.string().required("Job description is required"),
  location: Yup.string().required("Location is required"),
  salary: Yup.string().required("Salary is required"),
  jobType: Yup.string().required("Job type is required"),
  industry: Yup.string().required("Industry is required"),
  companyName: Yup.string().required("Company name is required"),
});

const jobTypeOptions = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
];

const industryOptions = [
  { value: "IT", label: "IT" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Education", label: "Education" },
];

const ApplyJobForm: React.FC<CreateJobFormProps> = ({
  show,
  handleClose,
  selectedCandidate,
  recruiter,
}) => {
  const currentUser: IRecruiterProfile = getUserProfileFromLocalStorage();
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<
    { label: string; value: string }[]
  >([]);

  // Replace this URL with your actual API endpoint
  const fetchCandidates = async () => {
    try {
      const response = await getCandidates(
        recruiter?._id
          ? recruiter?._id
          : currentUser?.role == UserRolesEnum.Recruiter
          ? currentUser?._id
          : ""
      ); // 🔁 Adjust API path
      const options = response.data.payload.map((candidate: any) => ({
        label: candidate.name || `${candidate.firstName} ${candidate.lastName}`, // Adjust based on API
        value: candidate._id,
      }));
      setCandidates(options);

      // Optionally, set an initial candidate
      if (options.length > 0 && !formik.values.selectedCandidate) {
        formik.setFieldValue("selectedCandidate", options[0].value);
      }
    } catch (error) {
      console.error("Failed to fetch candidates", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const formik = useFormik({
    initialValues: {
      selectedCandidate: selectedCandidate?._id || "",
      title: "",
      description: "",
      location: "",
      salary: "",
      jobType: "",
      industry: "",
      companyName: "",
    },
    validationSchema: CreateJobSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        const request = {
          candidateId: values.selectedCandidate,
          clientNotes: values.description,
          jobTitle: values.title,
          company: values.companyName,
          industry: values.industry,
        };

        // 🟢 API Call for Creating Job
        const response = await createAppliedJob(request);
        console.log("Job Created:", response);

        resetForm();
        handleClose(true); // Indicating that a job was created
      } catch (error) {
        console.error("Error creating job:", error);
        formik.setStatus("Failed to create job.");
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

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px"
    >
      <div className="pb-2 pt-4 d-flex justify-content-between align-items-center modal-header">
        <h2>Create Job</h2>
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
            {/* Candidate Dropdown */}
            <div className="col-md-6">
              <label className="form-label">Candidate</label>
              {selectedCandidate?._id ? (
                <input
                  type="text"
                  className="form-control"
                  value={`${selectedCandidate.firstName} ${selectedCandidate.lastName}`}
                  disabled
                />
              ) : (
                <Select
                  className="react-select-styled react-select-solid"
                  classNamePrefix="react-select"
                  options={candidates}
                  placeholder="Select Candidate"
                  onChange={async (option) => {
                    formik.setFieldValue("candidateId", option?.value);
                  }}
                  value={candidates.find(
                    (option: any) =>
                      option.value === formik.values.selectedCandidate
                  )}
                />
              )}
              {formik.touched.selectedCandidate &&
                formik.errors.selectedCandidate && (
                  <div className="text-danger">
                    {formik.errors.selectedCandidate}
                  </div>
                )}
            </div>

            {/* Title */}
            <div className="col-md-6">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                {...formik.getFieldProps("title")}
                className={clsx("form-control", {
                  "is-invalid": formik.touched.title && formik.errors.title,
                })}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-danger">{formik.errors.title}</div>
              )}
            </div>

            {/* Company Name */}
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

            {/* Description */}
            <div className="col-md-12">
              <label className="form-label">Job Description</label>
              <textarea
                {...formik.getFieldProps("description")}
                className={clsx("form-control", {
                  "is-invalid":
                    formik.touched.description && formik.errors.description,
                })}
                rows={4}
                placeholder="Enter job details..."
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-danger">{formik.errors.description}</div>
              )}
            </div>

            {/* Location */}
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

            {/* Salary */}
            <div className="col-md-6">
              <label className="form-label">Salary</label>
              <input
                type="text"
                {...formik.getFieldProps("salary")}
                className={clsx("form-control", {
                  "is-invalid": formik.touched.salary && formik.errors.salary,
                })}
              />
              {formik.touched.salary && formik.errors.salary && (
                <div className="text-danger">{formik.errors.salary}</div>
              )}
            </div>

            {/* Job Type */}
            <div className="col-md-6">
              <label className="form-label">Job Type</label>
              <Select
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={jobTypeOptions}
                placeholder="Select Job Type"
                onChange={(option: any) =>
                  formik.setFieldValue("jobType", option?.value)
                }
                value={jobTypeOptions.find(
                  (option) => option.value === formik.values.jobType
                )}
              />
              {formik.touched.jobType && formik.errors.jobType && (
                <div className="text-danger">{formik.errors.jobType}</div>
              )}
            </div>

            {/* Industry */}
            <div className="col-md-6">
              <label className="form-label">Industry</label>
              <Select
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                options={industryOptions}
                placeholder="Select Industry"
                onChange={(option: any) =>
                  formik.setFieldValue("industry", option?.value)
                }
                value={industryOptions.find(
                  (option) => option.value === formik.values.industry
                )}
              />
              {formik.touched.industry && formik.errors.industry && (
                <div className="text-danger">{formik.errors.industry}</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary btn-sm mt-4"
              disabled={formik.isSubmitting}
            >
              {!loading && <span className="indicator-label">Create Job</span>}
              {loading && (
                <span className="">
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

export default ApplyJobForm;
