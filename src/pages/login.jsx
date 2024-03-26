import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Popup from "../components/Popup";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        account: "",
        password: "",
    });
    const [alert, setAlert] = useState(false);
    const [alertMessage, setMessage] = useState('');

    const handleChange = useCallback((e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }, [user]);

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const {checkuser} = await axios.post('/api/login', user)

            if ( !checkuser.data.success ) {
                    setMessage(checkuser.text)
                    setAlert(true);
                    return;
                }
            navigate('/');
            } catch (error) {
                  console.error("Error:", error);
            }
      };

    return (
        <>
            <Popup 
                alert={alert} 
                message={alertMessage}
                clickCancel={()=>{setAlert(false)}}
            />
            <h1> LogIn </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Telephone or Email
                    <input
                        name='account'
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

                <button> Sign up</button>
            </form>
        </>
    )
}

export default Login;