import { NavLink, Outlet } from 'react-router-dom';
import { BsFillHouseDoorFill, BsPersonFillGear } from "react-icons/bs";
import { GiBroom } from "react-icons/gi";

function StatusBar() {
      return (
            <>
                  <header>
                  </header>
                  <main>
                        <Outlet />
                  </main>
                  <footer>
                        <nav>
                              <NavLink to='main'> <BsFillHouseDoorFill /> </NavLink>
                              <NavLink to='status'> <GiBroom /> </NavLink>
                              <NavLink to='profile'> <BsPersonFillGear /> </NavLink>
                        </nav>
                  </footer>
            </>
      )
}

export default StatusBar;