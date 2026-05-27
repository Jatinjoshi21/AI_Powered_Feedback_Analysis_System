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

  if(loading){

return(

<div className="dashboard__loading">

Loading Dashboard...

</div>

);

}

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard__grid">
        <div className="dashboard__card">
          <h3>Responses</h3>

          <p>{analytics?.totalResponses || 0}</p>
        </div>

        <div className="dashboard__card">
          <h3>Positive</h3>

          <p>{analytics?.positive || 0}</p>
        </div>

        <div className="dashboard__card">
          <h3>Negative</h3>

          <p>{analytics?.negative || 0}</p>
        </div>
      </div>

      <div className="dashboard__section">
        <h2>Executive Summary</h2>

        <p>{insights?.executiveSummary}</p>
      </div>

      <div className="dashboard__section">
        <h2>Critical Issues</h2>

        <ul>
          {insights?.criticalIssues?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard__section">
        <h2>Recommended Actions</h2>

        <ul>
          {insights?.recommendedActions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
