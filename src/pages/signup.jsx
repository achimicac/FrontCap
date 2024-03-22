import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Popup from "../components/Popup";

function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        role: "",
        firstname: "",
        lastname: "",
        birthday: "",
        telephone: "",
        email: "",
        password: "",
        user_pic: null
    })
    const userImg = useRef(null);
    const [cfpw, setCfpw] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setMessage] = useState('');

    const handleChange = useCallback((e) => {
        if(e.target.name === 'user_pic') {
            /*const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.toBlob(
                (blob) => {
                    const file = new File([blob], e.target.files[0].name, {
                    type: "img/jpg",
                    lastModified: Date.now(),
                    });
                    console.log(file);
                    setUser({ ...user, [e.target.name]: e.target.files[0] });
                },
                "image/jpeg",
                0.8
                );
            };
            };*/
            setUser({ ...user, [e.target.name]: e.target.files[0] });

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }, [user]);
    const isMatch = user.password === cfpw;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            /*const formdata = new FormData();
            formdata.append("file", user.user_pic);
            formdata.append("firstname", user.firstname)*/

            const {adduser} = await axios.post('/api/signup', user)

            if ( !adduser.data.success ) {
                setMessage(adduser.text)
                setAlert(true);
                return;
            }
            //navigate('/login');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickImg = () => {
        userImg.current.click();
    }
    console.log(user.user_pic)

    return (
        <>
            <Popup 
                alert={alert} 
                message={alertMessage}
                clickCancel={()=>{setAlert(false)}}
            />

            <h1> Sign Up </h1>
            <form onSubmit={handleSubmit}>

                <figure onClick={handleClickImg}>
                    <label>
                        {user.user_pic ? (
                            <img src={URL.createObjectURL(user.user_pic)} style={{width: '30vw'}} />
                        ) : (
                            <img src="/Making.jpg" style={{width: '50vw'}} />
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

                <button> Sign up</button>
            </form>
        </>
    )
}

export default Signup;