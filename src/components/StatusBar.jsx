import { NavLink, Outlet } from 'react-router-dom';
import "./css/StatusBar.css"

function StatusBar({firstpage, secondpage, thirdpage}) {
      return (
            <>
                  <header>
                        <nav>
                              <NavLink to='wait'> {firstpage} </NavLink>
                              <NavLink to='work'> {secondpage} </NavLink>
                              <NavLink to='end'> {thirdpage} </NavLink>
                        </nav>
                  </header>
                  <main>
                        <Outlet />
                  </main>
            </>
      )
}

export default StatusBar;