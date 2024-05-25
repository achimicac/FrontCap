import { NavLink, Outlet } from "react-router-dom";
import "./css/StatusBar.css";
function StatusBar({ firstpage, secondpage, thirdpage }) {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer className="statusbar-container">
        <nav className="statusbar-nav">
          <NavLink to="wait"> {firstpage} </NavLink>
          <NavLink to="work"> {secondpage} </NavLink>
          <NavLink to="end"> {thirdpage} </NavLink>
        </nav>
      </footer>
    </>
  );
}

export default StatusBar;