import * as Yup from "yup";

export interface IRegisterCandidate {
  firstName: string;
  lastName: string;
  contact: string;
  email: string;
  education: { institution: string; degree: string; year: string }[];
  skills: { name: string; proficiency: string }[];
  professionalExperience: { company: string; role: string; years: string }[];
}

export const registerCandidateInitialValues: IRegisterCandidate = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  education: [{ institution: "", degree: "", year: "" }],
  skills: [{ name: "", proficiency: "" }],
  professionalExperience: [{ company: "", role: "", years: "" }],
};

export const RegisterCandidateValidationSchema = [
  Yup.object({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    email: Yup.string().required().label("Email"),
    contact: Yup.string().required().label("Contact Number"),
  }),
  Yup.object({
    education: Yup.array()
      .of(
        Yup.object().shape({
          institution: Yup.string().required("Institution is required"),
          degree: Yup.string().required("Degree is required"),
          year: Yup.string()
            .matches(/^\d{4}$/, "Enter a valid year")
            .required("Year is required"),
        })
      )
      .min(1, "At least one educational entry is required"),
  }),
  Yup.object({
    skills: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().trim().required("Skill name is required"),
          proficiency: Yup.string()
            .oneOf(
              ["Beginner", "Intermediate", "Advanced", "Expert"],
              "Invalid level"
            )
            .required("Proficiency is required"),
        })
      )
      .min(1, "At least one skill is required"),
  }),
  Yup.object({
    professionalExperience: Yup.array()
      .of(
        Yup.object().shape({
          company: Yup.string().trim().required("Company name is required"),
          role: Yup.string().trim().required("Role is required"),
          years: Yup.string()
            .matches(/^\d+$/, "Enter a valid number of years")
            .required("Years of experience is required"),
        })
      )
      .min(1, "At least one work experience record is required"),
  }),
];
