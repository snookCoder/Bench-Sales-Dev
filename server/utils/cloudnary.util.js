// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import { response_success } from "./response.utils.js";
// dotenv.config();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret,
// });

// // Function to upload a file to Cloudinary
// const uploadOnCloud = (fileBuffer, res) => {
//   return new Promise((resolve, reject) => {
//     try {
//       if (!fileBuffer) {
//         reject(console.log("file buffer is needed"));
//       }

//       const stream = cloudinary.uploader.upload_stream(
//         { resource_type: "auto" }, // Automatically detect the file type
//         (err, result) => {
//           if (err) {
//             reject(console.log("error in cloudnary api ", err));
//           } else {
//             console.log("Result from Cloudinary:", result);
//             resolve(result); // Resolve the promise with the result
//           }
//         }
//       );

//       // End the stream with the file buffer
//       stream.end(fileBuffer);
//     } catch (error) {
//       reject(
//         response_success(
//           res,
//           500,
//           false,
//           "Error in Cloudinary upload in catch block",
//           error.message
//         )
//       );
//     }
//   });
// };

// export { uploadOnCloud };
