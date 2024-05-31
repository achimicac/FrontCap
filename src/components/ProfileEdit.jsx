import { useRef, useState } from "react";
import ManageJob from "./ManageJob";
import "./css/ProfileEdit.css";

function ProfileEdit({
  user,
  handleChange,
  handleImageChange,
  manageJob = null,
  jobchoices,
  clickSubmit,
  clickCancle,
  handleJobChange,
}) {
  const userImg = useRef("");
  const [cfpw, setCfpw] = useState("");

  const isMatch = user.pass === cfpw;

  return (
    <main className="editprofile-wrapper">
      <header>
        <figure>
          <label>
            {user.user_pic ? (
              <img src={"../../public/imageGalleries/" + user.user_pic} />
            ) : (
              <img
                src={"../../public/imageGalleries/1716567567852no_account.png"}
              />
            )}
            <input
              name="user_pic"
              type="file"
              ref={userImg}
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
            ></input>
          </label>
        </figure>
      </header>
      <main>
        <section className="radio-wrapper">
          <b> บทบาท </b>
          <div>
            <label className="radio-container">
              
              <input
                name="role"
                type="radio"
                onChange={handleChange}
                autoComplete="off"
                value="customer"
                checked={user.user_role === "customer"}
                disabled={true}
              />
              <span className="checkmark">ผู้ใช้ทั่วไป</span>
            </label>
            <label className="radio-container">
              แม่บ้าน
              <input
                type="radio"
                name="role"
                onChange={handleChange}
                autoComplete="off"
                value="maid"
                checked={user.user_role === "maid"}
                disabled={true}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </section>

        <section>
          <b>วันเกิด</b>
          <input
            name="birthday"
            type="date"
            onChange={handleChange}
            autoComplete="off"
            value={user.birthday}
            required
          />
        </section>

        <section>
          <b>ชื่อ</b>
          <input
            name="firstname"
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={user.firstname}
            required
          />
        </section>

        <section>
          <b>นามสกุล</b>
          <input
            name="lastname"
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={user.lastname}
            required
          />
        </section>

        <section>
          <b>โทรศัพท์</b>
          <input
            name="tel"
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={user.tel}
            //placeholder="xxx-xxx-xxxx"
            maxLength={10}
            required
          />
        </section>

        <section>
          <b>อีเมล</b>
          <span>{user.email}</span>
        </section>
        <section>
          <b>เกี่ยวกับฉัน</b>
          <textarea
            name="description"
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={user.description}
          />
        </section>
        {manageJob && (
          <ManageJob
            user={user}
            handleChange={handleChange}
          />
        )}
        <section>
          <b>รหัสผ่านเก่า</b>
          <input
            name="oldpass"
            type="password"
            onChange={handleChange}
            autoComplete="off"
            value={user.oldpass ? user.oldpass : ""}
            required
          />
        </section>
        <section>
          <b>รหัสผ่าน</b>
          <input
            name="pass"
            type="password"
            onChange={handleChange}
            autoComplete="off"
            value={user.pass ? user.pass : ""}
            required
          />
        </section>

        <section>
          <b> ยืนยันรหัสผ่าน </b>
          <input
            name="cfpw"
            type="password"
            onChange={(e) => setCfpw(e.target.value)}
            autoComplete="off"
            value={cfpw}
            required
          />
        </section>
        <div>
          {user.checkPass ? (
            <p style={isMatch ? { display: "none" } : {}}>รหัสผ่านไม่ตรงกัน</p>
          ) : (
            <p>รหัสผ่านเก่าผิด</p>
          )}
        </div>

        <footer className="profile-footer">
          <button onClick={clickSubmit}> ตกลง </button>
          <button onClick={clickCancle} className="cancle">
            {" "}
            ยกเลิก{" "}
          </button>
        </footer>
      </main>
    </main>
  );

}

export default ProfileEdit;
