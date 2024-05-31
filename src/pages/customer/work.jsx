import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import api  from "../../axios"

function UserStatusWork() {
    const invoiceID = useRef(null);
    const [invoice_id, setInvoiceId] = useState(null);
    const [customers, setCustomers] = useState([
        { id: 1, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66' },
        { id: 2, firstname: "atchima", lastname: "nateepradap", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66' },
        { id: 3, firstname: "atchi", lastname: "natee", jobtype: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"], start_time: '13:00:00', end_time: '14:00:00', work_date: '12 ก.ย. 66' }
    ]);

    useEffect(() => {
        const fetchCustomer = async () => {
              try {
                    const res = await api.post("/api/v1/invoice/customer/status/work", {
                                          token: window.localStorage.getItem("authtoken")
                                      });
                    setCustomers(res.data)
              } catch (err) {
                    console.log(err)
              }
              
        }
        fetchCustomer();
      }, [])

      const handleClickSummary = (invId) => () => {
        setInvoiceId(invId);
  };

    return (
        <>
            {invoice_id &&
                <SummaryInvoice
                        role={"customer"}
                        invoice_id={invoice_id}
                        clickCancel={() => setInvoiceId(null)}
                />
            }
            {customers.map((customer, customerid) => (
                <section key={customerid} onClick={handleClickSummary(customer.invoice_id)}>
                    {customer.user_id &&
                        <ProfileBox
                            user={customer}
                            canClick={false}
                            buttonName="กำลังทำงาน..."
                        />
                    }
                </section>
            ))}
        </>
    )
}

export default UserStatusWork;