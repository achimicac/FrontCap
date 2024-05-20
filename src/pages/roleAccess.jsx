import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "../axios";

function roleAccess() {
      const navigate = useNavigate()

      useEffect(() => {
            const checkRole = async () => {
                  const res = await axios.get('/')
                  navigate(res.data.path)
            }
            checkRole()
      },[])
}

export default roleAccess;