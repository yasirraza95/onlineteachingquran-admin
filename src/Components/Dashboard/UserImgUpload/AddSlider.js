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

export default function AddSlider() {
  const state = useSelector((state) => state.stateVals);
  const { id } = state;
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const handleText = async (event) => {
    // console.log(event.target.files[0]);
    setName(event.target.value);
  };

  const handleUpload = async (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (name === "" && file === "") {
      setNameError(true);
      setFileError(true);
    } else if (name === "" && file !== "") {
      setNameError(true);
      setFileError(false);
    } else if (file === "" && name !== "") {
      setNameError(false);
      setFileError(true);
    } else {
      setNameError(false);
      setFileError(false);

      var formData = new FormData();
      formData.append("name", name);
      formData.append("image", file);

      try {
        setLoading(true);

        const response = await AdminListService.uploadVolunteer(formData);

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
            <h2>Upload Volunteer</h2>
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
                  type="file"
                  name="file"
                  className="form-control"
                  id="customFile"
                  onClick={(e) => {
                    e.target.value = null;
                    setFile("");
                  }}
                  onChange={handleUpload}
                />

                <label className="form-label" for="customFile">
                  Choose Image
                </label>
                {fileError ? (
                  <p className="help is-danger">Please select file</p>
                ) : null}
                {/* </div> */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <button
                  type="submit"
                  className="btn btn-outline-secondary w-50"
                  onClick={uploadImage}
                  style={{ height: "48px" }}
                >
                  Upload
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
