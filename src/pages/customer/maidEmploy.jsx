import { useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Profile from "../../components/Profile";


function UserMaidEmploy() {
      const { id } = useParams();
      const navigate = useNavigate();

      const [oldinvoice, setOldinvoice] = useState({
      });

      /*useEffect(() => {
            const fetchInvoice = async () => {
            try {
                  const response = await axios.get(`/api/customer/maids/${id}/employ`);
                  setOldinvoice(response.data);
            } catch (error) {
                  console.log(error);
            }
            };
            fetchInvoice();
      }, []);*/

    return (
        <>
        </>
    );
}

export default UserMaidEmploy;