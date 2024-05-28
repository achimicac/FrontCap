import { useState } from "react";
import Profile from "../../components/Profile";
import { useNavigate } from "react-router-dom";
import Axios  from "../../axios"

function UserProfile() {
      const navigate = useNavigate();

      const [user, setUser] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap",
            birthday: '12-09-2003',  
            role: 'user' ,
            tel: '0925097833',
            email: 'atchi@gmail.com'
      });
      //const [user, setUser] = useState();

      /*useEffect(() => {
            const fetchUser = async () => {
                  try {
                        const res = await Axios.get('/api/customer/profile')
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
                  <Profile user={user} isMaid={false} clickEdit={handleClick}/>
            </>
      )
}

export default UserProfile;