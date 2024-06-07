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
    end_time: "",
    note: "",
  });

  const [roomchoices, setRoomchoices] = useState([]);
  const [jobchoices, setJobchoices] = useState([]);
  const [timeWeightSum, setTimeWeightSum] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [amount, setAmount] = useState(0);

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

  const fetchTimeWeights = async () => {
    const room_id = newInvoice.room_data?.room_id;
    const job_ids = await newInvoice.jobs?.map((job) => job.job_id);

    await api
      .post("/api/v1/timeWeight/getTimeWeight", {
        room_id: room_id,
        job_ids: job_ids,
      })
      .then((res) => {
        console.log(res.data.time_weight);
        const time_weight_sum = res.data.time_weight.reduce(
          (acc, tw) => acc + tw.time_weight,
          0
        );
        setTimeWeightSum(time_weight_sum);
      });
  };

  useEffect(() => {
    fetchJobs();
    fetchRooms();

    CalculateAmount();
  }, [newInvoice]);

  useEffect(() => {
    fetchTimeWeights();
  }, [newInvoice.jobs, newInvoice.room]);timeWeightSum

  useEffect(() => {
    CalculateEndTime();
  }, [timeWeightSum]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "jobs") {
      if (newInvoice.work_date === "" || newInvoice.start_time === "") {
        return setAlertSelectJob(true);
      }
      let updatedJobs = [...newInvoice.jobs];

      const selected_job = JSON.parse(value);

      if (checked) {
        updatedJobs.push(selected_job);
      } else {
        updatedJobs = updatedJobs.filter(
          (job) => job.job_id !== selected_job.job_id
        );
      }

      setNewInvoice((prevState) => ({
        ...prevState,
        jobs: updatedJobs,
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
    if (newInvoice.jobs.length > 0) {
      const room_ratio = newInvoice.room_data.room_ratio;
      const job_weight_sum = newInvoice.jobs.reduce(
        (acc, job) => acc + job.job_weight,
        0
      );
      const base_price = 50 * room_ratio * job_weight_sum;
      setAmount(base_price);
    }
  };

  const CalculateEndTime = () => {
    const result_time = sumTime(timeWeightSum);

    setEndTime(result_time);
  };

  function sumTime(_time_weight) {
    // Split the time strings into hours, minutes, and seconds
    const [hours1, minutes1, seconds1] = newInvoice.start_time
      .split(":")
      .map(Number);

    // Add the hours, minutes, and seconds separately
    let totalSeconds =
      hours1 * 3600 + minutes1 * 60 + seconds1 + _time_weight * 60;

    // Handle overflow and convert back to hours, minutes, seconds
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);

    // Format the output with leading zeros
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:00`;
  }

  const handleWorkDate = (event) => {
    setNewInvoice((prevState) => ({
      ...prevState,
      work_date: event.target.value,
    }));
  };

  const handleStartTime = (_hour, _minute) => {
    const time = _hour + ":" + _minute + ":00";
    setNewInvoice((prevState) => ({
      ...prevState,
      start_time: time,
    }));
  };

  const handleSubmitTime = (event) => {
    const convert_time = event.format("HH:mm:ss");
    setNewInvoice((prevState) => ({
      ...prevState,
      end_time: convert_time,
    }));
  };

  const handleClickConfirmOK = async (e) => {
    e.preventDefault();

    await api
      .post("/api/v1/invoice/addInvoice", {
        token: window.localStorage.getItem("authtoken"),
        maid_email: maid.email,
        room_id: newInvoice.room_data.room_id,
        status: "wait",
        work_date: newInvoice.work_date,
        start_time: newInvoice.start_time,
        work_time: newInvoice.work_time,
        end_time: endTime,
        amount: amount,
        note: newInvoice.note,
        jobs: newInvoice.jobs,
      })
      .then((res) => {
        if (res.data.success) {
          window.location.href = "http://localhost:5173/customer/status/wait";
          window.localStorage.removeItem("selectedMaid");
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
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
          endTime={endTime}
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
