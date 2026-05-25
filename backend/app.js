require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route.js");
const campaignRoutes = require("./routes/campaign.routes.js");
const feedbackRoutes = require("./routes/feedback.routes.js");

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/feedback", feedbackRoutes);

module.exports = app;
