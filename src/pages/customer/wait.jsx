import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import SummaryInvoice from "../../components/SummaryInvoice";
import Alert from "../../components/Alert";
import toast from "react-hot-toast";
import Popup from "../../components/Popup";
import api from "../../axios";

function UserStatusWait() {
  const invoiceID = useRef(null);
  const [invoice_id, setInvoiceId] = useState(null);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstname: "atchima",
      lastname: "nateepradap",
      jobs: [
        "กวาดบ้าน",
        "ถูบ้าน",
        "ล้างจาน",
        "สักผ้า",
        "ถูบ้าน",
        "ล้างจาน",
        "สักผ้า",
      ],
      start_time: "13:00:00",
      end_time: "14:00:00",
      work_date: "12 ก.ย. 66",
    },
    {
      id: 2,
      firstname: "atchima",
      lastname: "nateepradap",
      jobs: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"],
      start_time: "13:00:00",
      end_time: "14:00:00",
      work_date: "12 ก.ย. 66",
    },
    {
      id: 3,
      firstname: "atchi",
      lastname: "natee",
      jobs: ["กวาดบ้าน", "ถูบ้าน", "ล้างจาน", "สักผ้า"],
      start_time: "13:00:00",
      end_time: "14:00:00",
      work_date: "12 ก.ย. 66",
    },
  ]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.post("/api/v1/invoice/customer/status/wait", {
          token: window.localStorage.getItem("authtoken"),
        });
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCustomer();
  }, []);
  useEffect(() => {
    console.log(customers);
  }, [customers]);

  const handleClickSummary = (invId) => {
    setInvoiceId(invId);
  };

  const handleClickCancelOK = async (e) => {
    setAlertConfirm(false);
    try {
      const deleteInvoiceJob = await api.delete(
        `/api/v1/invoiceJob/${invoiceID.current}`
      );
      if (deleteInvoiceJob.status !== 200) {
        console.log(deletetask.data.error);
      } else {
        const deletetask = await api.delete(
          `/api/v1/invoice/${invoiceID.current}`
        );
        if (deletetask.status !== 200) {
          toast.error("กรุณาลองอีกครั้ง");
          console.log(deletetask.data.error);
        } else {
          toast.success("ยกเลิกงานแล้วเรียบร้อย");
          setCustomers((prevInvoice) =>
            prevInvoice.filter((item) => item.invoice_id !== invoiceID.current)
          );
          console.log(deletetask.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCancel = (id) => {
    setAlertConfirm(true);
    console.log(id);
    invoiceID.current = id;
  };

  return (
    <>
      <Alert />
      <Popup
        alert={alertConfirm}
        message={"ต้องการยกเลิกงานนี้ ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertConfirm(false);
        }}
        clickOK={handleClickCancelOK}
      />
      {invoice_id && (
        <SummaryInvoice
          role={"customer"}
          invoice_id={invoice_id}
          clickCancel={() => setInvoiceId(null)}
        />
      )}
      <div style={{ marginBottom: "10vw" }}>
        {customers.map((customer, customerin) => (
          <section key={customerin}>
            {customer.user_id && customer.status === "wait" ? (
              <ProfileBox
                user={customer}
                canClick={false}
                handleClickSummary={handleClickSummary}
                buttonName="รอแม่บ้านยืนยัน"
              />
            ) : customer.status === "work" ? (
              <ProfileBox
                user={customer}
                canClick={false}
                handleClickSummary={handleClickSummary}
                buttonName="แม่บ้านยืนยันแล้ว"
              />
            ) : (
              <ProfileBox
                user={customer}
                name="cancel"
                handleClickSummary={handleClickSummary}
                clickConfirm={() => handleClickCancel(customer.invoice_id)}
                buttonName="ยกเลิก"
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

export default UserStatusWait;
