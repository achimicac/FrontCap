import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import "./styles/blurBackground.css";
import api from "../../axios";
import toast from "react-hot-toast";
import Alert from "../../components/Alert";
import SummaryInvoice from "../../components/SummaryInvoice";

function MaidStatusWait() {
  const invoiceID = useRef(null);
  const [invoice_id, setInvoiceId] = useState(null);
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
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertCancel, setAlertCancel] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.post("/api/v1/invoice/maid/status/wait", {
          token: window.localStorage.getItem("authtoken"),
        });
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomer();
  }, []);

  const handleClickConfirmOK = async () => {
    try {
      const changestatus = await api.put(
        `/api/v1/invoice/${invoiceID.current}/${"work"}`
      );
      if (changestatus.status !== 200) {
        console.log(changestatus.data.error);
      } else {
        toast.success("ยืนยันรับงานแล้วเรียบร้อย");
        setCustomers((prevInvoice) =>
          prevInvoice.filter((item) => item.invoice_id !== invoiceID.current)
        );
        console.log(changestatus.data);
      }
      setAlertConfirm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCancelOK = async (e) => {
    setAlertCancel(false);
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
          console.log(deletetask.data.error);
        } else {
          toast.success("ยกเลิกงานแล้วเรียบร้อย");
          setCustomers((prevInvoice) =>
            prevInvoice.filter((item) => item.invoice_id !== invoiceID.current)
          );
          console.log(deletetask.data.message);
        }
      }
      setAlertConfirm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickConfirm = (id) => {
    setAlertConfirm(true);
    invoiceID.current = id;
  };

  const handleClickCancel = (id) => {
    setAlertCancel(true);
    console.log(id);
    invoiceID.current = id;
  };

  const handleClickSummary = (invId) => {
    setInvoiceId(invId);
    console.log(invId);
  };

  return (
    <>
      <Alert />
      <Popup
        alert={alertConfirm}
        message={"ต้องการทำงานนี้ ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertConfirm(false);
        }}
        clickOK={handleClickConfirmOK}
      />
      <Popup
        alert={alertCancel}
        message={"ต้องการยกเลิกงานนี้ ใช่ หรือ ไม่"}
        clickCancel={() => {
          setAlertCancel(false);
        }}
        clickOK={handleClickCancelOK}
      />
      {invoice_id && (
        <SummaryInvoice
          role={"maid"}
          invoice_id={invoice_id}
          clickCancel={() => setInvoiceId(null)}
        />
      )}
      <div
        className={`page-container ${
          alertConfirm || alertCancel ? "blurred" : ""
        }`}
      >
        {customers.map((customer, customerid) => (
          <section key={customerid}>
            {customer.user_id && (
              <ProfileBox
                user={customer}
                buttonName="รับงานนี้"
                clickConfirm={() => handleClickConfirm(customer.invoice_id)}
                clickCancel={() => handleClickCancel(customer.invoice_id)}
                handleClickSummary={handleClickSummary}
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

export default MaidStatusWait;
