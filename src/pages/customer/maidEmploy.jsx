import { useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Profile from "../../components/Profile";
import Calendar from "../../components/Calendar";
import Popup from "../../components/Popup";


function UserMaidEmploy() {
      const { id } = useParams();
      const navigate = useNavigate();

      const [oldinvoice, setOldinvoice] = useState([]);
      const [newInvoice, setNewInvoice] = useState({
            maid_id: '',
            room_id: '',
            status: '',
            work_date: '',
            start_time: '',
            work_time: '',
            submit_time: '',
            job_id: [],
            amount: ''
      });
      const [roomchoices, setRoomchoices] = useState([]);
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

      const handleClickConfirmOK = async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                for (const key in user) {
                    formData.append(key, user[key]);
                }
    
                const {addInvoice} = await axios.post(`/api/customer/maids/${id}/employ`, formData)
    
                if ( !addInvoice.data.success ) {
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

      return (
            <>
                  <Popup 
                        alert={alertConfirm} 
                        message={"ต้องการทยืนยัน ใช่ หรือ ไม่"}
                        clickCancel={() => { setAlertConfirm(false) }} 
                        clickOK={handleClickConfirmOK}
                  />
                  <Popup 
                        alert={alertCancel} 
                        message={"ต้องการยกเลิก ใช่ หรือ ไม่"}
                        clickCancel={() => { setAlertCancel(false) }} 
                        clickOK={handleClickCancelOK} 
                  />
                  <Calendar />
            </>
      );
}

export default UserMaidEmploy;