import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function submitFeedback(slug, formData) {
  const response = await API.post(
    `/feedback/${slug}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
