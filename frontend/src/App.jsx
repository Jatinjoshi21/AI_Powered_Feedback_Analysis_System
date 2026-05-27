import React from "react";

import { RouterProvider } from "react-router-dom";

import { router } from "./app.routes";

import { AuthProvider } from "./features/auth/store/auth.store";

import { AuthContext } from "./features/auth/store/auth.store";
import { CampaignProvider } from "./features/campaigns/store/campaign.store";



export default function App() {
  return (
    <AuthProvider>
      <CampaignProvider>

      <RouterProvider router={router} />
      </CampaignProvider>
    </AuthProvider>
  );
}
