import "./css/ProfileBox.css";
import dayjs from "dayjs";

function ProfileBox({
  user,
  clickConfirm,
  clickCancel,
  buttonName = "ยืนยัน",
  canClick = true,
}) {
  const thai_month = [
    "มรกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const date_month_year = dayjs(user.work_date);
  const date = date_month_year.date();
  const month = thai_month[date_month_year.month()];
  const year = date_month_year.year() + 543;

  const startTime = user.start_time.slice(0,5) + " น."
  const submitTime = user.submit_time.slice(0,5) + " น."

  return (
    <div className="profilebox-wrapper">
      <section className="profilebox-container">
        {/*<figure className="profilebox-avatar">*/}
        {user.user_pic ? (
          <img src={"../../public/imageGalleries/" + user.user_pic} />
        ) : (
          <img
            src={"../../public/imageGalleries/1716567567852no_account.png"}
          />
        )}
        {/*</figure>*/}
        <div className="profilebox-content">
          <article className="profilebox-information">
            <header>
              {user.firstname} {user.lastname}
            </header>
            <section className="job-date">
              วันที่ :
              <span>{date} {month} {year}</span>
              เวลา :
              <span>
                {startTime}-{submitTime}
              </span>
            </section>
            <section className="job-chips">
              {user.jobs.map((job, index) => (
                <span key={index}> {job.job_name} </span>
              ))}
            </section>
          </article>

          {canClick ? (
            <footer>
              {clickConfirm && (
                <button onClick={clickConfirm}> {buttonName} </button>
              )}
              {clickCancel && (
                <button onClick={clickCancel} className="btn-outline">
                  {" "}
                  ปฏิเสธ{" "}
                </button>
              )}
            </footer>
          ) : (
            <footer className="footer-nobutton">
              <p style={{ margin: "12px 0 0 0" }}> {buttonName} </p>
            </footer>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfileBox;
