import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminForgotPass.css";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import AdminListService from "../../../services/admin-list.service";
import "react-toastify/dist/ReactToastify.css";
import "../includes/general.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux/index";
import { forgotPassword } from "../../schema";
import UserService from "../../../services/user.service";
import Swal from "sweetalert2";
import AdminFooter from "../includes/AdminFooter";
import logo from '../includes/Images/logo-icon.png'
export default function ForgotPass() {
  const [loading, setLoading] = useState(false);

  const [alertdan, setalertdan] = useState(false);
  const [alertsuc, setalertsuc] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPassword,
      onSubmit: (values, action) => {
        // forgot(action);
      },
    });
  // const forgot = async (action) => {
  //   setLoading(true);
  //   try {
  //     const response = await UserService.AdminforgotPass(values);
  //     const { data } = response;
  //     const { response: res } = data;
  //     toast.success(res, {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });

  //     setLoading(false);
  //     setalertsuc(true);
  //     setalertdan(false);
  //     action.resetForm();
  //   } catch (err) {
  //     if (err.response.status === 404) {
  //       console.log(err);
  //       toast.success("You a re not are registered user!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });

  //       setLoading(false);
  //       setalertsuc(false);
  //       setalertdan(true);
  //     } else {
  //       setLoading(false);
  //       Swal.fire({
  //         title: "Error!",
  //         text: "Something went wrong",
  //         icon: "error",
  //         confirmButtonText: "Try Again",
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <div className="login-admin-1">
        <ToastContainer />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-7">
              <div className="text-center">
                <Link to="/">
                  <img src={logo} className="logo" alt="" />
                </Link>
                {/* <h1 style={{color: "#100d11"}}>Dashboard</h1> */}

              </div>
              <div className="content-login">
                <div className="black-box">
                  <form action="" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                    <div className="col-lg-12">
                        <h4 className="prf-hed" style={{color: "#D0F2FF"}}>FORGOT YOUR PASSWORD</h4>
                      </div>
                      {/* <h4 className="header white lighter bigger">
                        <i className="bi bi-key"></i> Retrieve Password
                      </h4> */}
                      <hr className="underLine" />
                      <p style={{ color: "#fff" }}>
                        Enter your email and to receive instructions
                      </p>
                      <div className="col-12">
                        <label>RECOVERY EMAIL</label>
                        <div
                          className={` input-group ${
                            errors.email && touched.email ? "is-danger" : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-envelope"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            value={values.email || ""}
                            required
                          />
                          {errors.email && touched.email ? (
                            <p className="help is-danger">{errors.email}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lf">
                        {/* <Link className="admin-forgot btn w-100 mt-3">
                      <i className="bi bi-lightbulb-fill"></i> SEND ME!
                        </Link> */}
                        <button className="admin-forgot" type="submit" name="">
                          <i className="bi bi-lightbulb-fill"></i>
                          <span> Send Me!</span>
                        </button>
                      </div>
                      <div className="col-lf">
                        <Link
                          to="/admin"
                          className="admin-forgot btn w-100 mt-3"
                        >
                          <i className="bi bi-arrow-left-short"></i> BACK TO
                          LOGIN
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
        <AdminFooter />

      </div>
    </>
  );
}
