import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Popup from "../../components/Popup";
import EmployMaid from "../../components/EmployMaid";

function UserMaidEmploy() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [oldInvoice, setOldinvoice] = useState([
        { work_date: '2024-04-12', start_time: '13:00:00', end_time: '14:00:00' },
        { work_date: '2024-04-12', start_time: '15:00:00', end_time: '16:00:00' },
        { work_date: '2024-04-12', start_time: '19:00:00', end_time: '21:00:00' }
    ]);
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
        amount: '',
        detail: ''
    });
    const [roomchoices, setRoomchoices] = useState([
      {room_id: 1, room_type: "S", room_size: "10.5", room_price: 100},
      {room_id: 2, room_type: "M", room_size: "20.5", room_price: 200},
      {room_id: 3, room_type: "L", room_size: "30.5", room_price: 300},
    ]);
      const [jobchoices, setJobchoices] = useState([    
            {job_id: 1, job_name: "กวาดบ้าน"}, 
            {job_id: 2, job_name: "ถูบ้าน"}, 
            {job_id: 3, job_name: "ล้างจาน"},
            {job_id: 4, job_name: "ถูบ้าน"},
            {job_id: 5, job_name: "ถูบ้าน"},
      ])
    const [alertConfirm, setAlertConfirm] = useState(false);
    const [alertCancel, setAlertCancel] = useState(false);

    /*useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`/api/customer/maids/${id}/employ`);
                setOldinvoice(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchInvoice();
    }, []);*/

    useEffect(() => {
      if (newInvoice.job_id.length > 1 && newInvoice.job_id.length % 2 !== 0) {
            console.log("add 1")
      }
    }, [newInvoice.job_id])

    const handleChange = (event) => {
      const { name, value, checked } = event.target;
      if (name === 'job_id') {
          if (checked) {
              setNewInvoice(prevState => ({ ...prevState, [name]: [...prevState[name], parseInt(value)] }));
          } else {
              setNewInvoice(prevState => ({ ...prevState, [name]: prevState[name].filter(jobId => jobId !== parseInt(value)) }));
          }
      } else {
          setNewInvoice(prevState => ({ ...prevState, [name]: value }));
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

    console.log(newInvoice)

    return (
        <>
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
                  <button onClick={handleClickCancel}> Cancle </button>
            </form>
        </>
    );
}

export default UserMaidEmploy;


