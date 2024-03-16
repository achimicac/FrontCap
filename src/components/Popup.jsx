import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './css/Popup.css'

function Popup({alert, message, haveButton, navto=null, clickCancel}) {
      const navigate = useNavigate();

      // const [showalert, setAlert] = useState(alert);
      // const clickCancel = () => {
      //       setAlert(false)
      // }

      const clickOK = (e) => {
            e.preventDefault();
            navigate(navto);
      }
      
      return (
            <dialog className={`${alert ? 'show' : ''}`}>
                  <p onClick={clickCancel}><MdCancel/></p>
                  <p> {message} </p>

                  {haveButton &&
                        <section className='popup_button'>
                              <button onClick={clickOK}> OK </button>
                              <button onClick={clickCancel}> CANCLE </button>
                        </section>
                  }
            </dialog>
      )
}

export default Popup;