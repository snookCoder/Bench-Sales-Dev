import React, { FC } from "react";
import { ErrorMessage, Field } from "formik";

const PersonalInformation: FC = () => {
  return (
    <div className="w-100">
      <div className="pb-6 pb-lg-8">
        <h4 className="fw-bolder text-gray-900">Tell us about yourself</h4>

        <p className="text-gray-600 fw-medium fs-7 fst-italic">
          Provide your basic details, including your name, email, and contact
          number, to get started.
        </p>
      </div>

      <div className="row g-5">
        {/* First Name */}
        <div className="col-12 col-md-6">
          <label className="form-label-sm mb-1">First Name</label>
          <Field type="text" className="form-control" name="firstName" />
          <div className="text-danger fs-7 mt-1">
            <ErrorMessage name="firstName" />
          </div>
        </div>

        {/* Last Name */}
        <div className="col-12 col-md-6">
          <label className="form-label-sm mb-1">Last Name</label>
          <Field type="text" className="form-control" name="lastName" />
          <div className="text-danger fs-7 mt-1">
            <ErrorMessage name="lastName" />
          </div>
        </div>

        {/* Email */}
        <div className="col-12 col-md-6">
          <label className="form-label-sm mb-1">Email</label>
          <Field type="text" className="form-control" name="email" />
          <div className="text-danger fs-7 mt-1">
            <ErrorMessage name="email" />
          </div>
        </div>

        {/* Contact Number */}
        <div className="col-12 col-md-6">
          <label className="form-label-sm mb-1">Contact Number</label>
          <Field type="text" className="form-control" name="contact" />
          <div className="text-danger fs-7 mt-1">
            <ErrorMessage name="contact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PersonalInformation };
