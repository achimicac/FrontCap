import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios  from "../../axios"
import Profile from "../../components/Profile";

function MaidOtherProfile() {
      const { id } = useParams();
      const [user, setUser] = useState({ 
            id: 1, 
            firstname: "atchima", 
            lastname: "nateepradap",
            birthday: '12-09-2003', 
            role: 'user' 
      });

      /*useEffect(() => {
            const fetchUserProfile = async () => {
                  try {
                        const response = await Axios.get(`/api/maid/customers/profile/${id}`)
                        setUser(response.data)
                        
                  } catch (error) {
                        console.log(error)
                  }
            }
            fetchUserProfile();
      }, [])*/

      return (
            <>
                  <Profile user={user} isMaid={false}/>
            </>
      )
}

export default MaidOtherProfile;