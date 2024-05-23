import { useState, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import "./styles/login.css";
import useAuth from "../Auth/useAuth";

function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    account: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setMessage] = useState("");

  const login = async (value) =>
    await axios.post("http://localhost:5000/api/v1/account/login", value);

  const handleChange = useCallback(
    (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [user]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email: user.account, pass: user.password }).then((res) => {
      setAuth({
        role: res.data.payload.user.role,
        user: res.data.payload.user.email,
      });
      navigate("/" + res.data.payload.user.role + "/main");
    });
  };

  return (
    <div className="login">
      <Popup
        alert={alert}
        message={alertMessage}
        clickCancel={() => {
          setAlert(false);
        }}
      />
      <main>
        <h1> LogIn </h1>
        <form onSubmit={handleSubmit} className="login-container">
          <label>
            <span>Email or Telephone Number</span>
            <input
              name="account"
              type="text"
              onChange={handleChange}
              autoComplete="off"
              value={user.telephone}
              //placeholder="xxx-xxx-xxxx"
              //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              //maxLength={10}
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              autoComplete="off"
              value={user.password}
              required
            />
          </label>

          <button type="submit"> Login </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
