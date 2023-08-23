import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../../schema/index";
import InputField from "../../InputField";
import UserService from "../../../services/user.service";
import Swal from "sweetalert2";
import axios from "axios";
import { UserContext } from "../../../Components/context/UserContext";
import secureLocalStorage from "react-secure-storage";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";
import HeadForgot from "../../User/ForgotPassword/HeadForgot";
import FootForgot from "../../User/ForgotPassword/FootForgot";
import ToTop from "../includes/ToTop";
import { ToastContainer } from "react-toastify";

// TODO
function AdminChangePass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.stateVals);
  const { forgotToken } = state;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirm_password: "",
      },
      validationSchema: changePassword,
      onSubmit: (values, action) => {
        passChange(action);
      },
    });

  const getIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");

    const weIp = res.data.IPv4;
    secureLocalStorage.setItem("ip", weIp);
  };

  const passChange = async (action) => {
    setLoading(true);
    try {
      const response = await UserService.changePass(values, forgotToken);

      if (response.status === 200) {
        setLoading(false);

        userActions.removeForgot();
        action.resetForm();
        Swal.fire({
          title: "Success!",
          text: "Password Change Successful",
          icon: "success",
          confirmButtonText: "Login Now",
        });

        navigate("/admin");
      }
    } catch (err) {
      if (err.response.status === 404) {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: err.response,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Some thing went wronge",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  useEffect(() => {
    getIp();
  }, [handleSubmit]);
  return (
    <>
      <div className="login-admin-1">
      <ToastContainer />

          <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-6 col-lg-7">
            <div className="text-center">
                <Link to="/">
                  <img src="/images/logo.png" className="logo" alt="" />
                </Link>
              </div>
              <div className="content-login">
              {/* <h2 style={{ textAlign: "center" }}>Change Password</h2> */}
                <div className="black-box">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="prf-hed" style={{color: "#b51019"}}>UPDATE YOUR PASSWORD</h4>
                      </div>
                      {/* <div className="col-lg-6">
                        <InputField
                          errors={errors.password}
                          touched={touched.password}
                          values={values.password}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          placeholder="PASSWORD"
                          spanText="PASSWORD"
                          fieldName="password"
                          fieldType="password"
                          required={true}
                        />
                      </div> */}
                      <div className="col-12">
                        {/* <label>RECOVERY EMAIL</label> */}
                        <div
                          className={` input-group ${
                            errors.password && touched.password ? "is-danger" : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
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

                      {/* <div className="col-lg-6">
                        <InputField
                          errors={errors.confirm_password}
                          touched={touched.confirm_password}
                          values={values.confirm_password}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          placeholder="RE-TYPE PASSWORD"
                          spanText="RE-TYPE PASSWORD"
                          fieldName="confirm_password"
                          fieldType="password"
                          required={true}
                        />
                      </div> */}
                      <div className="col-12">
                        {/* <label>RECOVERY EMAIL</label> */}
                        <div
                          className={` input-group ${
                            errors.confirm_password && touched.confirm_password ? "is-danger" : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                          <i className="bi bi-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="confirm_password"
                            value={values.confirm_password || ""}
                            required
                          />
                          {errors.confirm_password && touched.confirm_password ? (
                            <p className="help is-danger">{errors.confirm_password}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <button
                          type="submit"
                          className="change-pass"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                </div>
              </div>
              <div className="col-12">
              <p className="copyright">
                © Copyrights {new Date().getFullYear()} all rights reserved.
              </p>
            </div>
            </div>
          </div>

        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
    </>
  );
}

export default AdminChangePass;
