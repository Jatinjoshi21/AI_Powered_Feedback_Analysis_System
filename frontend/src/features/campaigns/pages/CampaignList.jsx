import "../styles/CampaignList.scss";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useCampaign } from "../hooks/useCampaign";

export default function CampaignList() {
  const {
    campaigns,

    loadCampaigns,
  } = useCampaign();

  const navigate = useNavigate();

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <div className="campaigns">
      <div className="campaigns__header">
        <div>
          <h1>Campaigns</h1>

          <p>Manage and monitor campaigns</p>
        </div>

        <button onClick={() => navigate("/campaigns/create")}>+ Create</button>
      </div>

      {campaigns.length === 0 ? (
        <div className="campaigns__empty">No campaigns yet</div>
      ) : (
        <div className="campaigns__grid">
          {campaigns.map((item) => (
            <div
              key={item._id}
              className="campaign-card"
              onClick={() => navigate(`/campaigns/${item._id}`)}
            >
              <h2>{item.title}</h2>

              <p>{item.description || "No description"}</p>

              <div className="campaign-card__footer">View →</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
