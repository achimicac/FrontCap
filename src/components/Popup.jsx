import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './css/Popup.css'

function Popup({alert, message, haveButton, clickCancel, clickOK, buttonName='OK'}) {


      return (
            <dialog className={`${alert ? 'show' : ''}`}>
                  <p onClick={clickCancel}><MdCancel/></p>
                  <p> {message} </p>

                  
                  <section className='popup_button'>
                        {clickOK && 
                              <button onClick={clickOK}> {buttonName} </button>
                        }
                        {clickCancel && 
                              <button onClick={clickCancel} > CANCLE </button>
                        }
                  </section>
                  
            </dialog>
      )
}

export default Popup;