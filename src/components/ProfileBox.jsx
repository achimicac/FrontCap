import "./css/ProfileBox.css";
import "moment/locale/th";

function ProfileBox({
  user,
  clickConfirm,
  clickCancel,
  buttonName = "ยืนยัน",
  canClick = true,
  handleClickSummary,
}) {
  const date = new Date(user.work_date);
  const result = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="profilebox-wrapper">
      <section className="profilebox-container">
        {user.user_pic ? (
          <img
            src={"../../public/imageGalleries/" + user.user_pic}
            onClick={() => {
              handleClickSummary(user.invoice_id);
            }}
          />
        ) : (
          <img
            src={"../../public/imageGalleries/1716567567852no_account.png"}
            onClick={() => {
              handleClickSummary(user.invoice_id);
            }}
          />
        )}

        <div className="profilebox-content">
          <article
            className="profilebox-information"
            onClick={() => {
              handleClickSummary(user.invoice_id);
            }}
          >
            <header>
              {" "}
              {user.firstname} {user.lastname}{" "}
            </header>
            <section className="job-date">
              <b>วันที่ :</b>
              <span>{result}</span>
              <b>เวลา :</b>
              <span>
                {user.start_time?.split(":")[0]}.
                {user.start_time?.split(":")[1]} น. -{" "}
                {user.end_time?.split(":")[0]}.{user.end_time?.split(":")[1]} น.
              </span>
            </section>
            <section className="job-chips">
              {user.jobs?.map((job, jobindex) => (
                <span key={jobindex}> {job.job_name} </span>
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
