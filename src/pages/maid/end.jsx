import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import axios from "axios";

function MaidStatusEnd() {
    const [customers, setCustomers] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] }
    ]);
    //const [customers, setCustomers] = useState([])
    /*useEffect(() => {
      const fetchCustomer = async () => {
            try {
                  const res = await axios.get('/api/maid/status/end')
                  setCustomers(res.data)
            } catch (err) {
                  console.log(err)
            }
      }

      fetchCustomer();
    }, [])*/

    return (
        <>
            {customers.map((customer, customerid) => (
                  <section key={customerid}>
                        {customer.id &&
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