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