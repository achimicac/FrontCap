import { useEffect, useState } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import Axios  from "../../axios"
import api from "../../axios";
import axios from "axios";

function UserStatusWait() {
    const [customers, setCustomers] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66' },
        { id: 2, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66' },
        { id: 3, firstname: "atchi", lastname: "natee", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66' }
    ]);
    
    useEffect(() => {
      const fetchCustomer = async () => {
            try {
                  const res = await api.post("/api/v1/invoice/customer/status/wait", {
                                        token: window.localStorage.getItem("authtoken")
                                    });
                  setCustomers(res.data)
            } catch (err) {
                  console.log(err)
            }
            
      }
      fetchCustomer();
    }, [])

    console.log(customers)
    return (
        <>
            {customers.map((customer, customerin) => (
                <section key={customerin} >
                    {customer.user_id &&
                        <ProfileBox
                            user={customer}
                            canClick={false}
                            buttonName="รอแม่บ้านยืนยัน"
                        />
                    }
                </section>
            ))}
        </>
    )
}

export default UserStatusWait;

