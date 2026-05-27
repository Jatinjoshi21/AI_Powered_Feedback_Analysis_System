import "../styles/register.scss";

import { useState } from "react";

import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const { handleRegister, loading } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try{
        await handleRegister({username,email, password});
        navigate("/dashboard")
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="login">
      <div className="login__card">
        <h1>Register</h1>

        <form onSubmit={submit}>

            <div className="login__field">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>
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

          <button>{loading ? "Creating Account..." : "Register"}</button>
        </form>
      </div>
    </div>
  );
}
