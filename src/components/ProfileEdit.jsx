import { useRef, useState } from "react";

function ProfileEdit({user, jobchoices, handleChange, handleSubmit, handleCancle, isMaid=false}) {
      const userImg = useRef(null);
      const [hidepw, setHidepw] = useState(true)
      const [cfpw, setCfpw] = useState("")

      const seePassword = () => {
            console.log("kuay")
      }
      const handleClickImg = () => {
            userImg.current.click();
      }
      const isMatch = user.password === cfpw;

    return (
        <>
            <form>

                <figure onClick={handleClickImg}>
                    <label>
                        {user.user_pic ? (
                            <img src={URL.createObjectURL(userImg.current.files[0])} style={{width: '30vw'}} />
                        ) : (
                            <img src='MaKing.jpg' style={{width: '50vw'}} />
                        )}
                        <input name='user_pic' type="file" ref={userImg} style={{display: 'none'}} onChange={handleChange}></input>
                    </label>
                </figure>

                <label>
                    Role
                    <label>
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
                    </label>
                    <label>
                        maid
                        <input
                            name='role'
                            type='radio'
                            onChange={handleChange}
                            autoComplete='off'
                            value='maid'
                            checked={user.role === 'maid'}
                            disabled={true}
                        />
                    </label>
                </label>

                <label>
                    Firstname
                    <input
                        name='firstname'
                        type='text'
                        onChange={handleChange}
                        autoComplete='off'
                        value={ user.firstname }
                        required
                    />
                </label>

                <label>
                    Lastname
                    <input
                        name='lastname'
                        type='text'
                        onChange={handleChange}
                        autoComplete='off'
                        value={ user.lastname }
                        required
                    />
                </label>

                <label>
                    Birthday
                    <input
                        name='birthday'
                        type='date'
                        onChange={handleChange}
                        autoComplete='off'
                        value={ user.birthday }
                        required
                    />
                </label>

                <label>
                    Telephone
                    <input
                        name='telephone'
                        type='text'
                        onChange={handleChange}
                        autoComplete='off'
                        value={ user.telephone }
                        //placeholder="xxx-xxx-xxxx"
                        //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        maxLength={10}
                        required
                    />
                </label>

                <label>
                    Email
                    <input
                        name='email'
                        type='email'
                        onChange={handleChange}
                        autoComplete='off'
                        value={ user.email }
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        name='password'
                        type='password'
                        onChange={handleChange}
                        autoComplete='off'
                        value={ user.password }
                        required
                    />
                </label>

                <label>
                    Confirm Password
                    <input
                        name='cfpw'
                        type='password'
                        onChange={ (e) => setCfpw(e.target.value) }
                        autoComplete='off'
                        value={ cfpw }
                        required
                    />
                    <p style={isMatch ? {display: 'none'}:{}}> Password is not Match!</p>
                </label>
                {isMaid && 
                  <label>
                        jobtype
                        {user.jobtype.map((job, jobid) => {
                              <p> {job.job_name} </p>
                        })}
                        {user.jobtype.map((job, jobid) => {
                              <input
                                    key={ jobid }
                                    type='checkbox'
                                    value={ job}

                              />
                        })}
                  </label>
                }

                <label>
                  Description
                  <input
                        name="descript"
                        type="textarea"
                        onChange={handleChange}
                        autoComplete='off'
                        value={ user.descript }
                  />
                </label>

                <button onClick={handleSubmit}> Login</button>
                <button onClick={handleCancle}> Cancle </button>
            </form>
        </>
    )
}

export default ProfileEdit;