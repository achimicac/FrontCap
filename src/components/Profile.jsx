import "./css/NewProfile.css";
import moment from "moment";

function Profile({ user, isMaid = false, clickEdit }) {
  const thai_months = [
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
  const birthday = moment(user.birthday);
  const date = birthday.date();
  const month = thai_months[birthday.month()];
  const year = birthday.year() + 543;

  const birthday_thai = date + " " + month + " " + year;
  const age = moment().year() - moment(user.birthday).year();

  return (
    <main className="profile-wrapper">
      <header>
        {user.user_pic ? (
          <img src={"../../public/imageGalleries/" + user.user_pic} />
        ) : (
          <img
            src={"../../public/imageGalleries/1716567567852no_account.png"}
          />
        )}
        <span>
          {user.firstname} {user.lastname}{" "}
        </span>
        <span>{user.description}</span>
      </header>

      <main>
        <section>
          <b>วันเกิด</b>
          <span> {birthday_thai} </span>
        </section>
        <section>
          <b>อายุ</b>
          <span> {age} </span>
        </section>
        <section>
          <b>เบอร์โทร</b>
          <span> {user.tel} </span>
        </section>
        <section>
          <b>อีเมล</b>
          <span> {user.email} </span>
        </section>
        <section>
          <b>รหัสผ่าน</b>
          <span> ************ </span>
        </section>
        {isMaid && (
          <section className="jobtype">
            <b>ประเภทงาน</b>
            {user.jobs && (user.jobs.map((job, index) => (
              <span key={index}> {job.job_name} </span>
            )))}
          </section>
        )}
        <footer className="profile-footer">
          <button onClick={clickEdit}> Edit </button>
        </footer>
      </main>
    </main>
  );
}

export default Profile;

