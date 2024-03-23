import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import axios from "axios";

function MaidStatusWork() {
    const invoiceID = useRef(null);
    const [customers, setCustomers] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] },
        { id: 2, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] }
    ]);
    const [alertConfirm, setAlertConfirm] = useState(false);

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

    const handleClickConfirmOK = async () => {
      try {
            const changestatus = await axios.put("/api/maid/status/work", invoiceID.current);
            if (changestatus.data.status) {
                  console.log(changestatus.data.text)
            } else {
                  console.log(changestatus.data.text)
            }
      } catch (err) {
            console.log(err)
      }
    }

    const handleClickConfirm = (id) => {
        setAlertConfirm(true);
        invoiceID.current = id;
    }

    return (
        <>
            <Popup 
                  alert={alertConfirm} 
                  message={"ต้องการยืนยันว่าทำงานเสร็จสิ้น"}
                  clickCancel={() => { setAlertConfirm(false) }} 
                  clickOK={handleClickConfirmOK}
            />
            {customers.map((customer, customerid) => (
                  <section key={customerid}>
                        {customer.id &&
                        <ProfileBox
                              firstname={customer.firstname}
                              lastname={customer.lastname}
                              jobs={customer.jobtype}
                              pic={customer.user_pic}
                              clickConfirm={() => handleClickConfirm(customer.id)}
                              buttonName="สิ้นสุดงาน"
                        />
                        }
                  </section>
            ))}
        </>
    )
}

export default MaidStatusWork;