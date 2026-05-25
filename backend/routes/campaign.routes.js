const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  getPublicCampaign,
  generateCampaignQR,
  getAnalytics,
  getInsights,
} = require("../controllers/campaign.controller.js");

router.post("/", auth.isAuthenticated, createCampaign);
router.get("/", auth.isAuthenticated, getCampaigns);
router.get("/:id", auth.isAuthenticated, getCampaign);
router.patch("/:id", auth.isAuthenticated, updateCampaign);

router.delete("/:id", auth.isAuthenticated, deleteCampaign);

router.get("/public/:slug", getPublicCampaign);

router.get("/:id/qr", auth.isAuthenticated, generateCampaignQR);

router.get(
  "/:id/analytics",

  auth.isAuthenticated,

  getAnalytics,
);

router.get(

"/:id/insights",

auth.isAuthenticated,

getInsights

);

module.exports = router;
