import { useState } from "react";

import { getAnalytics, getInsights } from "../services/dashboard.api";

export function useDashboard() {
  const [analytics, setAnalytics] = useState(null);

  const [insights, setInsights] = useState(null);

  const [loading, setLoading] = useState(false);

  async function loadDashboard(campaignId) {
    try {
      setLoading(true);

      const [analyticsData, insightsData] = await Promise.all([
        getAnalytics(campaignId),

        getInsights(campaignId),
      ]);

      

      setAnalytics(analyticsData);

      setInsights(insightsData);
    } finally {
      setLoading(false);
    }
  }

  return {
    analytics,

    insights,

    loading,

    loadDashboard,
  };
}
