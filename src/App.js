import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.css";
// import Login from "./Components/User/Login/Login";
import AdminLogin from "./Components/Admin/Login/AdminLogin";
import Dashboard from "./Components/Dashboard/Dashboard";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { bindActionCreators } from "redux";
import { actionCreaters } from "./Redux";
import AdminForgotPass from "./Components/Admin/AdminForgotPass/AdminForgotPass";
import CheckAdminForgetToken from "./Components/Admin/AdminForgotPass/CheckAdminForgetToken";
import AdminChangePass from "./Components/Admin/AdminForgotPass/AdminChangePass";
import ContactUs from "./Components/Dashboard/ContactUs";
import Profile from "./Components/Dashboard/Profile/Profile";
import Password from "./Components/Dashboard/Profile/Password";
import { useEffect } from "react";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import AddService from "./Components/Dashboard/UserImgUpload/AddService";
import AddSlider from "./Components/Dashboard/UserImgUpload/AddSlider";
import Namaz from "./Components/Dashboard/UserImgUpload/Namaz";
import NamazId from "./Components/Dashboard/UserImgUpload/NamazId";
import Services from "./Components/Dashboard/UserImgUpload/Services";
import SiteInfo from "./Components/Dashboard/UserImgUpload/SiteInfo";
import Sliders from "./Components/Dashboard/UserImgUpload/Sliders";

function App() {
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);
  const navigate = useNavigate();
  const locat = useLocation();
  const state = useSelector((state) => state.stateVals);
  // const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { id, accessToken, uType } = state;

  let decoded;

  // useEffect(() => {
  //   if (accessToken) {
  //     decoded = jwt_decode(accessToken);
  //     console.log(decoded);
  //   }
  //   if (
  //     accessToken &&
  //     uType !== "admin"
  //   ) {
  //     if (Math.floor(new Date().getTime() / 1000) > decoded.exp) {
  //       userActions.logOut(null);
  //       Swal.fire({
  //         title: "Expired!",
  //         text: "Your Login Session expired!",
  //         icon: "error",
  //         confirmButtonText: "Login Again",
  //       });
  //       navigate("/");
  //     }
     
  //   }

  //   const callFun = window["onUrlChange"];
  //   if (
  //     accessToken &&
  //     uType !== "rsa" &&
  //     uType !== "manager" &&
  //     uType !== "corporate"
  //   ) {
  //     if (Math.floor(new Date().getTime() / 1000) > decoded.exp) {
  //       userActions.logOut(null);
  //       Swal.fire({
  //         title: "Expired!",
  //         text: "Your Login Session expired!",
  //         icon: "error",
  //         confirmButtonText: "Login Again",
  //       });
  //       navigate("/");
  //     }
  //     if (
  //       locat.pathname === "/" ||
  //       locat.pathname === "/" ||
  //       locat.pathname === "/forgot_pass" ||
  //       locat.pathname === "/forgot_pass/"
  //     ) {
  //       callFun();
  //       navigate("/dashboard");
  //     }
  //   } else {
  //     if (
  //       locat.pathname !== "/forgot_pass" &&
  //       locat.pathname !== "/forgot_token" &&
  //       locat.pathname !== "/change_pass" &&
  //       locat.pathname !== "/forgot_pass/" &&
  //       locat.pathname !== "/change_pass/" &&
  //       locat.pathname.indexOf("/") > -1
  //     ) {
  //       navigate("/");
  //     }
  //   }
  // }, [locat.pathname]);

  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/password" element={<Password />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sliders" element={<Sliders />} />
      <Route path="/add-slider" element={<AddSlider />} />
      <Route path="/namaz-time" element={<Namaz />} />
      <Route path="/namaz-time/:id" element={<NamazId />} />
      <Route path="/site-info" element={<SiteInfo />} />
      <Route path="/services" element={<Services />} />
      <Route path="/add-service" element={<AddService />} />
      <Route path="/forgot_pass" element={<AdminForgotPass />} />
      <Route path="/admin/forgot_token" element={<CheckAdminForgetToken />} />
      <Route path="/admin/change_pass" element={<AdminChangePass />} />
    </Routes>
  );
}

export default App;
