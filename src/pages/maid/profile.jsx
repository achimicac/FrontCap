import { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";

function MaidProfile() {
  const [maid, setMaid] = useState({});

  const fetchMaid = async () =>
    await api
      .post("/api/v1/account/getMaid", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (res.data.success) setMaid(res.data.maid_data);
        // console.log(res.data.maid_data);
      });

  useEffect(() => {
    fetchMaid();
  }, []);


  const handleClick = () => {
    // navigate("edit");
    window.location.href = "http://localhost:5173/maid/profile/edit";
  };

  return <Profile user={maid} isMaid={true} clickEdit={handleClick} />;
}

export default MaidProfile;
