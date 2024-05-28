import { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";

function MaidProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: 1,
    firstname: "atchima",
    lastname: "nateepradap",
    birthday: "12-09-2003",
    role: "user",
  });

  const [jobs, setJobs] = useState([
    { job_id: 1, job_name: "กวาดบ้าน" },
    { job_id: 2, job_name: "ถูบ้าน" },
    { job_id: 3, job_name: "ล้างจาน" },
  ]);

  const [maid, setMaid] = useState({
    id: 1,
    firstname: "atchima",
    lastname: "nateepradap",
    birthday: "12-09-2003",
    jobtype: [
      { job_id: 1, job_name: "กวาดบ้าน" },
      { job_id: 2, job_name: "ถูบ้าน" },
      { job_id: 3, job_name: "ล้างจาน" },
    ],
    role: "maid",
    email: "maidmail@gmail.com",
    description:
      "I love my household. I can do everything, So you can employ me just enter employ button",
  });
  //const [maid, setMaid] = useState();

  const fetchUser = async () =>
    await api
      .post("/api/v1/account/getAccount", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
        console.log(res.data.user);
      });

  const fetchUserJob = async () =>
    await api
      .post("/api/v1/userJob/Userjobs", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (res.data.success) setJobs(res.data.jobs);

      });

  useEffect(() => {
    fetchUser();
    fetchUserJob();
  }, []);

  useEffect(() => {
    const maid_data = {
      user_role: user.user_role,
      user_gender: user.user_gender,
      user_pic: user.user_pic,
      firstname: user.firstname,
      lastname: user.lastname,
      birthday: user.birthday,
      tel: user.tel,
      email: user.email,
      pass: null,
      description: user.description,
      jobs: jobs,
    };
    setMaid(maid_data);
    console.log(maid_data);
  }, [user]);

  const handleClick = () => {
    navigate("edit");
  };

  return <Profile user={maid} isMaid={true} clickEdit={handleClick} />;
}

export default MaidProfile;
