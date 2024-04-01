import { useState } from "react";
import Profile from "../../components/Profile";
import { useNavigate } from "react-router-dom";

function UserProfile() {
      const navigate = useNavigate();

      const [user, setUser] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap",
            birthday: '12-09-2003', 
            jobtype: [
                  {job_id: 1, job_name: "กวาดบ้าน"}, 
                  {job_id: 2, job_name: "ถูบ้าน"}, 
                  {job_id: 3, job_name: "ล้างจาน"}
            ], 
            role: 'user' 
      });
      //const [user, setUser] = useState();

      /*useEffect(() => {
            const fetchUser = async () => {
                  try {
                        const res = await axios.get('/api/customer/profile')
                        setUser(res.data)
                  } catch (err) {
                        console.log(err)
                  }
            }

            fetchUser();
      }, [])*/

      const handleClick = () => {
            navigate('edit')
      }

      return (
            <>
                  <Profile user={user} isMaid={false} />
                  <button onClick={handleClick}> Edit </button>
            </>
      )
}

export default UserProfile;