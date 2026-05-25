const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { uploadFile, getFile, listFiles } = require("../controllers/fileController");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", listFiles);
router.get("/:filename", getFile);

module.exports = router;