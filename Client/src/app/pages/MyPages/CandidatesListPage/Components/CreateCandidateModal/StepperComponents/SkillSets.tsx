import React, { FC } from "react";
import { FieldArray, FormikProps, ErrorMessage, Field } from "formik";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { IRegisterCandidate } from "../ValidationSchema/RegisterCandidateValidationSchema";

const SkillSets: FC<{ formik: FormikProps<IRegisterCandidate> }> = ({
  formik,
}) => {
  return (
    <div className="w-100">
      <div className="pb-6 pb-lg-8">
        <h4 className="fw-bolder text-gray-900">Your Skill Set</h4>
        <p className="text-gray-600 fw-medium fs-7 fst-italic">
          Add the technical and soft skills you possess.
        </p>
      </div>

      <FieldArray name="skills">
        {({ push, remove }) => (
          <div>
            {formik.values.skills.map((_, index) => (
              <div
                key={index}
                className="border px-4 pt-3 rounded mb-4 bg-white"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold fs-6 text-gray-700">
                    Skill {index + 1}
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
                  {/* Skill Name */}
                  <div className="mb-3 col-lg-6 col-12">
                    <label className="form-label-sm">Skill Name</label>
                    <Field
                      type="text"
                      className="form-control form-control-sm"
                      name={`skills[${index}].name`}
                    />
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage name={`skills[${index}].name`} />
                    </div>
                  </div>

                  {/* Skill Proficiency */}
                  <div className="mb-3 col-lg-6 col-12">
                    <label className="form-label-sm">Proficiency Level</label>
                    <Field
                      as="select"
                      className="form-control form-control-sm"
                      name={`skills[${index}].proficiency`}
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </Field>
                    <div className="text-danger fs-7 mt-1">
                      <ErrorMessage name={`skills[${index}].proficiency`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-sm btn-light-primary"
              onClick={() => push({ name: "", proficiency: "" })}
            >
              <KTIcon iconName="plus" className="fs-3" /> Add Skill
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export { SkillSets };
