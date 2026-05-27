import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",

  withCredentials: true,
});

export async function getAnalytics(campaignId) {
  const response = await API.get(`/campaigns/${campaignId}/analytics`);

  return response.data;
}

export async function getInsights(campaignId) {
  const response = await API.get(`/campaigns/${campaignId}/insights`);

  return response.data;
}
