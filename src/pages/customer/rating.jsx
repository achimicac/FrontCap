import { useState, useEffect } from "react";
import Axios from "../../axios";
import RatingBox from "../../components/RatingBox";
import Popup from "../../components/Popup";
import "./css/rating.css";
import api from "../../axios";
import Alert from "../../components/Alert";
import toast from "react-hot-toast";

function UserStatusRating() {
  const [invoice, setInvoice] = useState([]);

  const fetchInvoice = async () => {
    try {
      const res = await api.post("/api/v1/invoice/customer/status/end", {
        token: window.localStorage.getItem("authtoken"),
      });
      setInvoice(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  const handleStarClick = (invoiceID, starValue) => {
    setInvoice((prevMaids) =>
      prevMaids.map((maid) => {
        if (maid.invoice_id === invoiceID) {
          return { ...maid, star: starValue };
        }
        return maid;
      })
    );
  };

  const handleComment = (invoiceID, comment) => {
    setInvoice((prevMaids) =>
      prevMaids.map((maid) => {
        if (maid.invoice_id === invoiceID) {
          return { ...maid, comment: comment };
        }
        return maid;
      })
    );
  };

  const handleSubmit = async (maidId) => {
    try {
      const newreview = invoice.find((maid) => maid.id === maidId);
      const addreview = await api.post("/api/v1/review/addReview", newreview);
      if (addreview.data.success === true) {
        console.log("success");
        toast.success("เพิ่มรีวิวเรียบร้อยแล้ว");
        setInvoice((prevInvoice) =>
          prevInvoice.filter(
            (item) => item.invoice_id !== addreview.data.invoice_id
          )
        );
        //invoice.splice(invoice.invoice_id, addreview.data.invoice_id)
        return;
      } else {
        console.log("error");
        toast.error("กรุณาส่งรีวิวใหม่อีกครั้ง");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Alert />
      <section className="rating-page" style={{ marginBottom: "10vw" }}>
        {invoice.map((invoice, index) => (
          <RatingBox
            key={index}
            handleSubmit={handleSubmit}
            invoice={invoice}
            clickStar={handleStarClick}
            handleChange={handleComment}
          />
        ))}
      </section>
    </>
  );
}

export default UserStatusRating;
