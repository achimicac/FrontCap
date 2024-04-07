import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import EmployMaid from "../../components/EmployMaid";
import axios from 'axios';

function UserMaidEmploy() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [oldInvoice, setOldinvoice] = useState([
        { work_date: '2024-04-12', start_time: '13:00:00', end_time: '14:00:00' },
        { work_date: '2024-04-12', start_time: '15:00:00', end_time: '16:00:00' },
        { work_date: '2024-04-12', start_time: '19:00:00', end_time: '21:00:00' }
    ]);
    const [timeoptions, setTimeoptions] = useState([])
    const [newInvoice, setNewInvoice] = useState({
        maid_id: '',
        room_id: '',
        status: '',
        work_date: '',
        start_time: '',
        end_time: '',
        work_time: '',
        submit_time: '',
        job_id: [],
        amount: 0,
        detail: ''
    });

    const [roomchoices, setRoomchoices] = useState([
        { room_id: 1, room_type: "S", room_size: "10.5", room_price: 100 },
        { room_id: 2, room_type: "M", room_size: "20.5", room_price: 200 },
        { room_id: 3, room_type: "L", room_size: "30.5", room_price: 300 },
    ]);

    const [jobchoices, setJobchoices] = useState([
        { job_id: 1, job_name: "กวาดบ้าน" },
        { job_id: 2, job_name: "ถูบ้าน" },
        { job_id: 3, job_name: "ล้างจาน" },
        { job_id: 4, job_name: "ถูบ้าน" },
        { job_id: 5, job_name: "ถูบ้าน" },
    ]);

    const [alertSelectTime, setAlertSelectTime] = useState(false);
    const [alertConfirm, setAlertConfirm] = useState(false);
    const [alertCancel, setAlertCancel] = useState(false);

    const handleChange = (event, startTimeOptions) => {
      const { name, value, checked } = event.target;
      if (name === 'job_id') {
          if (checked) {
              const job_count = newInvoice.job_id.length + 1;
              if (checkTimeOver(Math.ceil(job_count / 2))) {
                  setNewInvoice(prevState => ({
                        ...prevState,
                        [name]: [...prevState[name], parseInt(value)],
                        amount: job_count % 2 !== 0 ? Math.ceil(job_count / 2) * 100 : Math.floor(job_count / 2) * 100,
                        end_time: `${String(parseInt(newInvoice.start_time.split(":")[0], 10) + Math.ceil(job_count / 2)).padStart(2, '0')}:00:00`
                  }));
              }
          } else {
              const job_count = newInvoice.job_id.length - 1;
              if (checkTimeOver(Math.ceil(job_count / 2))) {
                  setNewInvoice(prevState => ({
                        ...prevState,
                        [name]: [...prevState[name], parseInt(value)],
                        amount: job_count % 2 !== 0 ? Math.ceil(job_count / 2) * 100 : Math.floor(job_count / 2) * 100,
                        end_time: `${String(parseInt(newInvoice.start_time.split(":")[0], 10) + Math.ceil(job_count / 2)).padStart(2, '0')}:00:00`
                  }));
              }
          }
          
      } else if (name === 'work_date'){
          setTimeoptions(startTimeOptions)
          setNewInvoice(prevState => ({ ...prevState, [name]: value }));
      } else {
          setNewInvoice(prevState => ({ ...prevState, [name]: value }));
      }
  };
  
  

  const checkTimeOver = (job_count) => {
      const start = parseInt(newInvoice.start_time.split(':')[0], 10);
      if (timeoptions) {
          for (let time = start; time < start + (job_count + 1); time++) {
              if (time > 23) {
                  setAlertSelectTime(true);
                  return false;
              }
              if (!timeoptions.some(oldtime => parseInt(oldtime.split(':')[0], 10) === time)) {
                  setAlertSelectTime(true);
                  return false;
              }
          }
          return true;
      } else {
          setAlertSelectTime(true); // If timeOptions is not available, show alert
          return false;
      }
  };
  
  

    const handleClickConfirmOK = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in newInvoice) {
                formData.append(key, newInvoice[key]);
            }

            const { addInvoice } = await axios.post(`/api/customer/maids/${id}/employ`, formData)

            if (!addInvoice.data.success) {
                setMessage(addInvoice.data.text)
                setAlert(true);
                return;
            }
            navigate(-1);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleClickCancelOK = () => {
        navigate(-1)
    }

    const handleSubmit = () => {
        setAlertConfirm(true);
    }

    const handleClickCancel = () => {
        setAlertCancel(true);
    }

    console.log(newInvoice.amount)
    console.log(newInvoice.end_time)

    return (
        <>
            <Popup
                alert={alertSelectTime}
                message={'กรุณาเลือกวันเวลาใหม่ หรือ ลดจำนวนงาน'}
                clickCancel={() => {
                    setAlertSelectTime(false);
                }}
            />
            <Popup
                alert={alertConfirm}
                message={'ต้องการทยืนยัน ใช่ หรือ ไม่'}
                clickCancel={() => {
                    setAlertConfirm(false);
                }}
                clickOK={handleClickConfirmOK}
            />
            <Popup
                alert={alertCancel}
                message={'ต้องการยกเลิก ใช่ หรือ ไม่'}
                clickCancel={() => {
                    setAlertCancel(false);
                }}
                clickOK={handleClickCancelOK}
            />

            <form>
                <EmployMaid
                    oldInvoice={oldInvoice}
                    newInvoice={newInvoice}
                    roomChoices={roomchoices}
                    jobchoices={jobchoices}
                    handleChange={handleChange}
                />
                <button onClick={handleSubmit}> Confirm </button>
                <button onClick={handleClickCancel}> Cancel </button>
            </form>
        </>
    );
}

export default UserMaidEmploy;
