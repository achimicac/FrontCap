import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './css/Popup.css'

function Popup({alert, message, clickCancel, clickOK, buttonName='OK'}) {
      return (
            <dialog className={`${alert ? 'show' : ''}`} id="popup">
                  <span onClick={clickCancel}><MdCancel color="#00897B"/></span>
                  <span> {message} </span>
                  <section className='popup_button'>
                        {clickOK && 
                              <button onClick={clickOK}> {buttonName} </button>
                        }
                        {clickCancel && 
                              <button onClick={clickCancel} className="cancle"> ยกเลิก </button>
                        }
                  </section>
                  
            </dialog>
      )
}

export default Popup;