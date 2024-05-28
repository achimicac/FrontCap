import { useEffect, useState, useRef } from "react";
import ProfileBox from "../../components/ProfileBox";
import api from "../../axios";

function UserStatusWork() {
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

  return (
    <>
      {maids.map((maid, index) => (
        <section key={index}>
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
