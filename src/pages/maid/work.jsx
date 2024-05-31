import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import SummaryInvoice from "../../components/SummaryInvoice";
import "./styles/blurBackground.css";
import api from "../../axios";
import toast from "react-hot-toast";
import Alert from "../../components/Alert";

function MaidStatusWork() {
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
  ]);
  const [alertConfirm, setAlertConfirm] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.post("/api/v1/invoice/maid/status/work", {
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
    const currentTime = new Date().toTimeString().split(" ")[0];
    try {
      const changestatus = await api.put(
        `/api/v1/invoice/${invoiceID.current}/${"end"}`,
        { current_time: currentTime }
      );
      if (changestatus.status !== 200) {
        console.log(changestatus.data.error);
      } else {
        toast.success("เสร็จสิ้นงานแล้วเรียบร้อย");
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

  const handleClickConfirm = (id) => {
    setAlertConfirm(true);
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
        message={"ต้องการยืนยันว่าทำงานเสร็จสิ้น"}
        clickCancel={() => {
          setAlertConfirm(false);
        }}
        clickOK={handleClickConfirmOK}
      />
      {invoice_id && (
        <SummaryInvoice
          role={"maid"}
          invoice_id={invoice_id}
          clickCancel={() => {
            setInvoiceId(null);
          }}
        />
      )}
      <div className={`page-container ${alertConfirm ? "blurred" : ""}`}>
        {customers.map((customer, customerid) => (
          <section key={customerid}>
            {customer.user_id && (
              <ProfileBox
                user={customer}
                clickConfirm={() => handleClickConfirm(customer?.invoice_id)}
                buttonName="สิ้นสุดงาน"
                handleClickSummary={handleClickSummary}
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

export default MaidStatusWork;
