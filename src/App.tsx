import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import "./App.css";
import "./scss/style.scss";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import DetailTemplate from "templates/DetailTemplate/DetailTemplate";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import ProtectedRoute from "route/ProtectedRoute";
import { scrollTop } from "utils/eventFunction";
import Profile from "pages/Profile/Profile";
import RoomListByLocationTemplate from "templates/DetailTemplate/RoomListByLocationTemplate";
import AdminTemplate from "templates/AdminTemplate/AdminTemplate";
import LocationManagement from "pages/Admin/LocationsManagement/LocationManagement";
import RoomManagement from "pages/Admin/RoomsManagement/RoomManagement";

function App() {
  // IF USER TRY TO MANUAL CLEAR LOCALSTORAGE => TRIGGER CLEAR ALL LOCALSTORAGE AND REFRESH PAGE -> REQUIRE RE-LOGIN
  useEffect(() => {
    window.addEventListener("beforeunload", scrollTop);

    return () => {
      window.removeEventListener("beforeunload", scrollTop);
    };
  }, []);

  // Protected route for Login / Signup: redirect to home if user is logged in
  // Protected route for admin Page: redirect to home if user is not logged in

  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="/rooms/:roomId" element={<DetailTemplate />} />

      <Route path="/location" element={<RoomListByLocationTemplate />} />

      <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />

      <Route path="/admin" element={<ProtectedRoute component={<AdminTemplate />} />}>
        <Route path="locations-management" element={<LocationManagement />} />
        <Route path="rooms-management" element={<RoomManagement />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
