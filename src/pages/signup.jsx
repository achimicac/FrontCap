import { useState, useCallback } from "react";
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
    })
    const [cfpw, setCfpw] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setMessage] = useState('');

    const handleChange = useCallback((e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }, [user]);
    const isMatch = user.password === cfpw;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //console.log(user);
            const {adduser} = await axios.post('/api/signup', user)

            if ( !adduser.success ) {
                setMessage(adduser.text)
                setAlert(true);
                return;
            }
            navigate('/login');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Popup alert={alert} message={alertMessage} haveButton={false} clickCancel={()=>{setAlert(false)}}/>

            <h1> Sign Up </h1>
            <form onSubmit={handleSubmit}>
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
                            required
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
                            required
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