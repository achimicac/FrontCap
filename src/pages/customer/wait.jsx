import { useEffect, useState } from "react";
import ProfileBox from "../../components/ProfileBox";
import Popup from "../../components/Popup";
import api from "../../axios";

function UserStatusWait() {
  const [maids, setMaids] = useState([]);

  const getIInvoice = async () =>
    await api
      .post("/api/v1/invoice/getInvoice", {
        token: window.localStorage.getItem("authtoken"),
      })
      .then((res) => {
        if (!res.data.success) return;
        const invoice_data = res.data.invoice.filter(
          (invoice) => invoice.status == "wait"
        );
        setMaids(invoice_data);
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    getIInvoice();
  }, []);

  return (
    <>
      {maids.length > 0
        ? maids.map((maid, index) => (
            <section key={index}>
              <ProfileBox
                user={maid}
                canClick={false}
                buttonName="รอแม่บ้านยืนยัน"
              />
            </section>
          ))
        : ""}
    </>
  );
}

export default UserStatusWait;
