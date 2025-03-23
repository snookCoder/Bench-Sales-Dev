import React, { FC } from "react";
import { FieldArray, FormikProps, ErrorMessage, Field } from "formik";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { IRegisterCandidate } from "../ValidationSchema/RegisterCandidateValidationSchema";

const ProfessionalExperience: FC<{
  formik: FormikProps<IRegisterCandidate>;
}> = ({ formik }) => {
  return (
    <div className="w-100">
      <div className="pb-6 pb-lg-8">
        <h4 className="fw-bolder text-gray-900">Professional Experience</h4>
        <p className="text-gray-600 fw-medium fs-7 fst-italic">
          List your work experiences, roles, and duration of employment.
        </p>
      </div>

      <FieldArray name="professionalExperience">
        {({ push, remove }) => (
          <div>
            {formik.values.professionalExperience.map((_, index) => (
              <div
                key={index}
                className="border px-4 pt-3 rounded mb-4 bg-white"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold fs-6 text-gray-700">
                    Experience {index + 1}
                  </h5>
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-link text-danger p-0 m-0"
                      onClick={() => remove(index)}
                    >
                      <KTIcon iconName="trash" className="fs-3 text-danger" />
                    </button>
                  )}
                </div>

                <div className="row">
                  {/* Company */}
                  <div className="mb-3 col-lg-4 col-12">
                    <label className="form-label-sm">Company</label>
                    <Field
                      type="text"
                      className="form-control form-control-sm"
                      name={`professionalExperience[${index}].company`}
                    />
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage
                        name={`professionalExperience[${index}].company`}
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="mb-3 col-lg-4 col-12">
                    <label className="form-label-sm">Role</label>
                    <Field
                      type="text"
                      className="form-control form-control-sm"
                      name={`professionalExperience[${index}].role`}
                    />
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage
                        name={`professionalExperience[${index}].role`}
                      />
                    </div>
                  </div>

                  {/* Years of Experience */}
                  <div className="mb-3 col-lg-4 col-12">
                    <label className="form-label-sm">Years of Experience</label>
                    <Field
                      type="text"
                      className="form-control form-control-sm"
                      name={`professionalExperience[${index}].years`}
                    />
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage
                        name={`professionalExperience[${index}].years`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-sm btn-light-primary"
              onClick={() =>
                push({ company: "", role: "", years: "" })
              }
            >
              <KTIcon iconName="plus" className="fs-3" /> Add Experience
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export { ProfessionalExperience };
