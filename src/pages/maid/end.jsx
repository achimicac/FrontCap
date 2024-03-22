import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import axios from "axios";

function MaidStatusEnd() {
    const invoiceID = useRef(null);
    const [customers, setCustomers] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] }
    ]);

    /*useEffect(() => {
      const fetchCustomer = async () => {
            try {
                  const res = await axios.get('/api/maid/status/work')
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
                              firstname={customer.firstname}
                              lastname={customer.lastname}
                              jobs={customer.jobtype}
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