import { useState } from "react";
import Profile from "../../components/Profile";
import { Link, useNavigate } from "react-router-dom";

function MaidProfile() {
      const navigate = useNavigate();

      const [user, setMaid] = useState([
            { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] }
      ]);
      //const [maid, setMaid] = useState();

      /*useEffect(() => {
            const fetchCustomer = async () => {
                  try {
                        const res = await axios.get('/api/user/profile')
                        setMaid(res.data)
                  } catch (err) {
                        console.log(err)
                  }
            }

            fetchCustomer();
      }, [])*/

      return (
            <>
                  <Profile user={maid[0]}/>
                  <Link to={'edit'}>
                        <button> Edit </button>
                  </Link>
            </>
      )
}

export default MaidProfile;