import React, { useContext, useLayoutEffect, useState } from "react";
import ToTop from "../../Admin/includes/ToTop";
import HeaderSidebar from "../../Admin/includes/HeaderSidebar";
import AdminFooter from "../../Admin/includes/AdminFooter";
import { useFormik } from "formik";
import { UpAdminSchema } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";

export default function AddProgram() {
  const state = useSelector((state) => state.stateVals);
  const { id } = state;
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const handleText = async (event) => {
    setName(event.target.value);
  };

  const handleText2 = async (event) => {
    setDesc(event.target.value);
  };

  const uploadData = async () => {
    if (name === "" && desc === "") {
      setNameError(true);
      setDescError(true);
    } else if (name === "" && desc !== "") {
      setNameError(true);
      setDescError(false);
    } else if (desc === "" && name !== "") {
      setNameError(false);
      setDescError(true);
    } else {
      setNameError(false);
      setDescError(false);

      try {
        setLoading(true);

        const response = await AdminListService.addProgram(name, desc);

        setLoading(false);

        toast.success(response.data.response, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="semi-dark">
      <div className="wrapper">
        <ToastContainer />

        <HeaderSidebar />

        <main className="page-content">
          <div className="manage-heading-2">
            <h2>Add Program</h2>
          </div>
          <div className="main-content-box">
            {/* <form className="profile-form" method='post'> */}
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  className="form-control"
                  onChange={handleText}
                />
                {nameError ? (
                  <p className="help is-danger">Please enter name</p>
                ) : null}
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  className="form-control"
                  onChange={handleText2}
                />
                {descError ? (
                  <p className="help is-danger">Please enter description</p>
                ) : null}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-6">
                <button
                  type="submit"
                  className="btn btn-outline-secondary w-50"
                  onClick={uploadData}
                  style={{ height: "48px" }}
                >
                  Submit
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </main>

        <ToTop />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
