import { useRef, useState, useEffect } from "react";
import ManageJob from "./ManageJob";
import "./css/ProfileEdit.css";
import moment from "moment/moment";

function ProfileEdit({
  user,
  checkPass,
  userPass,
  handleChange,
  handleImageChange,
  manageJob = null,
  clickSubmit,
  clickCancle,
}) {
  const userImg = useRef(null);
  const [cfpw, setCfpw] = useState("");

  const isMatch = userPass !== "" ? userPass === cfpw : false;

  // useEffect(() => {
  //   console.log(userPass);
  // }, [userPass]);

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
              onChange={handleImageChange}
            ></input>
          </label>
        </figure>
      </header>
      <main>
        <section className="radio-wrapper">
          <b> Role </b>
          <div>
            <label className="radio-container">
              <input
                name="role"
                type="radio"
                onChange={handleChange}
                autoComplete="off"
                value="user"
                checked={user.user_role === "customer"}
                disabled={true}
              />
              <span className="checkmark">ผู้ใช้ทั่วไป</span>
            </label>
            <label className="radio-container">
              <input
                type="radio"
                name="role"
                onChange={handleChange}
                autoComplete="off"
                value="maid"
                checked={user.user_role === "maid"}
                disabled={true}
              />
              <span className="checkmark">แม่บ้าน</span>
            </label>
          </div>
        </section>

        <section>
          <b>ชื่อ</b>
          <input
            name="firstname"
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={user.firstname || ""}
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
            value={user.lastname || ""}
            required
          />
        </section>

        <section>
          <b>วันเกิด</b>
          <input
            name="birthday"
            type="date"
            onChange={handleChange}
            autoComplete="off"
            value={moment(user.birthday).format("YYYY-MM-DD")}
            required
          />
        </section>

        <section>
          <b>เบอร์โทร</b>
          <input
            name="telephone"
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={user.tel || ""}
            maxLength={10}
            required
          />
        </section>

        <section>
          <b>อีเมล</b>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            autoComplete="off"
            value={user.email || ""}
            required
          />
        </section>

        <section>
          <b>เกี่ยวกับฉัน</b>
          <input
            name="description"
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={user.description || ""}
          />
        </section>
        <section>
          <b>รหัสผ่านเก่า</b>
          <input
            name="oldpass"
            type="password"
            onChange={handleChange}
            autoComplete="off"
            value={user.oldpass || ""}
            required
          />
        </section>
        <section>
          <b>รหัสผ่านใหม่</b>
          <input
            name="pass"
            type="password"
            onChange={handleChange}
            autoComplete="off"
            value={userPass || ""}
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

        {checkPass ? (
          <p style={isMatch ? { display: "none" } : {}}> รหัสผ่านไม่ตรงกัน</p>
        ) : user.oldpass != undefined ? (
          <p>รหัสผ่านเก่าผิด</p>
        ) : (
          ""
        )}

        {manageJob && <ManageJob user={user} handleChange={handleChange} />}

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
