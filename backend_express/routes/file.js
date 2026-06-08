const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const fileController = require("../controllers/fileController");

router.use(verifyToken);

router.get("/", fileController.file_list);
router.post("/upload", upload.single("file"), fileController.file_upload);
router.get("/:id/download", fileController.file_download);
router.delete("/:id", fileController.file_delete);

module.exports = router;