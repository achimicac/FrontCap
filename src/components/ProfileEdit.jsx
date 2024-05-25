import { useRef, useState } from "react";
import ManageJob from "./ManageJob";
import './css/ProfileEdit.css'

function ProfileEdit({ user, handleChange, manageJob=null, jobchoices, clickSubmit, clickCancle }) {
  const userImg = useRef(null);
  const [hidepw, setHidepw] = useState(true);
  const [cfpw, setCfpw] = useState("");

  const seePassword = () => {
    console.log("kuay");
  };
  const handleClickImg = () => {
    userImg.current.click();
  };
  const isMatch = user.password === cfpw;

    return (
        <main className="editprofile-wrapper">
            <header>
                <figure onClick={handleClickImg}>
                        <label>
                            {user.user_pic ? (
                                    <img src={`data:image/jpeg;base64,${maid.user_pic}`} style={{width: '30vw'}} />
                                    ) : (
                                    <img src={"/sudlore.png"} style={{width: '30vw'}} />
                            )}
                        <input name='user_pic' type="file" ref={userImg} style={{display: 'none'}} onChange={handleChange}></input>
                        </label>
                </figure>
            </header>
            <main>
                <section className="radio-wrapper">
                    <b> Role </b>
                    <div>
                        <label className="radio-container">
                            user
                                <input
                                    name="role"
                                    type="radio"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value="user"
                                    checked={user.role === 'user'}
                                    disabled={true}
                                />
                            <span className="checkmark"></span>
                        </label>
                        <label className="radio-container">
                            maid
                            <input
                            type="radio"
                            name="role"
                            onChange={handleChange}
                            autoComplete="off"
                            value="maid"
                            checked={user.role === "maid"}
                            disabled={true}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </section>

            <section>
                <b>Firstname</b>
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
                <b>Lastname</b>
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
                <b>Birthday</b>
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
                <b>Telephone</b>
                <input
                name="telephone"
                type="text"
                onChange={handleChange}
                autoComplete="off"
                value={user.telephone}
                //placeholder="xxx-xxx-xxxx"
                //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength={10}
                required
                />
            </section>

            <section>
                <b>Email</b>
                <input
                name="email"
                type="email"
                onChange={handleChange}
                autoComplete="off"
                value={user.email}
                required
                />
            </section>

            {/*<section>
                <b>Password</b>
                <input
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="off"
                value={user.password}
                required
                />
            </section>

            <section>
                <b> Confirm Password</b>
                <input
                name="cfpw"
                type="password"
                onChange={(e) => setCfpw(e.target.value)}
                autoComplete="off"
                value={cfpw}
                required
                />
            </section>
            <p style={isMatch ? { display: "none" } : {}}>Password is not Match!</p>*/}
            <section>
                <b>Description</b>
                <textarea
                    name="descript"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.descript}
                />
            </section>
                {manageJob &&
                    <ManageJob user={user} jobchoices={jobchoices} handleChange={handleChange} />
                }   
                <footer className="profile-footer">
                    <button onClick={clickSubmit}> ตกลง </button>
                    <button onClick={clickCancle} className="cancle"> ยกเลิก </button>
                </footer>
            </main>
        </main>
    );
}

export default ProfileEdit;
