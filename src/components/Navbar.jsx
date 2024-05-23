import { NavLink, Outlet} from "react-router-dom";
import { useState } from "react";
import { BsFillHouseDoorFill, BsPersonFillGear, BsListUl } from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
import "./css/NewNavbar.css";
function StatusBar() {
  /*const iconStyle = {
    color: "#035445",
    fontSize: "42px",
};*/
      //const navigate = useNavigate()
      const [showNavbar, setShowNavbar] = useState(false)
      const handleShowNavbar = () => {
            setShowNavbar(!showNavbar)
      }

      return (
            <>
                  <header>
                        <nav className="navbar">
                              <div className="container">
                                    <div className="logo">
                                          logo
                                    </div>
                                    <div className="menu-icon" onClick={handleShowNavbar}>
                                          <BsListUl />
                                    </div>
                                    <div className={`nav-elements  ${showNavbar && 'active'}`}>
                                          <ul>
                                                <li>
                                                      <NavLink to="main">
                                                            <BsFillHouseDoorFill />
                                                            หน้าหลัก
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="status/wait">
                                                            <GiBroom />
                                                            งานของคุณ
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="profile">
                                                            <BsPersonFillGear />
                                                            โปรไฟล์ของคุณ
                                                      </NavLink>
                                                </li>
                                                <li>
                                                      <NavLink to="/logout">
                                                            ออกจากระบบ
                                                      </NavLink>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                        </nav>
                  </header>
                  <main>
                        <Outlet />
                  </main>
            </>
      );
}

export default StatusBar;
