import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";

import Register from "./features/auth/pages/Register";

import ProtectedRoute from "./features/auth/pages/Protected";
import CampaignList from "./features/campaigns/pages/CampaignList";
import CampaignDetails from "./features/campaigns/pages/CampaignDetails";
import CreateCampaign from "./features/campaigns/pages/CreateCampaign";

const Dashboard = () => <h1>Dashboard</h1>;

const Feedback = () => <h1>Feedback</h1>;

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
    path: "/dashboard",

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
    path: "/feedback/:slug",

    element: <Feedback />,
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

}
]);
