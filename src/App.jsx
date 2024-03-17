import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';

//Hello this is Pare branch
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path='/signup' element={ <Signup /> }/>
          <Route path='/login' element={ <Login /> }/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
