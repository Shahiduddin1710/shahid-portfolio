const { uploadFileToStorage, getFileUrl, getAllFiles } = require("../services/storageService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const uploadFile = async (req, res) => {
  if (!req.file) {
    return sendError(res, "No file uploaded. Please attach a PDF.", 400);
  }

  const publicUrl = await uploadFileToStorage(
    req.file.buffer,
    req.file.originalname
  ).catch((err) => {
    sendError(res, err.message, 500);
    return null;
  });

  if (!publicUrl) return;

  sendSuccess(res, "File uploaded successfully", { url: publicUrl }, 201);
};

const getFile = async (req, res) => {
  const { filename } = req.params;

  const url = await getFileUrl(filename).catch((err) => {
    sendError(res, err.message, 500);
    return null;
  });

  if (!url && !res.headersSent) {
    return sendError(res, "File not found", 404);
  }

  if (!res.headersSent) {
    sendSuccess(res, "File URL fetched successfully", { url });
  }
};

const listFiles = async (req, res) => {
  const files = await getAllFiles().catch((err) => {
    sendError(res, err.message, 500);
    return null;
  });

  if (!res.headersSent) {
    sendSuccess(res, "Files fetched successfully", { files });
  }
};

module.exports = { uploadFile, getFile, listFiles };