import { FC, useEffect, useRef, useState } from "react";
import { Form, Formik, FormikValues } from "formik";
import { StepperComponent } from "../../../../../../_metronic/assets/ts/components";
import { Content } from "../../../../../../_metronic/layout/components/Content";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { Modal } from "react-bootstrap";
import {
  IRegisterCandidate,
  registerCandidateInitialValues,
  RegisterCandidateValidationSchema,
} from "./ValidationSchema/RegisterCandidateValidationSchema";
import { PersonalInformation } from "./StepperComponents/PersonalInformation";
import { EducationalInformation } from "./StepperComponents/EducationalInformation";
import { SkillSets } from "./StepperComponents/SkillSets";
import { ProfessionalExperience } from "./StepperComponents/ProfessionalExperiance";
// import { ProfessionalExperiance } from "./StepperComponents/ProfessionalExperiance";

interface RegisterCandidateProps {
  show: boolean;
  handleClose: () => void;
}

const RegisterCandidateStepper: React.FC<RegisterCandidateProps> = ({
  show,
  handleClose,
}) => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const [stepper, setStepper] = useState<StepperComponent | null>(null);
  const [currentSchema, setCurrentSchema] = useState(
    RegisterCandidateValidationSchema[0]
  );
  const [initValues] = useState<IRegisterCandidate>(
    registerCandidateInitialValues
  );
  const [isSubmitButton, setSubmitButton] = useState(false);

  const loadStepper = () => {
    try {
      console.log("stepper load");
      setStepper(
        StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const prevStep = () => {
    if (!stepper) {
      return;
    }

    stepper.goPrev();

    setCurrentSchema(
      RegisterCandidateValidationSchema[stepper.currentStepIndex - 1]
    );

    setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber);
  };

  const submitStep = (values: IRegisterCandidate, actions: FormikValues) => {
    if (!stepper) {
      console.log("no stepper");
      return;
    }

    if (stepper.currentStepIndex !== stepper.totalStepsNumber) {
      console.log("go next");
      stepper.goNext();
    } else {
      console.log("first");
      stepper.goto(1);
      actions.resetForm();
    }

    setSubmitButton(stepper.currentStepIndex === stepper.totalStepsNumber);

    console.log(values);

    setCurrentSchema(
      RegisterCandidateValidationSchema[stepper.currentStepIndex - 1]
    );
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px"
    >
      {/* <Toolbar /> */}
      <div className="pb-2 pt-4 d-flex justify-content-between align-items-center modal-header">
        <h2>Register Candidate</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>
      <Content>
        {/* <div className="">
          <div className=""> */}
        <div
          ref={stepperRef}
          className="stepper stepper-links d-flex flex-column pt-4"
          id="kt_create_account_stepper"
        >
          <div className="stepper-nav mb-5">
            <div className="stepper-item current" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Personal Information</h3>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Education</h3>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Skill Sets</h3>
            </div>

            <div className="stepper-item" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Professional Experiances</h3>
            </div>

            {/* <div className="stepper-item" data-kt-stepper-element="nav">
              <h3 className="stepper-title">Completed</h3>
            </div> */}
          </div>

          <Formik
            validationSchema={currentSchema}
            initialValues={initValues}
            onSubmit={submitStep}
          >
            {(formik) => (
              <Form
                className="mx-auto mw-700px w-100 pt-2 pb-10"
                id="kt_create_account_form"
                placeholder={undefined}
              >
                <div className="current" data-kt-stepper-element="content">
                  <PersonalInformation />
                </div>

                <div data-kt-stepper-element="content">
                  <EducationalInformation formik={formik} />
                </div>

                <div data-kt-stepper-element="content">
                  <SkillSets formik={formik} />
                </div>

                <div data-kt-stepper-element="content">
                  <ProfessionalExperience formik={formik} />
                </div>

                {/* <div data-kt-stepper-element="content">
                  <Step5 />
                </div> */}

                <div className="d-flex flex-stack pt-15">
                  <div className="mr-2">
                    <button
                      onClick={prevStep}
                      type="button"
                      className="btn btn-sm btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                    >
                      <KTIcon iconName="arrow-left" className="me-1" />
                      Back
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary me-3"
                    >
                      <span className="indicator-label">
                        {!isSubmitButton && "Continue"}
                        {isSubmitButton && "Submit"}
                        <KTIcon iconName="arrow-right" className="ms-2 me-0" />
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Content>
    </Modal>
  );
};

export { RegisterCandidateStepper };
