import { useState, useCallback, useContext } from "react";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import Alert from "../components/Alert";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    account: "",
    password: "",
  });
  const [alert, setAlert] = useState("");

  const login = async (value) => await api.post("/api/v1/account/login", value);

  const handleChange = useCallback(
    (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [user]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email: user.account, pass: user.password })
      .then((res) => {
        window.localStorage.setItem("authtoken", res.data.token);
        navigate("/" + res.data.payload.user.role + "/main");
      })
      .catch((err) => {
        setAlert(err.response.data.err);
        toast.error("กรุณาลองใหม่อีกครั้ง");
      });
  };

  return (
    <div className="login">
      <Alert />
      <main>
        <h1> ลงชื่อเข้าใช้ </h1>
        <form onSubmit={handleSubmit} className="login-container">
          <label
            onClick={() => {
              setAlert("");
            }}
          >
            <span>อีเมล</span>
            <input
              name="account"
              type="text"
              onChange={handleChange}
              autoComplete="off"
              value={user.account}
              required
            />
            <span
              style={
                alert === "acc"
                  ? { color: "red", "font-size": "14px" }
                  : { display: "none" }
              }
            >
              ไม่พบบัญชีผู้ใช้
            </span>
          </label>

          <label
            onClick={() => {
              setAlert("");
            }}
          >
            <span>รหัสผ่าน</span>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              autoComplete="off"
              value={user.password}
              required
            />
            <span
              style={
                alert === "pass"
                  ? { color: "red", "font-size": "14px" }
                  : { display: "none" }
              }
            >
              รหัสผ่านไม่ถูกต้อง
            </span>
          </label>
          <label className="non-account">
            <p>
              ยังไม่มีบัญชีผู้ใช้ &nbsp; <a href="/register">สร้างบัญชี</a>
            </p>
          </label>
          <button type="submit"> เข้าสู่ระบบ </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
