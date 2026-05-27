import { useContext, useState } from "react";

import { CampaignContext } from "../store/campaign.store";

import { getCampaigns, createCampaign, getCampaign, getQR } from "../services/campaign.api";

export function useCampaign() {
  const {
    campaigns,

    setCampaigns,
  } = useContext(CampaignContext);

  const [loading, setLoading] = useState(false);

  async function loadCampaigns() {
    try {
      setLoading(true);
      const result = await getCampaigns();
      setCampaigns(result.campaigns);
    } finally {
      setLoading(false);
    }
  }

  async function addCampaign(data) {
    try {
      setLoading(true);

      const result = await createCampaign(data);

      setCampaigns((prev) => [result, ...prev]);
    } finally {
      setLoading(false);
    }
  }

  async function loadCampaign(id) {
    const result = await getCampaign(id);

    return result.campaign;
  }

  async function generateQR(id) {
    const result = await getQR(id);

    return result;
  }

  return {
    campaigns,

    loadCampaigns,

    addCampaign,

    loadCampaign,

    generateQR,
  };
}
