import { useState } from "react";
import Profile from "../../components/Profile";
import { Link, useNavigate } from "react-router-dom";
import Axios  from "../../axios"

function MaidProfile() {
      const navigate = useNavigate();
      const [maid, setMaid] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap",
            birthday: '12-09-2003', 
            tel: '0925097833',
            jobtype: [
                  {job_id: 1, job_name: "กวาดบ้าน"}, 
                  {job_id: 2, job_name: "ถูบ้าน"}, 
                  {job_id: 3, job_name: "ล้างจาน"}
            ], 
            role: 'maid',
            email: 'maidmail@gmail.com',
            description: 'I love my household. I can do everything, So you can employ me just enter employ button' 
      });
      //const [maid, setMaid] = useState();

      /*useEffect(() => {
            const fetchCustomer = async () => {
                  try {
                        const res = await Axios.get('/api/maid/profile')
                        setMaid(res.data)
                  } catch (err) {
                        console.log(err)
                  }
            }

            fetchCustomer();
      }, [])*/

      const handleClick = () => {
            navigate('edit')
      }

      return (
            <>
                  <Profile user={maid} isMaid={true} clickEdit={handleClick}/>
            </>
      )
}

export default MaidProfile;