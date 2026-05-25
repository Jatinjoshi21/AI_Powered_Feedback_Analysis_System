const Campaign = require("../models/campaign.model");

const Feedback = require("../models/feedback.model");

const processFeedback = require("../services/processFeedback");

const transcribe = require("../services/transcribeAudio");

const analyzeSentiment = require("../services/analyzeSentiment");

const enrichFeedback = require("../services/enrichFeedback");

async function submitFeedback(req, res) {
  try {
    const { slug } = req.params;

    const campaign = await Campaign.findOne({
      slug,

      isActive: true,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign unavailable",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Audio required",
      });
    }

    const transcript = await transcribe(req.file.buffer);

    const sentiment = await analyzeSentiment(transcript);

    const enrichment = await enrichFeedback(transcript);

    const feedback = await Feedback.create({
      campaignId: campaign._id,

      transcript: transcript,

      sentimentLabel: sentiment.sentimentLabel,

      sentimentScore: sentiment.sentimentScore,

      summary: enrichment.summary,

      topics: enrichment.topics,

      keywords: enrichment.keywords,

      intent: enrichment.intent,

      urgency: enrichment.urgency,

      status: "processed",
    });

    return res.status(201).json({
      message: "Feedback submitted",
      feedback,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  submitFeedback,
};
