import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import SummaryInvoice from "../../components/SummaryInvoice";
import "../../components/Helmet.jsx";
import api from "../../axios";

function MaidStatusEnd() {
  const [customers, setCustomers] = useState([]);
  const [invoice_id, setInvoiceId] = useState(null);
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.post("/api/v1/invoice/maid/status/end", {
          token: window.localStorage.getItem("authtoken"),
        });
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomer();
  }, []);
  const handleClickSummary = (invId) => {
    setInvoiceId(invId);
  };

  return (
    <>
      {invoice_id && (
        <SummaryInvoice
          role={"maid"}
          invoice_id={invoice_id}
          clickCancel={() => setInvoiceId(null)}
        />
      )}
      <div style={{ marginBottom: "10vw" }}>
        {customers.map((customer, customerid) => (
          <section
            key={customerid}
            //     onClick={handleClickSummary(customer.invoice_id)}
          >
            {customer.user_id && (
              <ProfileBox
                user={customer}
                canClick={false}
                handleClickSummary={handleClickSummary}
                buttonName="เสร็จสิ้นแล้ว"
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

export default MaidStatusEnd;
