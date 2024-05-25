import { useState, useCallback } from "react";
import ProfileEdit from "../../components/ProfileEdit";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";
import ManageJob from "../../components/ManageJob";
import Axios  from "../../axios"
import './styles/blurBackground.css'

function MaidProfileEdit() {
      const navigate = useNavigate();

      const [maid, setMaid] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap", 
            jobtype: [
                  {job_id: 1, job_name: "กวาดบ้าน"}, 
                  {job_id: 2, job_name: "ถูบ้าน"}, 
                  {job_id: 3, job_name: "ล้างจาน"}
            ], 
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
      //const [jobchoices, setJobchoices] = useState([])
      const [alertConfirm, setAlertConfirm] = useState(false);
      const [alertCancel, setAlertCancel] = useState(false);

      /*useEffect(() => {
            const fetchProfile = async () => {
                  try {
                        const res = await Axios.get('/api/maid/profile/edit')
                        setMaid(res.data.profile);
                        setJobchoices(res.data.jobchoices)
                  } catch (err) {
                        console.log(err)
                  }
            }

            fetchProfile();
      }, [])*/

      const handleChange = useCallback((e) => {
            if (e.target.name === 'user_pic') {
                const file = e.target.files[0];
                setMaid({ ...maid, [e.target.name]: file });
            } else if (e.target.name === "jobtype") {
                const [valueId, valueName] = e.target.value.split('-');
                const jobTypeId = parseInt(valueId, 10);
                if (e.target.checked) {
                    setMaid(prevMaid => ({ ...prevMaid, jobtype: [...prevMaid.jobtype, { job_id: jobTypeId, job_name: valueName }] }));
                } else {
                    setMaid(prevMaid => ({ ...prevMaid, jobtype: prevMaid.jobtype.filter(job => job.job_id !== jobTypeId) }));
                }
            } else {
                setMaid({ ...maid, [e.target.name]: e.target.value });
            }
      }, [maid]);
        
        
      console.log(maid.jobtype)
        

      const handleClickConfirmOK = async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                for (const key in maid) {
                    formData.append(key, maid[key]);
                }
    
                const {editprofile} = await Axios.put('/api/maid/profile/edit', formData)
    
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

      console.log(maid)

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
                  
                  <div  className={`page-container ${alertConfirm || alertCancel ? 'blurred' : ''}`}>
                        <form>
                              <ProfileEdit 
                                    user={maid} 
                                    handleChange={handleChange} 
                                    handleSubmit={handleSubmit} 
                                    handleCancle={handleClickCancel}
                                    manageJob={handleChange}
                                    jobchoices={jobchoices}
                                    clickSubmit={handleSubmit}
                                    clickCancle={handleClickCancel}
                              />
                        </form>
                  </div>
            </>
      )
}

export default MaidProfileEdit;