import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";

import Register from "./features/auth/pages/Register";

import ProtectedRoute from "./features/auth/pages/Protected";
import CampaignList from "./features/campaigns/pages/CampaignList";
import CampaignDetails from "./features/campaigns/pages/CampaignDetails";
import CreateCampaign from "./features/campaigns/pages/CreateCampaign";
import Feedback from "./features/feedback/pages/Feedback";
import Dashboard from "./features/dashboard/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <Login />,
  },

  {
    path: "/register",

    element: <Register />,
  },

  {
    path: "/dashboard/:id",

    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/campaigns",

    element: (
      <ProtectedRoute>
        <CampaignList/>
      </ProtectedRoute>
    ),
  },

  {

path:

"/campaigns/:id",

element:

<ProtectedRoute>

<CampaignDetails/>

</ProtectedRoute>

},

{

path:

"/campaigns/create",

element:

<ProtectedRoute>

<CreateCampaign/>

</ProtectedRoute>

},

{

path:

"/feedback/:slug",

element:
<Feedback/>

}
]);
