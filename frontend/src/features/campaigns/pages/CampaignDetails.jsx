import { useEffect, useState } from "react";

import "../styles/CampaignDetails.scss"

import { Link, useParams } from "react-router-dom";

import { useCampaign } from "../hooks/useCampaign";

import { useNavigate } from "react-router-dom";

export default function CampaignDetails() {

    const navigate = useNavigate();

  const { id } = useParams();

  const {
    loadCampaign,
    generateQR,
  } = useCampaign();

  const [campaign, setCampaign] = useState(null);

  const [qr, setQr] = useState(null);

  useEffect(() => {
    async function init() {
      const result = await loadCampaign(id);

      setCampaign(result);
    }

    

    init();
  }, []);


  async function createQR() {
    const result = await generateQR(id);

    setQr(result.feedbackUrl);
  }

  if (!campaign) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <div className="details__card">
        <div className="details__header">
          <div>
            <h1 className="details__title">{campaign.title}</h1>
          </div>

          <div className="details__status">Active</div>
        </div>

        <p className="details__desc">{campaign.description}</p>

        <div className="details__actions">
          <button className="details__primary" onClick={createQR}>
            Generate QR
          </button>

          <button className="details__secondary" onClick={() => { navigate(`/dashboard/${id}`); }}>View Analytics</button>
        </div>

        {qr && (
          <div className="details__qr">
            <Link to={ `${qr}` } >Click to give Feedback</Link>
          </div>
        )}
      </div>
    </div>
  );
}
