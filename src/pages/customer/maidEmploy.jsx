import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import EmployMaid from "../../components/EmployMaid";
import api from "../../axios";
import "./css/maidEmploy.css";

function UserMaidEmploy() {
  const navigate = useNavigate();

  const [maid, setMaid] = useState(() => {
    const maidData = JSON.parse(window.localStorage.getItem("selectedMaid"));
    return maidData;
  });

  const [newInvoice, setNewInvoice] = useState({
    jobs: [],
    room_data: {},
    work_date: "",
    start_time: "",
    work_time: 0,
    submit_time: "",
    note: "",
  });

  const [roomchoices, setRoomchoices] = useState([]);
  const [jobchoices, setJobchoices] = useState([]);
  const [amount, setAmount] = useState(0);
  const base_price = 200;
  const limitJobs = 2;

  const [alertSelectTime, setAlertSelectTime] = useState(false);
  const [alertSelectJob, setAlertSelectJob] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertCancel, setAlertCancel] = useState(false);

  const fetchJobs = async () =>
    await api.get("/api/v1/job").then((res) => {
      const allMaidJobs = res.data.filter((job) =>
        maid.jobs.includes(job.job_id)
      );
      setJobchoices(allMaidJobs);
    });

  const fetchRooms = async () =>
    await api.get("/api/v1/room").then((res) => {
      setRoomchoices(res.data);
    });

  useEffect(() => {
    fetchJobs();
    fetchRooms();
    CalculateAmount();
  }, [newInvoice]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "jobs") {
      if (newInvoice.work_date === "" || newInvoice.start_time === "") {
        return setAlertSelectJob(true);
      }
      let updatedJobIds = [...newInvoice.jobs];
      const jobIdInt = parseInt(value);

      if (checked) {
        updatedJobIds.push(jobIdInt);
      } else {
        updatedJobIds = updatedJobIds.filter((jobId) => jobId !== jobIdInt);
      }

      setNewInvoice((prevState) => ({
        ...prevState,
        jobs: updatedJobIds,
      }));
    } else if (name == "room") {
      const room_conv = JSON.parse(value);
      setNewInvoice((prevState) => ({
        ...prevState,
        room_data: room_conv,
      }));
    } else {
      setNewInvoice((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const CalculateAmount = () => {
    const over_jobs =
      newInvoice.jobs.length > limitJobs
        ? newInvoice.jobs.length - limitJobs
        : 0;
    const add_rate = Math.pow(1.03, over_jobs);
    const add_discount = over_jobs * 50 * add_rate;
    const discount =
      base_price * newInvoice.room_data.room_ratio + add_discount;
    setAmount(discount);
  };

  const handleWorkDate = (event) => {
    setNewInvoice((prevState) => ({
      ...prevState,
      work_date: event.target.value,
    }));
  };

  const handleStartTime = (event) => {
    const convert_time = event.format("HH:mm:ss");
    setNewInvoice((prevState) => ({
      ...prevState,
      start_time: convert_time,
    }));
  };

  const handleSubmitTime = (event) => {
    const convert_time = event.format("HH:mm:ss");
    setNewInvoice((prevState) => ({
      ...prevState,
      submit_time: convert_time,
    }));
  };

  const handleClickConfirmOK = async (e) => {
    e.preventDefault();

    await api
      .post("/api/v1/invoice/addInvoice", {
        token: window.localStorage.getItem("authtoken"),
        maid_email: maid.email,
        Room_ID: newInvoice.room_data.room_id,
        Status: "wait",
        Work_Date: newInvoice.work_date,
        Start_Time: newInvoice.start_time,
        Work_Time: newInvoice.work_time,
        Submit_Time: newInvoice.submit_time,
        Amount: amount,
        Note: newInvoice.note,
        jobs: newInvoice.jobs,
      })
      .then((res) => {
        if (res.data.success) {
          window.location.href = "http://localhost:5173/customer/status/wait";
          window.localStorage.removeItem("selectedMaid");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickCancelOK = (e) => {
    e.preventDefault();
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
    <div className="maid-employ">
      <Popup
        alert={alertSelectTime}
        message={"กรุณาเลือกวันเวลาใหม่ หรือ ลดจำนวนงาน"}
        clickCancel={() => {
          setAlertSelectTime(false);
        }}
      />
      <Popup
        alert={alertSelectJob}
        message={"กรุณาเลือกวันและเวลา"}
        clickCancel={() => {
          setAlertSelectJob(false);
        }}
      />
      <Popup
        alert={alertConfirm}
        message={"ต้องการยืนยัน ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertConfirm(false);
        }}
        clickOK={handleClickConfirmOK}
      />
      <Popup
        alert={alertCancel}
        message={"ต้องการยกเลิก ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertCancel(false);
        }}
        clickOK={handleClickCancelOK}
      />

      <form>
        <EmployMaid
          newInvoice={newInvoice}
          roomChoices={roomchoices}
          jobchoices={jobchoices}
          amount={amount}
          handleChange={handleChange}
          handleStartTime={handleStartTime}
          handleSubmitTime={handleSubmitTime}
          handleWorkDate={handleWorkDate}
        />
        <footer>
          <button className="cancle" onClick={handleClickCancel}>
            Cancel
          </button>
          <button onClick={handleSubmit}>Confirm</button>
        </footer>
      </form>
    </div>
  );
}

export default UserMaidEmploy;
