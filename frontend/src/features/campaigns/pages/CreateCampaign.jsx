import "../styles/CreateCampaign.scss";

import {
useNavigate
}
from "react-router-dom";

import {
useCampaign
}
from "../hooks/useCampaign";

import CampaignForm
from "../components/CampaignForm";

export default function CreateCampaign(){

const {

addCampaign,

loading

}

=
useCampaign();

const navigate =
useNavigate();

async function submit(
data
){

await addCampaign(
data
);

navigate(
"/campaigns"
);

}

return(

<div className="create">

<div className="create__card">

<div className="create__header">

<h1>

Create Campaign

</h1>

<p>

Create a campaign and collect voice insights

</p>

</div>

<CampaignForm

submit={
submit
}

loading={
loading
}

/>

</div>

</div>

);

}