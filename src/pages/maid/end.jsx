import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import Axios  from "../../axios"
import '../../components/Helmet.jsx'
import api from "../../axios";

function MaidStatusEnd() {
    /*const [customers, setCustomers] = useState([
      { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66', submit_time: '14:08:22' },
      { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66'}
    ]);*/
    const [customers, setCustomers] = useState([])
    useEffect(() => {
      const fetchCustomer = async () => {
            try {
                  console.log('hello')
                  const res = await api.post("/api/v1/invoice/maid/status/end", {
                        token: window.localStorage.getItem("authtoken")
                  });
                  setCustomers(res.data)
            } catch (err) {
                  console.log(err)
            }
      }

      fetchCustomer();
    }, [])

    return (
        <>
            <maidappHelmet title={'จ้างงานเมด'} description={'จ้าง'}/>
            {customers.map((customer, customerid) => (
                  <section key={customerid}>
                        {customer.user_id &&
                        <ProfileBox
                              user={customer}
                              canClick={false}
                              buttonName="เสร็จสิ้นแล้ว"
                        />
                        }
                  </section>
            ))}
        </>
    )
}

export default MaidStatusEnd;