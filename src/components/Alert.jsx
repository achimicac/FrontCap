import toast, { Toaster } from 'react-hot-toast';
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

function Alert ({text, alertFor}) {

  return (
      <div>
            <Toaster
                  toastOptions={{
                        style: {
                              color: 'white',
                              fontWeight: '400',
                              fontSize: '1em',
                              marginTop: '50px'
                        },
                        
                        success: {
                              icon: <FaCheckCircle />,
                              style: {
                                    background: '#A3E297'
                              }
                        },
                        error: {
                              icon: <MdCancel />,
                              style: {
                                    background: '#FF9F8C'
                              }
                        },
                  }}
            />
    </div>
  );
};
export default Alert;