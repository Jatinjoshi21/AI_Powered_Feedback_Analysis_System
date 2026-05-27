import { useContext, useEffect } from "react";

import { AuthContext } from "../store/auth.store";

import { login, logout, register, getMe } from "../services/auth.api";

export function useAuth() {
  const { loading, user, setUser, setLoading } = useContext(AuthContext);

  async function handleLogin({ username, email, password }) {
    try {
      setLoading(true);
      const result = await login({ username, email, password });
      setUser(result.user);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  async function handleRegister({ username, email, password }) {
    try {
      setLoading(true);
      const result = await register({ username, email, password });
      setUser(result.user);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  async function handleLogout() {
    try {
      setLoading(true);
      const result = await logout();
      setUser(null);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  async function getUser() {
    try {
      setLoading(true);
      const result = await getMe();
      setUser(result.user);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  useEffect(() => {
    async function loadUser() {
      try {
        await getUser();
      } catch (err) {
        console.log(err);
      }
    }

    loadUser();
  }, []);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    getUser,
    loading,
    user,
  };
}
