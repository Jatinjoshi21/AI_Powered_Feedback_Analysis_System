import { createContext, useState } from "react";

export const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        setCampaigns,
        loading,
        setLoading
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}
