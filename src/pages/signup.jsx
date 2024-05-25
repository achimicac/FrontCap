import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import "./styles/signup.css";
import ManageJob from "../components/ManageJob";

function Signup() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [jobchoices, setJobchoices] = useState([
    { job_id: 1, job_name: "กวาดบ้าน" },
    { job_id: 2, job_name: "ถูบ้าน" },
    { job_id: 3, job_name: "ล้างจาน" },
    { job_id: 4, job_name: "ซักผ้า" },
    { job_id: 5, job_name: "จัดห้อง" },
    { job_id: 6, job_name: "รดน้ำต้นไม้" },
  ]);
  const [user, setUser] = useState({
    role: "",
    firstname: "",
    lastname: "",
    birthday: "",
    telephone: "",
    email: "",
    password: "",
    user_pic: null,
    jobtype: [],
  });
  const userImg = useRef(null);
  const [cfpw, setCfpw] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setMessage] = useState("");

  const handleChange = useCallback(
    (e) => {
      if (e.target.name === "user_pic") {
        const file = e.target.files[0];
        setUser({ ...user, [e.target.name]: file });
      } else if (e.target.name === "jobtype") {
        const [valueId, valueName] = e.target.value.split("-");
        const jobTypeId = parseInt(valueId, 10);
        if (e.target.checked) {
          setUser((prevMaid) => ({
            ...prevMaid,
            jobtype: [
              ...prevMaid.jobtype,
              { job_id: jobTypeId, job_name: valueName },
            ],
          }));
        } else {
          setUser((prevMaid) => ({
            ...prevMaid,
            jobtype: prevMaid.jobtype.filter((job) => job.job_id !== jobTypeId),
          }));
        }
      } else {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    },
    [user]
  );
  const isMatch = user.password === cfpw;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in user) {
        formData.append(key, user[key]);
      }

      const { adduser } = await axios.post("/api/signup", user);

      if (!adduser.data.success) {
        setMessage(adduser.text);
        setAlert(true);
        return;
      }

      for (const key in user) {
        formData.append(key, "");
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickImg = () => {
    userImg.current.click();
  };

  const nextPage = () => {
    setPage(1);
  };

  console.log(user);

  return (
    <div className="signup-wrapper">
      <Popup
        alert={alert}
        message={alertMessage}
        clickCancel={() => {
          setAlert(false);
        }}
      />

      <div className="signup-container">
        <div className="form-container">
          <form>
            {page === 0 && (
              <section className="signup-form">
                <h1
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "#00897B",
                  }}
                >
                  Sign Up
                </h1>
                <figure
                  onClick={handleClickImg}
                  style={{ textAlign: "center" }}
                >
                  <label>
                    {user.user_pic ? (
                      <img
                        src={URL.createObjectURL(userImg.current.files[0])}
                        style={{ width: "30vw" }}
                      />
                    ) : (
                      <img src="Making.jpg" style={{ width: "50vw" }} />
                    )}
                    <input
                      name="user_pic"
                      type="file"
                      ref={userImg}
                      style={{ display: "none" }}
                      onChange={handleChange}
                    ></input>
                  </label>
                </figure>

                <div className="radio-wrapper">
                  <span style={{ marginBottom: "6px" }}>Select your role</span>
                  <div className="radio-options">
                    <label className="radio-container">
                      Maid
                      <input
                        type="radio"
                        checked="checked"
                        name="role"
                        onChange={handleChange}
                        autoComplete="off"
                        value="maid"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="radio-container">
                      User
                      <input
                        type="radio"
                        checked="checked"
                        name="role"
                        onChange={handleChange}
                        autoComplete="off"
                        value="user"
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>

                <label>
                  Firstname
                  <input
                    name="firstname"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.firstname}
                    //required
                  />
                </label>

                <label>
                  Lastname
                  <input
                    name="lastname"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.lastname}
                    //required
                  />
                </label>

                <label>
                  Birthday
                  <input
                    name="birthday"
                    type="date"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.birthday}
                    //required
                  />
                </label>

                <label>
                  Telephone
                  <input
                    name="telephone"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.telephone}
                    //placeholder="xxx-xxx-xxxx"
                    //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    maxLength={10}
                    //required
                  />
                </label>

                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.email}
                    //required
                  />
                </label>

                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.password}
                    //required
                  />
                </label>

                <label>
                  Confirm Password
                  <input
                    name="cfpw"
                    type="password"
                    onChange={(e) => setCfpw(e.target.value)}
                    autoComplete="off"
                    value={cfpw}
                    //required
                  />
                  <p style={isMatch ? { display: "none" } : {}}>
                    {" "}
                    Password is not Match!
                  </p>
                </label>
              </section>
            )}

            <div
              style={{
                width: "70vw",
                margin: "0 auto",
                paddingBottom: "72px",
              }}
            >
              {page === 1 && (
                <section className="addjob-form">
                  <ManageJob user={user} handleChange={handleChange} />
                </section>
              )}

              {page === 0 && user.role === "maid" && (
                <button type="button" onClick={nextPage}>
                  {" "}
                  Next{" "}
                </button>
              )}
              {((page === 0 && user.role === "user") || page === 1) && (
                <button type="submit" onClick={handleSubmit}>
                  {" "}
                  Sign Up{" "}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;