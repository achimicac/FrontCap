import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

import ManageJob from "../components/ManageJob";
import Map from "../components/Map";

function Register() {
  const navigate = useNavigate();

  const fetchJobs = async () =>
    await axios.get("http://localhost:5000/api/v1/job");

  const [page, setPage] = useState(0);
  const [jobchoices, setJobchoices] = useState({ job_id: "", job_name: "" });
  const [user, setUser] = useState({
    user_role: "",
    user_gender: "",
    user_pic: null,
    firstname: "",
    lastname: "",
    birthday: "",
    tel: "",
    email: "",
    pass: "",
    jobs: [],
    latitude: "",
    longitude: "",
    minfo: "",
  });
  const userImg = useRef(null);
  const [cfpw, setCfpw] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setMessage] = useState("");
  const [showMap, setShowMap] = useState(false);
  const isMatch = user.pass === cfpw;

  useEffect(() => {
    fetchJobs().then((res) => {
      setJobchoices(res.data);
    });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, files, checked } = e.target;

    if (name === "user_pic") {
      const file = files[0];
      setUser((prevUser) => ({ ...prevUser, user_pic: file }));
    } else if (name === "jobs") {
      const [valueId, valueName] = value.split("-");
      const jobsId = parseInt(valueId, 10);
      setUser((prevUser) => ({
        ...prevUser,
        jobs: checked
          ? [...prevUser.jobs, { job_id: jobsId, job_name: valueName }]
          : prevUser.jobs.filter((job) => job.job_id !== jobsId),
      }));
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const result1 = await axios.post(
        "http://localhost:5000/api/v1/account/register",
        {
          user_role: user.user_role,
          user_gender: user.user_gender,
          firstname: user.firstname,
          lastname: user.lastname,
          birthday: user.birthday,
          tel: user.tel,
          email: user.email,
          pass: user.pass,
        }
      );

      const result2 = await axios.post(
        "http://localhost:5000/api/v1/address/addAddress",
        {
          email: user.email,
          latitude: user.latitude,
          longitude: user.longitude,
          minfo: user.minfo,
        }
      );
      if (user.user_role === "maid") {
        const result3 = await axios.post(
          "http://localhost:5000/api/v1/maidJob/addMaidjobs",
          {
            email: user.email,
            jobs: user.jobs,
          }
        );

        const result4 = await axios.post(
          "http://localhost:5000/api/v1/rating/addRatings",
          {
            email: user.email,
          }
        );
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

  const SelectLocation = () => {
    setShowMap(!showMap);
  };

  const handleLocation = (latitude, longitude) => {
    setUser((prevState) => ({
      ...prevState,
      latitude: latitude,
      longitude: longitude,
    }));
  };

  return (
    <>
      <Popup
        alert={alert}
        message={alertMessage}
        clickCancel={() => {
          setAlert(false);
        }}
      />
      {showMap && (
        <div className="map-container">
          <Map handleLocation={handleLocation} show={showMap} />
        </div>
      )}

      <div className="signup-container">
        <div className="form-container"></div>
        <form className={showMap ? "blurred" : ""}>
          {page === 0 && (
            <section className="signup-form">
              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#00897B",
                }}
              ></h1>
              <figure onClick={handleClickImg}>
                <label>
                  {user.user_pic ? (
                    <img
                      src={URL.createObjectURL(userImg.current.files[0])}
                      style={{ width: "50vw" }}
                    />
                  ) : (
                    <img src={"/sudlore.png"} style={{ width: "30vw" }} />
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

              <label>
                Role
                <label>
                  <input
                    name="user_role"
                    type="radio"
                    onChange={handleChange}
                    autoComplete="off"
                    value="user"
                  />
                </label>
                user
                <label>
                  <input
                    name="user_role"
                    type="radio"
                    onChange={handleChange}
                    autoComplete="off"
                    value="maid"
                  />
                </label>
                maid
              </label>

              <label>
                Gender
                <label>
                  <input
                    name="user_gender"
                    type="radio"
                    onChange={handleChange}
                    autoComplete="off"
                    value="male"
                  />
                </label>
                Male
                <label>
                  <input
                    name="user_gender"
                    type="radio"
                    onChange={handleChange}
                    autoComplete="off"
                    value="female"
                  />
                </label>
                Female
                <label>
                  <input
                    name="user_gender"
                    type="radio"
                    onChange={handleChange}
                    autoComplete="off"
                    value="lgbtq"
                  />
                </label>
                LGBTQ+
              </label>

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
                Tel
                <input
                  name="tel"
                  type="text"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.tel}
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
                Address
                <label> Latitude : {user.latitude}</label>
                <label> Longitude : {user.longitude}</label>
                <button type="button" onClick={SelectLocation}>
                  Show Map
                </button>
                <label>
                  More Information
                  <input
                    name="minfo"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.minfo}
                  />
                </label>
              </label>

              <label>
                Pass
                <input
                  name="pass"
                  type="password"
                  onChange={handleChange}
                  autoComplete="off"
                  value={user.pass}
                  //required
                />
              </label>

              <label>
                Confirm Pass
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
                  Pass is not Match!
                </p>
              </label>

              {page === 0 && user.user_role === "maid" && (
                <button type="button" onClick={nextPage}>
                  {" "}
                  Next{" "}
                </button>
              )}
              {((page === 0 && user.user_role === "user") || page === 1) && (
                <button type="submit" onClick={handleSubmit}>
                  {" "}
                  Sign Up{" "}
                </button>
              )}
            </section>
          )}

          {page === 1 && (
            <section className="addjob-form">
              <ManageJob
                user={user}
                handleChange={handleChange}
                jobchoices={jobchoices}
              />
            </section>
          )}

          {page === 0 && user.user_role === "maid" && (
            <button type="button" onClick={nextPage}>
              {" "}
              Next{" "}
            </button>
          )}
          {((page === 0 && user.user_role === "user") || page === 1) && (
            <button type="submit" onClick={handleSubmit}>
              {" "}
              Sign Up{" "}
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
