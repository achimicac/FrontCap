import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import EmployMaid from "../../components/EmployMaid";
import Axios  from "../../axios"

function UserMaidEmploy() {
    const { id } = useParams();
    const navigate = useNavigate();
    const firstrender = useRef(true)

    const [oldInvoice, setOldinvoice] = useState([
        { work_date: '2024-04-12', start_time: '13:00:00', end_time: '14:00:00' },
        { work_date: '2024-04-12', start_time: '15:00:00', end_time: '16:00:00' },
        { work_date: '2024-04-12', start_time: '19:00:00', end_time: '21:00:00' }
    ]);
    const [timeoptions, setTimeoptions] = useState([])
    const [newInvoice, setNewInvoice] = useState({
        room_id: '',
        work_date: '',
        start_time: '',
        end_time: '',
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
    const [alertSelectJob, setAlertSelectJob] = useState(false);
    const [alertConfirm, setAlertConfirm] = useState(false);
    const [alertCancel, setAlertCancel] = useState(false);

    /*useEffect(() => {
        const fetchOldinvoice = async () => {
            const response = await Axios.get(`/api/customer/maids/profile/${id}/employ`)
            setOldinvoice(response.data.oldinvoice)
            setRoomchoices(response.data.roomchoices)
            setJobchoices(response.data.jobchoices)
            firstrender.current = false
        }
        fetchOldinvoice()
    }, [])

    useEffect(() => {
        if (firstrender.current === false) {
            const fetchOldinvoice = async () => {
                const response = await axios.get(`/api/customer/maids/profile/${id}/employ?date={${newInvoice.work_date}}`)
                setOldinvoice(data)
            }
            return fetchOldinvoice();
        }
    }, [newInvoice.work_date])*/

    const handleChange = (event, startTimeOptions) => {
        const { name, value, checked } = event.target;
        
        if (name === 'job_id') {
            if (newInvoice.work_date === '' || newInvoice.start_time === '') {
                return setAlertSelectJob(true)
            }
            let updatedJobIds = [...newInvoice.job_id];
            const jobIdInt = parseInt(value);
    
            if (checked) {
                updatedJobIds.push(jobIdInt);
            } else {
                updatedJobIds = updatedJobIds.filter(jobId => jobId !== jobIdInt);
            }
    
            const job_count = updatedJobIds.length;
            if (checkTimeOver(Math.ceil(job_count / 2))) {
                const newAmount = job_count % 2 !== 0 ? Math.ceil(job_count / 2) * 200 : Math.floor(job_count / 2) * 200;
                const newEndTime = `${String(parseInt(newInvoice.start_time.split(":")[0], 10) + Math.ceil(job_count / 2)).padStart(2, '0')}:00:00`;
    
                setNewInvoice(prevState => ({
                    ...prevState,
                    job_id: updatedJobIds,
                    amount: newAmount,
                    end_time: newEndTime
                }));
            }
        } else if (name === 'work_date') {
            setTimeoptions(startTimeOptions);
            setNewInvoice(prevState => ({ ...prevState, job_id: [], start_time: '', work_date: value }));
        } else if (name === 'start_time') {
            setNewInvoice(prevState => ({ ...prevState, job_id: [], start_time: value }));
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
          setAlertSelectTime(true);
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
                alert={alertSelectJob}
                message={'กรุณาเลือกวันและเวลา'}
                clickCancel={() => {
                    setAlertSelectJob(false);
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