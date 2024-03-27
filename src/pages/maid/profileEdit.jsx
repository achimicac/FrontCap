import { useState, useCallback } from "react";
import ProfileEdit from "../../components/ProfileEdit";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";

function MaidProfileEdit() {
      const navigate = useNavigate();

      const [maid, setMaid] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap", 
            jobtype: [{job_id: 1, job_name: "กวาดบ้าน"}, {job_id: 2, job_name: "ถูบ้าน"}, {job_id: 3, job_name: "ล้างจาน"}, {job_id: 4, job_name: "สักผ้า"}], 
            role: 'maid' 
      });
      const [jobchoices, setJobchoices] = useState([
            {job_id: 1, job_name: "กวาดบ้าน"}, 
            {job_id: 2, job_name: "ถูบ้าน"}, 
            {job_id: 3, job_name: "ล้างจาน"}, 
            {job_id: 4, job_name: "ซักผ้า"},
            {job_id: 5, job_name: 'จัดห้อง'},
            {job_id: 6, job_name: 'รดน้ำต้นไม้'}
      ])
      //const [maid, setMaid] = useState();
      const [alertConfirm, setAlertConfirm] = useState(false);
      const [alertCancel, setAlertCancel] = useState(false);

      /*useEffect(() => {
            const fetchCustomer = async () => {
                  try {
                        const res = await axios.get('/api/maid/profile/edit')
                        setMaid(res.data)
                  } catch (err) {
                        console.log(err)
                  }
            }

            fetchCustomer();
      }, [])*/

      const handleChange = useCallback((e) => {
            if(e.target.name === 'user_pic') {
                const file = e.target.files[0];
                setMaid({ ...maid, [e.target.name]: file });
    
            } else {
                setMaid({ ...maid, [e.target.name]: e.target.value });
            }
      }, [maid]);

      const handleClickConfirmOK = async () => {
            e.preventDefault();
            try {
                const formData = new FormData();
                for (const key in maid) {
                    formData.append(key, maid[key]);
                }
    
                const {editprofile} = await axios.put('/api/maid/profile/edit', formData)
    
                if ( !editprofile.data.success ) {
                    setMessage(editprofile.data.text)
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
                        message={"ต้องการทยืนยันการแก้ไข ใช่ หรือ ไม่"}
                        clickCancel={() => { setAlertConfirm(false) }} 
                        clickOK={handleClickConfirmOK}
                  />
                  <Popup 
                        alert={alertCancel} 
                        message={"ต้องการยกเลิกการแก้ไข ใช่ หรือ ไม่"}
                        clickCancel={() => { setAlertCancel(false) }} 
                        clickOK={handleClickCancelOK} 
                  />
                  <h1> Edit Profile </h1>
                  <ProfileEdit user={maid} handleChange={handleChange} handleSubmit={handleSubmit} handleCancle={handleClickCancel} isMaid={true} />
            </>
      )
}

export default MaidProfileEdit;