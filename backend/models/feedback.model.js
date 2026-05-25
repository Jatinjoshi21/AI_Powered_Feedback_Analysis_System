const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Campaign",

      required: true,
    },

    transcript: {
      type: String,

      default: "",
    },

    sentimentLabel: {
      type: String,

      enum: ["positive", "neutral", "negative"],

      default: "neutral",
    },

    sentimentScore: {
      type: Number,

      default: 0,
    },

    summary:{
type:String
},

topics:[
String
],

keywords:[
String
],

intent:{
type:String
},

urgency:{
type:String
},

    status: {
      type: String,

      enum: ["pending", "processing", "processed", "failed"],

      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("Feedback", feedbackSchema);
