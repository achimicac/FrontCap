import { useState, useEffect, useCallback } from "react";
import ProfileEdit from "../../components/ProfileEdit";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";
import api from "../../axios";

function UserProfileEdit() {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [inputOldPass, setInputOldPass] = useState("");
  const [isOldPass, setOldPass] = useState(false);
  
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertCancel, setAlertCancel] = useState(false);

  const fetchUser = async () =>
    await api
      .post("/api/v1/account/getAccount", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
      });

  const uploadImage = async (_fileImage) => {
    const formData = new FormData();
    formData.append("image", _fileImage);
    formData.append("token", window.localStorage.getItem("authtoken"));
    await api
      .post("/api/v1/account/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then((res) => {
        if (res.data.success)
          setUser({ ...user, ["user_pic"]: res.data.imageName });
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    checkOldPass(inputOldPass);
  }, [inputOldPass]);

  useEffect(() => {
    if (isOldPass) {
      setUser({ ...user, ["checkPass"]: isOldPass });
      // console.log({ ...user, ["checkPass"]: isOldPass });
      setOldPass(false);
    }
  }, [isOldPass]);

  const checkOldPass = async (_oldPass) => {
    // console.log(_oldPass);checkOldPass(oldPass);
    const check_old_pass = {
      token: window.localStorage.getItem("authtoken"),
      oldPass: _oldPass,
    };

    await api
      .post("/api/v1/account/checkOldPass", check_old_pass)
      .then((res) => {
        if (res.data.success && res.data.check_pass) {
          setOldPass(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = useCallback(
    (e) => {
      if (e.target.name === "oldpass") {
        const oldPass = e.target.value;
        setUser({ ...user, ["oldpass"]: oldPass });
        // console.log({ ...user, ["oldpass"]: oldPass });
        setInputOldPass(oldPass);
      } else {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    },
    [user]
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  const handleClickConfirmOK = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const updateData = {
        user_pic: user.user_pic,
        user_role: user.user_role,
        firstname: user.firstname,
        lastname: user.lastname,
        user_gender: user.user_gender,
        birthday: user.birthday,
        email: user.email,
        pass: user.pass,
        tel: user.tel,
        description: user.description,
      };
      await api.post("/api/v1/account/editCustomerProfile", updateData);

      navigate(-1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickCancelOK = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertConfirm(true);
  };

  const handleClickCancel = () => {
    setAlertCancel(true);
  };

  return (
    <>
      <Popup
        alert={alertConfirm}
        message={"ต้องการยืนยันการแก้ไข ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertConfirm(false);
        }}
        clickOK={handleClickConfirmOK}
      />
      <Popup
        alert={alertCancel}
        message={"ต้องการยกเลิกการแก้ไข ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertCancel(false);
        }}
        clickOK={handleClickCancelOK}
      />

      <form>
        {user && (
          <ProfileEdit
            user={user}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            clickSubmit={handleSubmit}
            clickCancel={handleClickCancel}
          />
        )}
      </form>
    </>
  );
}

export default UserProfileEdit;
