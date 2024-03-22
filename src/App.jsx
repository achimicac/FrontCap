import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Navbar from './components/Navbar';
import StatusBar from './components/StatusBar';
import MaidStatusWait from './pages/maid/wait';
import MaidStatusWork from './pages/maid/work';
import MaidStatusEnd from './pages/maid/end';
import MaidMain from './pages/maid/main';
import MaidProfile from './pages/maid/profile';
import UserStatusWait from './pages/customer/wait';
import UserStatusWork from './pages/customer/work';
//Component 3 หน้าของ Maid Status รูปแบบเหมือนกันเลย อาจจะมาแก้ให้เป็นใช้ component ร่วมกันไปเลย

function App() {

    const router = createBrowserRouter([{
            path: 'signup',
            element: <Signup />
        },{
            path: 'login',
            element: <Login />
        },
        //Maid Routes
        {
            path: 'maid',
            element: <Navbar />,
            children: [{
                    path: 'main',
                    element: <MaidMain />
                },{
                    path: 'status',
                    element: <StatusBar firstpage={'รอยืนยัน'} secondpage={'กำลังทำ'} thirdpage={'จบงาน'} />,
                    children: [{
                            path: 'wait',
                            element: <MaidStatusWait />
                        },{
                            path: 'work',
                            element: <UserStatusWork />
                        },{
                            path: 'end',
                            element: <MaidStatusEnd />
                        }]
                },{
                    path: 'profile',
                    element: <MaidProfile />
                }
            ]
        },
        //Customer route
        {
            path: 'user',
            element: <Navbar />,
            children: [{
                    path: 'main',
                    element: <MaidMain />
                },{
                    path: 'status',
                    element: <StatusBar firstpage={'รอยืนยัน'} secondpage={'กำลังทำ'} thirdpage={'ให้คะแนน'} />,
                    children: [{
                            path: 'wait',
                            element: <UserStatusWait />
                        },{
                            path: 'work',
                            element: <UserStatusWork />
                        },{
                            path: 'rating',
                            element: <MaidStatusEnd />
                        }]
                },{
                    path: 'profile',
                    element: <MaidProfile />
                }
            ]
        }])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;