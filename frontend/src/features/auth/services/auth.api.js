import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export async function login({email, password}) {
  const response = await API.post(
    "/auth/login",

    {email, password},
  );

  return response.data;
}

export async function register({username, email, password}) {
  const response = await API.post(
    "/auth/register",

    {username, email, password},
  );

  return response.data;
}

export async function logout() {
  const response = await API.get(
    "/auth/logout",
  );

  return response.data;
}

export async function getMe() {
  const response = await API.get(
    "/auth/get-me",
  );

  return response.data;
}