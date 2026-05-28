const Campaign = require("../models/campaign.model");

const generateSlug = require("../services/slag.service.js");

const Feedback = require("../models/feedback.model");

const generateInsights = require("../services/generateInsights.js");

const QRCode = require("qrcode");

async function createCampaign(req, res) {
  try {
    const { title, description, prompt } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title required",
      });
    }

    const slug = generateSlug(title);

    const campaign = await Campaign.create({
      owner: req.user.id,

      title,

      description,

      prompt,

      slug,
    });

    return res.status(201).json({
      message: "Campaign created",

      campaign,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function getCampaigns(req, res) {
  try {
    const campaigns = await Campaign.find({
      owner: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      campaigns,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function getCampaign(req, res) {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOne({
      _id: id,

      owner: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      campaign,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function updateCampaign(req, res) {
  try {
    const { id } = req.params;

    const updates = req.body;

    delete updates.slug;
    delete updates.owner;

    const campaign = await Campaign.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,
      },

      updates,

      {
        new: true,
        runValidators: true,
      },
    );

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      message: "Campaign updated",

      campaign,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function deleteCampaign(req, res) {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOneAndDelete({
      _id: id,

      owner: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      message: "Campaign deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function getPublicCampaign(req, res) {
  try {
    const { slug } = req.params;

    const campaign = await Campaign.findOne({
      slug,

      isActive: true,
    }).select("title description prompt slug");

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign unavailable",
      });
    }

    return res.status(200).json({
      campaign,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function generateCampaignQR(req, res) {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOne({
      _id: id,

      owner: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    const feedbackUrl = `${process.env.FRONTEND_URL}/feedback/${campaign.slug}`;

    const qr = await QRCode.toDataURL(feedbackUrl);

    return res.status(200).json({
      feedbackUrl,

      qr,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function getAnalytics(req, res) {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOne({
      _id: id,

      owner: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    const feedback = await Feedback.find({
      campaignId: id,

      status: "processed",
    });

    const total = feedback.length;

    const sentiments = {
      positive: 0,

      neutral: 0,

      negative: 0,
    };

    let score = 0;

    feedback.forEach((item) => {
      sentiments[item.sentimentLabel]++;

      score += item.sentimentScore;
    });

    const avg = total ? score / total : 0;

    return res.status(200).json({
      totalResponses: total,

      sentiments,

      averageScore: avg,

      recentFeedback: feedback.slice(-3).map((f) => ({
        transcript: f.transcript,

        sentiment: f.sentimentLabel,
      })),
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function getInsights(req, res) {
  try {
    const feedback = await Feedback.find({
      campaignId: req.params.id,

      status: "processed",
    })

      .select(
        `
summary
sentimentLabel
topics
intent
urgency
`,
      )

      .sort({
        createdAt: -1,
      })

      .limit(100);

    if (feedback.length === 0) {
      return res.json({
        message: "No feedback yet",
      });
    }

    const insights = await generateInsights(feedback);

    return res.json(insights);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  getPublicCampaign,
  generateCampaignQR,
  getAnalytics,
  getInsights,
};
