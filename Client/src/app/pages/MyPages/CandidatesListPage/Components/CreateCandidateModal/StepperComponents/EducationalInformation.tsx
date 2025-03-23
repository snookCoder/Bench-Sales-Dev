import React, { FC } from "react";
import { FieldArray, FormikProps, ErrorMessage, Field } from "formik";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { IRegisterCandidate } from "../ValidationSchema/RegisterCandidateValidationSchema";

interface FormValues {
  education: { institution: string; degree: string; year: string }[];
}

const EducationalInformation: FC<{
  formik: FormikProps<IRegisterCandidate>;
}> = ({ formik }) => {
  return (
    <div className="w-100">
      <div className="pb-6 pb-lg-8">
        <h4 className="fw-bolder text-gray-900">Your Academic Journey</h4>
        <p className="text-gray-600 fw-medium fs-7 fst-italic">
          List your educational qualifications, institutions, and scores to
          highlight your academic achievements.
        </p>
      </div>

      <FieldArray name="education">
        {({ push, remove }) => (
          <div>
            {formik.values.education.map((_, index) => (
              <div
                key={index}
                className="border px-4 pt-3 rounded mb-4 bg-white"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold fs-6 text-gray-700">
                    Row {index + 1}
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
                  {/* Institution */}
                  <div className="mb-3 col-lg-4 col-12">
                    <label className="form-label-sm">Institution</label>
                    <Field
                      type="text"
                      className="form-control form-control-sm"
                      name={`education[${index}].institution`}
                    />
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage name={`education[${index}].institution`} />
                    </div>
                  </div>

                  {/* Degree */}
                  <div className="mb-3 col-lg-4 col-12">
                    <label className="form-label-sm">Degree</label>
                    <Field
                      type="text"
                      className="form-control form-control-sm"
                      name={`education[${index}].degree`}
                    />
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage name={`education[${index}].degree`} />
                    </div>
                  </div>

                  {/* Year of Completion (Full width on all screens) */}
                  <div className="mb-3 col-lg-4 col-12">
                    <label className="form-label-sm">Year of Completion</label>
                    <Field
                      type="text"
                      className="form-control form-control-sm"
                      name={`education[${index}].year`}
                    />
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage name={`education[${index}].year`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-sm btn-light-primary"
              onClick={() => push({ institution: "", degree: "", year: "" })}
            >
              <KTIcon iconName="plus" className="fs-3" /> Add Row
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export { EducationalInformation };
