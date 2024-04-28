import { useState, useCallback } from "react";
import ProfileEdit from "../../components/ProfileEdit";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";
import Axios  from "../../axios"

function UserProfileEdit() {
      const navigate = useNavigate();

      const [user, setUser] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap" 
      });
      //const [user, setUser] = useState();
      const [alertConfirm, setAlertConfirm] = useState(false);
      const [alertCancel, setAlertCancel] = useState(false);

      /*useEffect(() => {
            const fetchProfile = async () => {
                  try {
                        const res = await Axios.get('/api/customer/profile/edit')
                        setUser(res.data.profile);
                  } catch (err) {
                        console.log(err)
                  }
            }

            fetchProfile();
      }, [])*/

      const handleChange = useCallback((e) => {
            if (e.target.name === 'user_pic') {
                const file = e.target.files[0];
                setUser({ ...user, [e.target.name]: file });
            } else {
                setUser({ ...user, [e.target.name]: e.target.value });
            }
      }, [user]);

      const handleClickConfirmOK = async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                for (const key in user) {
                    formData.append(key, user[key]);
                }
    
                const {editprofile} = await Axios.put('/api/customer/profile/edit', formData)
    
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

      console.log(user)

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
                  <form>
                        <ProfileEdit 
                              user={user} 
                              handleChange={handleChange} 
                              handleSubmit={handleSubmit} 
                              handleCancle={handleClickCancel}
                        />
                        <button onClick={handleSubmit}> Confirm </button>
                        <button onClick={handleClickCancel}> Cancle </button>
                  </form>
            </>
      )
}

export default UserProfileEdit;