import { useNavigate } from "react-router-dom";
import "./css/CannotAccess.css";

function CannotAccess({ message, status }) {
  const navigate = useNavigate();

  const handleClick = (btname) => () => {
    if (btname !== "login") {
      navigate(-1);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="protect-route">
      <header>
        <span>{status}</span>
        <img src="../../public/maid-2.png" alt="Cannot access" />
      </header>
      <main>
        <span>{message}</span>
      </main>
      <footer>
        <button onClick={handleClick("back")} className="cancle">
          ย้อนกลับ
        </button>
        <button onClick={handleClick("login")}>ลงชื่อเข้าใช้</button>
      </footer>
    </div>
  );
}

export default CannotAccess;
