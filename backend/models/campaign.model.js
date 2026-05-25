const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
    },

    prompt: {
      type: String,
      default: "Tell us your feedback",
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Campaign", campaignSchema);
