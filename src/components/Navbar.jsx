import { NavLink, Outlet } from "react-router-dom";
import { BsFillHouseDoorFill, BsPersonFillGear } from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
import "./css/Navbar.css";
function StatusBar() {
  const iconStyle = {
    color: "#035445",
    fontSize: "42px",
  };

  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer className="layout-navbar">
        <nav>
          <NavLink to="main">
            <BsFillHouseDoorFill style={iconStyle} />
          </NavLink>
          <NavLink to="status">
            <GiBroom style={iconStyle} />
          </NavLink>
          <NavLink to="profile">
            <BsPersonFillGear style={iconStyle} />
          </NavLink>
        </nav>
      </footer>
    </>
  );
}

export default StatusBar;
