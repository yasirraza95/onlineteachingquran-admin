import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useFormik } from "formik";
import { signImSchema } from "../../../schema";
import { toast, ToastContainer } from "react-toastify";
import AdminListService from "../../../services/admin-list.service";
import "react-toastify/dist/ReactToastify.css";
import "../includes/general.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux/index";
import AdminFooter from "../includes/AdminFooter";
import logo from '../includes/Images/logo-icon.png'
import UserService from "../../../services/user.service";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);
  const [submit, setSubmit] = useState("");

  const formSubmit = async (values, action) => {
    setLoading(true);
    try {
      const response = await UserService.login(values);
      console.log(response);
      const { data } = response;
      const { access_token, user } = data;
      const { id, first_name, last_name, image } = user;
      // console.log(data);
      let fname = first_name.substring(0, 1).toUpperCase();
      let lname = last_name.substring(0, 1).toUpperCase();

      userActions.logIn({
        accessToken: access_token,
        id: id,
        name: fname + lname,
        image: image,
      });

      action.resetForm();
      window.location.href = "/dashboard";
      setLoading(false);
    } catch (err) {
      setLoading(false);

      if (err?.response?.status === 401) {
        toast.error("Username or Password is incorrect", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
      },
      validationSchema: signImSchema,
      onSubmit: (values, action) => {
        formSubmit(values, action);
      },
    });

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
                        <h4 className="prf-hed" style={{color: "#157815"}}>ADMIN LOGIN</h4>
                      </div>
                      <hr className="underLine" />
                      <div className="col-12">
                        <div
                          className={` input-group ${
                            errors.name && touched.name ? "is-danger" : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-person-fill" style={{color: "#fff"}}></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name"
                            value={values.name || ""}
                            required
                          />
                          {errors.name && touched.name ? (
                            <p className="help is-danger">{errors.name}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className={` input-group ${
                            errors.password && touched.password
                              ? "is-danger"
                              : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                          <i className="bi bi-lock-fill" style={{color: "#fff"}}></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            value={values.password || ""}
                            required
                          />
                          {errors.password && touched.password ? (
                            <p className="help is-danger">{errors.password}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lf">
                        <input type="submit" value="Login" />
                      </div>
                    </div>
                  </form>
                </div>
                <br/>
              </div>
            </div>

            
            {/* <div className="col-12">
              <p className="copyright">
                © Copyrights {new Date().getFullYear()} all rights reserved.
              </p>
            </div> */}
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
