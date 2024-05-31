import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import api from "../../axios";

function UserStatusWork() {
  const invoiceID = useRef(null);
   const [invoice_id, setInvoiceId] = useState(null);
  const [maids, setMaids] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.post("/api/v1/invoice/customer/status/work", {
          token: window.localStorage.getItem("authtoken"),
        });
        setMaids(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCustomer();
  }, []);

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
      {maids.map((maid, index) => (
        <section key={index} onClick={handleClickSummary(maid.invoice_id)}>
          {maid.user_id && (
            <ProfileBox
              user={maid}
              canClick={false}
              buttonName="กำลังทำงาน..."
            />
          )}
        </section>
      ))}
    </>
  );
}

export default UserStatusWork;
