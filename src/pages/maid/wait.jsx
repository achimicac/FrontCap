import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import Axios  from "../../axios"

function MaidStatusWait() {
    const invoiceID = useRef(null);
    const [customers, setCustomers] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] },
        { id: 2, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] },
        { id: 3, firstname: "atchi", lastname: "natee", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"] }
    ]);
    const [alertConfirm, setAlertConfirm] = useState(false);
    const [alertCancel, setAlertCancel] = useState(false);

    /*useEffect(() => {
      const fetchCustomer = async () => {
            try {
                  const res = await Axios.get('/api/maid/status/wait')
                  setCustomers(res.data)
            } catch (err) {
                  console.log(err)
            }
      }

      fetchCustomer();
    }, [])*/

    const handleClickConfirmOK = async () => {
      try {
            const changestatus = await Axios.put("/api/maid/status/wait", invoiceID.current);
            if (changestatus.data.status) {
                  console.log(changestatus.data.text)
            } else {
                  console.log(changestatus.data.text)
            }
      } catch (err) {
            console.log(err)
      }
    }

    const handleClickCancelOK = async () => {
        try {
            const deletetask = await Axios.delete("/api/maid/status/wait", invoiceID.current);
            if (deletetask.data.status) {
                  console.log(deletetask.data.text)
            } else {
                  console.log(deletetask.data.text)
            }
      } catch (err) {
            console.log(err)
      }
    }

    const handleClickConfirm = (id) => {
        setAlertConfirm(true);
        invoiceID.current = id;
    }

    const handleClickCancel = (id) => {
        setAlertCancel(true);
        invoiceID.current = id;
    }
    console.log()

    return (
        <>
            <Popup 
                  alert={alertConfirm} 
                  message={"ต้องการทำงานนี้ ใช่ หรือ ไม่"}
                  clickCancel={() => { setAlertConfirm(false) }} 
                  clickOK={handleClickConfirmOK}
            />
            <Popup 
                  alert={alertCancel} 
                  message={"ต้องการยกเลิกงานนี้ ใช่ หรือ ไม่"}
                  clickCancel={() => { setAlertCancel(false) }} 
                  clickOK={handleClickCancelOK} 
            />
            {customers.map((customer, customerid) => (
                <section key={customerid}>
                    {customer.id &&
                        <ProfileBox
                            user={customer}
                            buttonName="รับงานนี้"
                            clickConfirm={() => handleClickConfirm(customer.id)}
                            clickCancel={() => handleClickCancel(customer.id)}
                        />
                    }
                </section>
            ))}
        </>
    )
}

export default MaidStatusWait;

