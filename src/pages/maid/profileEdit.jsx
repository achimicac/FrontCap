import { useState, useEffect, useCallback } from "react";
import ProfileEdit from "../../components/ProfileEdit";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";
import ManageJob from "../../components/ManageJob";
import api from "../../axios";
import "./styles/blurBackground.css";

function MaidProfileEdit() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const [maid, setMaid] = useState({});

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
        fetchUserJob();
      });

  const fetchUserJob = async () =>
    await api
      .post("/api/v1/userJob/Userjobs", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (res.data.success) setJobs(res.data.jobs);
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
          setMaid({ ...maid, ["user_pic"]: res.data.imageName });
      });
  };

  useEffect(() => {
    checkOldPass(inputOldPass);
  }, [inputOldPass]);

  useEffect(() => {
    if (isOldPass) {
      setMaid({ ...maid, ["checkPass"]: isOldPass });
      setOldPass(false);
    }
  }, [isOldPass]);

  useEffect(() => {
    fetchUser();
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
      oldpass: "",
      description: user.description,
      jobs: jobs,
    };
    setMaid(maid_data);
        console.log(maid_data);
  }, [user]);

  const checkOldPass = async (_oldPass) => {
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
        setMaid({ ...maid, ["oldpass"]: oldPass });
        setInputOldPass(oldPass);
      } else if (e.target.name === "jobs") {
        const [valueId, valueName] = e.target.value.split("-");
        const jobTypeId = parseInt(valueId, 10);
        if (e.target.checked) {
          setMaid((prevMaid) => ({
            ...prevMaid,
            jobs: [
              ...prevMaid.jobs,
              { job_id: jobTypeId, job_name: valueName },
            ],
          }));
        } else {
          setMaid((prevMaid) => ({
            ...prevMaid,
            jobs: prevMaid.jobs.filter((job) => job.job_id !== jobTypeId),
          }));
        }
      } else {
        setMaid({ ...maid, [e.target.name]: e.target.value });
      }
    },
    [maid]
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  // const handleJobChange = (_selectedJobs) => {
  //   setMaid({ ...maid, ["jobtype"]: _selectedJobs });
  // };

  const handleClickConfirmOK = async (e) => {
    e.preventDefault();
    console.log(maid);

    const job_ids = maid.jobs.map((job) => job.job_id);
    try {
      const updateData = {
        user_pic: maid.user_pic,
        user_role: maid.user_role,
        user_gender: maid.user_gender,
        firstname: maid.firstname,
        lastname: maid.lastname,
        birthday: maid.birthday,
        email: maid.email,
        pass: maid.pass,
        tel: maid.tel,
        description: maid.description,
        jobs: job_ids,
      };
      await api.post("/api/v1/account/editMaidProfile", updateData);

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

  const handleClickCancel = (e) => {
    e.preventDefault();
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

      <div
        className={`page-container ${
          alertConfirm || alertCancel ? "blurred" : ""
        }`}
      >
        <form>
          <ProfileEdit
            user={maid}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleCancle={handleClickCancel}
            manageJob={handleChange}
            clickSubmit={handleSubmit}
            clickCancle={handleClickCancel}
          />
        </form>
      </div>
    </>
  );
}

export default MaidProfileEdit;
