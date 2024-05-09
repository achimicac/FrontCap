import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Popup from "../components/Popup";
import "./styles/signup.css";
import ManageJob from "../components/ManageJob";
import './styles/signup.css'
import Map from "../components/Map";

function Signup() {
  const navigate = useNavigate();

    const [page, setPage] = useState(0); 
    const [jobchoices, setJobchoices] = useState([]);
    const [user, setUser] = useState({
        role: "",
        firstname: "",
        lastname: "",
        birthday: "",
        telephone: "",
        email: "",
        password: "",
        user_pic: null,
        jobtype: [],
        address: {
            latitude: '',
            longitude: '',
            address: ''
        }
    });
    const userImg = useRef(null);
    const [cfpw, setCfpw] = useState('');
  const [alert, setAlert] = useState(false);
    const [alertMessage, setMessage] = useState('');
    const [showMap, setShowMap] = useState(false)
    const isMatch = user.password === cfpw;

    const handleChange = useCallback((e) => {
        const { name, value, files, checked } = e.target;

        if (name === 'user_pic') {
            const file = files[0];
            setUser(prevUser => ({ ...prevUser, user_pic: file }));
        } else if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setUser(prevUser => ({
                ...prevUser,
                address: {
                    ...prevUser.address,
                    [field]: value
                }
            }));
        } else if (name === "jobtype") {
            const [valueId, valueName] = value.split('-');
            const jobTypeId = parseInt(valueId, 10);
            setUser(prevUser => ({
                ...prevUser,
                jobtype: checked
                    ? [...prevUser.jobtype, { job_id: jobTypeId, job_name: valueName }]
                    : prevUser.jobtype.filter(job => job.job_id !== jobTypeId)
            }));
        } else {
            setUser(prevUser => ({ ...prevUser, [name]: value }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.entries(user).forEach(([key, value]) => {
                if (key !== 'jobtype' && key !== 'address') {
                    formData.append(key, value);
                }
            });
            formData.append('jobtype', JSON.stringify(user.jobtype));
            formData.append('address', JSON.stringify(user.address));

            const { data: { success, text } } = await axios.post('/api/signup', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

            if (!success) {
                setMessage(text);
                setAlert(true);
                return;
            }

      for (const key in user) {
        formData.append(key, "");
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickImg = () => {
    userImg.current.click();
  };

  const nextPage = () => {
    setPage(1);
  };

    const SelectLocation = () => {
        setShowMap(!showMap)
    }

    const handleLocation = (latitude, longitude) => {
        setUser(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                latitude: latitude,
                longitude: longitude
            }
        }))
    }

    console.log("location:  " + user.address.latitude + "  " + user.address.longitude)

    return (
        <>
            <Popup
                alert={alert}
                message={alertMessage}
                clickCancel={() => { setAlert(false) }}
            />
            {showMap && 
                <div className="map-container">
                    <Map handleLocation={handleLocation} show={showMap} />
                </div>
            }



            
            <div className="signup-container">
            <div className="form-container"></div>
            <form className={showMap ? "blurred" : ""} >
                {page === 0 && (
                    <section className='signup-form'>
                        <h1
                            style={{
                                textAlign: "center",
                                fontStyle: "italic",
                                color: "#00897B",
                            }}
                        ></h1>
                        <figure onClick={handleClickImg}>
                            <label>
                                {user.user_pic ? (
                                    <img src={URL.createObjectURL(userImg.current.files[0])} style={{ width: '50vw' }} />
                                ) : (
                                    <img src={"/sudlore.png"} style={{ width: '30vw' }} />
                                )}
                                <input name='user_pic' type="file" ref={userImg} style={{ display: 'none' }} onChange={handleChange}></input>
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
                                    
                                />
                            </label>
                        </label>

                <label>
                  Firstname
                  <input
                    name="firstname"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.firstname}
                    //required
                  />
                </label>

                <label>
                  Lastname
                  <input
                    name="lastname"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.lastname}
                    //required
                  />
                </label>

                <label>
                  Birthday
                  <input
                    name="birthday"
                    type="date"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.birthday}
                    //required
                  />
                </label>

                <label>
                  Telephone
                  <input
                    name="telephone"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.telephone}
                    //placeholder="xxx-xxx-xxxx"
                    //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    maxLength={10}
                    //required
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
                                //required
                            />
                        </label>

                        <label>
                            Address
                            <label>
                                Latitude
                                <input 
                                    name="latitude"
                                    type="number"
                                    onChange={handleChange}
                                    onClick={SelectLocation}
                                    autoComplete='off'
                                    value={ user.address.latitude  }
                                />
                            </label>
                            {/*<label>
                                Longtitude
                                <input 
                                    name="longtitude"
                                    type="number"
                                    onChange={handleChange}
                                    autoComplete='off'
                                    value={ user.address.longtitude}
                                />
                            </label>*/}
                            <label>
                                More Information
                                <input 
                                    name="address"
                                    type="text"
                                    onChange={handleChange}
                                    autoComplete='off'
                                    value={ user.address.address }
                                />
                            </label>
                        </label>

                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    autoComplete="off"
                    value={user.password}
                    //required
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
                                //required
                            />
                            <p style={isMatch ? {display: 'none'}:{}}> Password is not Match!</p>
                        </label>

                        {(page === 0 && user.role === "maid") && <button type="button" onClick={nextPage}> Next </button>}
                        {((page === 0 && user.role === "user") || page === 1) && <button type="submit" onClick={handleSubmit}> Sign Up </button>}

                    </section>
                )}

                {page === 1 && (
                    <section className="addjob-form">
                        <ManageJob user={user} handleChange={handleChange}/>
                    </section>
                )}

                {(page === 0 && user.role === "maid") && <button type="button" onClick={nextPage}> Next </button>}
                {((page === 0 && user.role === "user") || page === 1) && <button type="submit" onClick={handleSubmit}> Sign Up </button>}
                
            </form>
        </>
    )
}

export default Signup;

