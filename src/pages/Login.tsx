import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import { apiClient } from "../api/apiClient";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const submit = () => {
    console.log("submitted");

    apiClient
      .post("login", user)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("credentials", JSON.stringify(user));
          toast.success("Sikeres bejelentkezés");
          navigate("/");
        }else{
            toast.error("Sikertelen bejelentkezés")
        }
      })
      .catch(() => toast.error("Sikertelen bejelentkezés"));
  };

  return (
    <>
      <div style={{ width: 400, margin: "auto" }}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>
          Login
        </button>
      </div>
    </>
  );
};
export default Login;
