import React, { useContext, useLayoutEffect, useState } from 'react'
import ToTop from '../../Admin/includes/ToTop'
import HeaderSidebar from '../../Admin/includes/HeaderSidebar'
import AdminFooter from '../../Admin/includes/AdminFooter'
import { useFormik } from 'formik';
import { UpAdminSchema } from "../../../schema";
import AdminListService from '../../../services/admin-list.service';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';


export default function Profile() {
  const state = useSelector((state) => state.stateVals);
  const { id } = state;
  const [loading, setLoading] = useState(false);  
  
  const profileUpdateData = async (values) => {
    try {
      // if (values.new_password !== "") {
        setLoading(true);
        const response = await AdminListService.UpdateAdminInfo(
          id,
          values,
        );
        setLoading(false);

        toast.error(response.data.response, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      // }
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if (err.response.status === 422) {
        setLoading(false);
        toast.error("Error, Unprocessable Content!", {
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
        setLoading(false);

        toast.error(err.response.data, {
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
    enableReinitialize: true,
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: UpAdminSchema,
    onSubmit: (values, action) => {
      profileUpdateData(values);
    },
  });
  return (
    <div className="semi-dark">
    <div className="wrapper">
    <ToastContainer />

      <HeaderSidebar />

      <main className="page-content">
   <div className="manage-heading-2">
            <h2>
              PRofile Update
            </h2>
          </div>

          <div className="main-content-box">
             <form className="profile-form" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                        <div className="col-lg-6">
                      <div
                        className={`form-floating ${
                          errors.current_password && touched.current_password ? "is-danger" : ""
                        }`}
                      >
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Current Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="current_password"
                          value={values.current_password || ""}
                        />
                        <label>Current Password</label>
                        {errors.current_password && touched.current_password ? (
                          <p className="help is-danger">{errors.current_password}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className={`form-floating ${
                          errors.new_password && touched.new_password
                            ? "is-danger"
                            : ""
                        }`}
                      >
                        <input
                          type="password"
                          className="form-control"
                          placeholder="New Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="new_password"
                          value={values.new_password || ""}
                        />
                        <label>New Password</label>
                        {errors.new_password && touched.new_password ? (
                          <p className="help is-danger">
                            {errors.new_password}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className={`form-floating ${
                          errors.confirm_password && touched.confirm_password
                            ? "is-danger"
                            : ""
                        }`}
                      >
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm New Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="confirm_password"
                          value={values.confirm_password || ""}
                        />
                        <label>Confirm New Password </label>
                        {errors.confirm_password && touched.confirm_password ? (
                          <p className="help is-danger">
                            {errors.confirm_password}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="col-lg-6">
                        <button type="submit" className="btn btn-outline-secondary w-50" style={{height: "48px"}}>Update</button>
                    </div>
                    </div>
             </form>
</div>
      </main>
      

      <ToTop />
      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
    </div>
    <AdminFooter />
  </div>
  )
}
