import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthRoute from "./Auth/AuthRoute";
import ProtectedRoute from "./Auth/ProtectedRoute";
import CannotAccess from "./components/CannotAccess";
import Register from "./pages/register";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import StatusBar from "./components/StatusBar";
import MaidStatusWait from "./pages/maid/wait";
import MaidStatusWork from "./pages/maid/work";
import MaidStatusEnd from "./pages/maid/end";
import MaidMain from "./pages/maid/main";
import MaidProfile from "./pages/maid/profile";
import UserStatusWait from "./pages/customer/wait";
import UserStatusWork from "./pages/customer/work";
import UserStatusRating from "./pages/customer/rating";
import MaidProfileEdit from "./pages/maid/profileEdit";
import UserProfile from "./pages/customer/profile";
import UserProfileEdit from "./pages/customer/profileEdit";
import MaidOtherProfile from "./pages/maid/otherProfile";
import UserOtherProfile from "./pages/customer/otherProfile";
import UserMaidEmploy from "./pages/customer/maidEmploy";
import CustomerMain from "./pages/customer/main";

//Component 3 หน้าของ Maid Status รูปแบบเหมือนกันเลย อาจจะมาแก้ให้เป็นใช้ component ร่วมกันไปเลย

function App() {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <CannotAccess message={"ไม่พบหน้านี้"} status={404} />,
    },
    {
      path: "/",
      element: (
        <AuthRoute>
          <div>Loading...</div>
        </AuthRoute>
      ),
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "logout",
    },
    //Maid Routes
    {
      element: <ProtectedRoute role={"maid"} />,
      children: [
        {
          path: "maid",
          element: <Navbar />,
          children: [
            {
              path: "main",
              element: <MaidMain />,
            },
            {
              path: "status",
              element: (
                <StatusBar
                  firstpage={"รอยืนยัน"}
                  secondpage={"กำลังทำ"}
                  thirdpage={"จบงาน"}
                />
              ),
              children: [
                {
                  path: "wait",
                  element: <MaidStatusWait />,
                },
                {
                  path: "work",
                  element: <MaidStatusWork />,
                },
                {
                  path: "end",
                  element: <MaidStatusEnd />,
                },
              ],
            },
            {
              path: "profile",
              element: <MaidProfile />,
            },
            {
              path: "profile/edit",
              element: <MaidProfileEdit />,
            },
            {
              path: "customers/profile/:id",
              element: <MaidOtherProfile />,
            },
          ],
        },
      ],
    },
    //Customer route
    {
      element: <ProtectedRoute role={"customer"} />,
      children: [
        {
          path: "customer",
          element: <Navbar />,
          children: [
            {
              path: "main",
              element: <CustomerMain />,
            },
            {
              path: "status",
              element: (
                <StatusBar
                  firstpage={"รอยืนยัน"}
                  secondpage={"กำลังทำ"}
                  thirdpage={"ให้คะแนน"}
                />
              ),
              children: [
                {
                  path: "wait",
                  element: <UserStatusWait />,
                },
                {
                  path: "work",
                  element: <UserStatusWork />,
                },
                {
                  path: "end",
                  element: <UserStatusRating />,
                },
              ],
            },
            {
              path: "profile",
              element: <UserProfile />,
            },
            {
              path: "profile/edit",
              element: <UserProfileEdit />,
            },
            {
              path: "maids/profile/:id",
              element: <UserOtherProfile />,
            },
            {
              path: "maids/profile/:id/employ",
              element: <UserMaidEmploy />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
//Test again

export default App;
