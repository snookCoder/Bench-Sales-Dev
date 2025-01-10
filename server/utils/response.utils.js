//success response common util function

const response_success = async (res, code, success, message, payload) => {
  return res.status(code).json({ success, message, payload });
};

export { response_success };
