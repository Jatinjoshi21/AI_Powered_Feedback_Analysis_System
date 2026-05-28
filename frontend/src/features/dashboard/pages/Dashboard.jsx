import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDashboard } from "../hooks/useDashboard";

import "../styles/Dashboard.scss";

export default function Dashboard() {
  const { id } = useParams();

  const {
    analytics,

    insights,

    loading,

    loadDashboard,
  } = useDashboard();

  useEffect(() => {
    loadDashboard(id);
  }, []);

  if (loading) {
    return <div className="dashboard__loading">Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* HEADER */}

      <div className="dashboard__header">
        <div>
          <h1>AI Feedback Dashboard</h1>

          <p>Track customer sentiment and actionable insights</p>
        </div>
      </div>

      {/* OVERVIEW CARDS */}

      <div className="dashboard__overview">
        <div className="overview-card">
          <span className="overview-card__label">Total Responses</span>

          <h2>{analytics?.totalResponses || 0}</h2>

          <p>Customer submissions collected</p>
        </div>

        <div className="overview-card">
          <span className="overview-card__label">Positive</span>

          <h2>{analytics?.sentiments?.positive || 0}</h2>

          <p>Positive customer experiences</p>
        </div>

        <div className="overview-card">
          <span className="overview-card__label">Negative</span>

          <h2>{analytics?.sentiments?.negative || 0}</h2>

          <p>Negative customer experiences</p>
        </div>

        <div className="overview-card">
          <span className="overview-card__label">Neutral</span>

          <h2>{analytics?.sentiments?.neutral || 0}</h2>

          <p>Neutral customer experiences</p>
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="dashboard__main">
        {/* LEFT SIDE */}

        <div className="dashboard__left">
          {/* EXECUTIVE SUMMARY */}

          <div className="dashboard__section">
            <div className="section-header">
              <h2>Executive Summary</h2>

              <span>AI Insights</span>
            </div>

            <p>{insights?.executiveSummary}</p>
          </div>

          {/* RECENT FEEDBACK */}

          <div className="dashboard__section">
            <div className="section-header">
              <h2>Recent Feedback</h2>
            </div>

            <div className="feedback-list">
              {analytics?.recentFeedback?.map((f) => (
                <div className="feedback-card" key={f._id}>
                  <p className="feedback-card__text">"{f.transcript}"</p>

                  <div className="feedback-card__footer">
                    <span>{f.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="dashboard__right">
          {/* CRITICAL ISSUES */}

          <div className="dashboard__section">
            <h2>Critical Issues</h2>

            <div className="dashboard-tags">
              {insights?.criticalIssues?.map((item, index) => (
                <div className="tag tag--danger" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* TOP STRENGTHS */}

          <div className="dashboard__section">
            <h2>Top Strengths</h2>

            <div className="dashboard-tags">
              {insights?.topStrengths?.map((item, index) => (
                <div className="tag tag--success" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RECOMMENDED ACTIONS */}

          <div className="dashboard__section">
            <h2>Recommended Actions</h2>

            <div className="action-list">
              {insights?.recommendedActions?.map((item, index) => (
                <div className="action-card" key={index}>
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING TOPICS */}

          <div className="dashboard__section">
            <h2>Trending Topics</h2>

            <div className="dashboard-tags">
              {insights?.trendingTopics?.map((item, index) => (
                <div className="tag" key={index}>
                  #{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
