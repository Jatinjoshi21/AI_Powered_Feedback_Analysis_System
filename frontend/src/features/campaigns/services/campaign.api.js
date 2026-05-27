import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",

  withCredentials: true,
});

export async function getCampaigns() {
  const response = await API.get("/campaigns/");

  return response.data;
}

export async function createCampaign(data) {
  const response = await API.post(
    "/campaigns/",

    data,
  );

  return response.data;
}

export async function getCampaign(id) {
  const response = await API.get(`/campaigns/${id}`);

  return response.data;
}

export async function generateQR(id) {
  const response = await API.get(`/campaigns/${id}/qr`);

  return response.data;
}

export async function getQR(id) {
  const response = await API.get(`/campaigns/${id}/qr`);

  return response.data;
}
