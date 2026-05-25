const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload.middleware");

const { submitFeedback } = require("../controllers/feedback.controller");

router.post(
  "/:slug",

  upload.single("audio"),

  submitFeedback,
);

module.exports = router;
