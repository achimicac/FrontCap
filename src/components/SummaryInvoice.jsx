import { useEffect, useState } from "react";
import api from "../axios";
import './css/SummaryInvoice.css';
import { MdCancel } from "react-icons/md";

function SummaryInvoice({ invoice_id, role, clickCancel }) {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.get(`/api/v1/invoice/${role}/summary/${invoice_id}`);
        setInvoice(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInvoice();
  }, [invoice_id, role]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const date = new Date(invoice.work_date);
  const dateFormat = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <div className="overlay" onClick={() => clickCancel(null)}></div>
      <div className="invoice-summary">
            <div className="content-invoice-summary">
                  <span onClick={() => clickCancel(null)} className="cancel-icon">
                        <MdCancel />
                  </span>
        <header>
          <header>โปรไฟล์</header>
          {invoice.user_pic ? (
            <img src={"../../public/imageGalleries/" + invoice.user_pic} alt="User" />
          ) : (
            <img src={"../../public/imageGalleries/1716567567852no_account.png"} alt="Default User" />
          )}
          <article className="user-profile">
            <header>{invoice.firstname} {invoice.lastname}</header>
            <section className="personal-info">
              <header>ข้อมูลทั่วไป</header>
              <section>
                <b>เพศ:</b>
                <span>{invoice.gender}</span>
              </section>
              <section>
                <b>วันเกิด:</b>
                <span>{invoice.birthday}</span>
              </section>
              <section>
                <b>อายุ:</b>
                <span>{invoice.age}</span>
              </section>
            </section>
            <section className="contact-info">
              <header>ช่องทางติดต่อ</header>
              <section>
                <b>เบอร์โทร:</b>
                <section>{invoice.tel}</section>
              </section>
              <section>
                <b>อีเมล:</b>
                <section>{invoice.email}</section>
              </section>
            </section>
            <section className="address-info">
              <header>ที่อยู่</header>
              <section>
                <b>ละติจูด:</b>
                <section>{invoice.latitude}</section>
                <b>ลองจิจูด:</b>
                <section>{invoice.longitude}</section>
              </section>
              <section>
                <b>รายละเอียดเพิ่มเติม:</b>
                <section>{invoice.address}</section>
              </section>
            </section>
          </article>
        </header>
        <main>
          <header className="dateroom-info">
            <section>
              <b>ชนิดห้อง:</b>
              <span>{invoice.room_type}</span>
              <span>{invoice.room_size}</span>
            </section>
            <section>
              <b>วันที่-เวลา:</b>
              <span>{dateFormat}</span>
              <span>{invoice.start_time?.split(':', 1)[0]}.00 น. - {invoice.end_time?.split(':', 1)[0]}.00 น.</span>
            </section>
            <section>
              <b>ค่าจ้าง:</b>
              <span>{invoice.amount}</span>
            </section>
          </header>
          <section className="job-chips">
            {invoice.jobtype?.map((job, jobindex) => (
              <span key={jobindex}>{job.job_name}</span>
            ))}
          </section>
        </main>
            </div>
       
      </div>
    </>
  );
}

export default SummaryInvoice;
