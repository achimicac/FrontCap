import { NavLink, Outlet } from "react-router-dom";
import "./css/StatusBar.css";
function StatusBar({ firstpage, secondpage, thirdpage }) {
  return (
    <>
      <header className="statusbar-container">
        <nav className="statusbar-nav">
          <NavLink to="wait"> {firstpage} </NavLink>
          <NavLink to="work"> {secondpage} </NavLink>
          <NavLink to="end"> {thirdpage} </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default StatusBar;