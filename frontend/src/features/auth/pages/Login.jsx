import "../styles/login.scss";

import { useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const { handleLogin, loading } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try{
        await handleLogin({email, password});
        navigate("/dashboard")
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="login">
      <div className="login__card">
        <h1>VoicePulse</h1>

        <p>Turn voice into insights</p>

        <form onSubmit={submit}>
          <div className="login__field">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="login__field">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}
