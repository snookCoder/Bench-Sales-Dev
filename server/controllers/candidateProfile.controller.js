// import { uploadOnCloud } from "../utils/cloudnary.util.js";
import { response_success } from "../utils/response.utils.js";

//create candidate profile
const createCandidateProfile = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  //resume is needed
  if (!req.file) {
    return response_success(res, 400, false, "resume needed", null);
  }

  // Check if the uploaded file is a PDF
  if (req.file.mimetype !== "application/pdf") {
    return response_success(
      res,
      400,
      false,
      "Only PDF files are allowed",
      null
    );
  }

  //pass the file buffer in cloudnary and then get the url of it
  //   const result = await uploadOnCloud(req.file.buffer);
  //   if (!result) {
  //     return response_success(
  //       res,
  //       400,
  //       false,
  //       "there is no result so not getting any url",
  //       null
  //     );
  //   }

  console.log(req.file);
};

export { createCandidateProfile };
