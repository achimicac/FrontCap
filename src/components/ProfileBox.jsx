import "./css/ProfileBox.css";
import "moment/locale/th";

function ProfileBox({
  user,
  name = null,
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
      <section className="profilebox-container" id={name && "cancel"}>
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
              <section>
                <b>วันที่ :</b>
                <span>{result}</span>
              </section>
              <section>
                <b>เวลา :</b>
                <span>
                  {user.start_time?.split(":")[0]}.
                  {user.start_time?.split(":")[1]} น. -{" "}
                  {user.end_time?.split(":")[0]}.{user.end_time?.split(":")[1]}{" "}
                  น.
                </span>
              </section>
            </section>
            <section className="job-chips">
              {user.jobs?.slice(0, 10).map((job, job_index) => (
                <span key={job_index}>{job.job_name}</span>
              ))}
              {user.jobs?.length > 10 && <span> more... </span>}
            </section>
            {name && (
              <span className="maid-cancel">
                แม่บ้านไม่รับงานนี้ กรุณากดยกเลิก
              </span>
            )}
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
