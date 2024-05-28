import { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import { useNavigate } from "react-router-dom";
import api from "../../axios";

function UserProfile() {
  const navigate = useNavigate();

      const [user, setUser] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap",
            birthday: '12-09-2003',  
            role: 'user' ,
            tel: '0925097833',
            email: 'atchi@gmail.com'
      });
  
  const fetchUser = async () =>
    await api
      .post("/api/v1/account/getAccount", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
      });

  useEffect(() => {
    fetchUser();
  }, []);

  const handleClick = () => {
    navigate("edit");
  };

  return (
    <>
      <Profile user={user} isMaid={false} clickEdit={handleClick} />
    </>
  );
}

export default UserProfile;
