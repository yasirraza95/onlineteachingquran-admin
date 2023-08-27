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
import { useNavigate } from "react-router-dom";

export default function AddSlider() {
  const state = useSelector((state) => state.stateVals);
  const { id } = state;
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line1Error, setLine1Error] = useState(false);
  const [line2Error, setLine2Error] = useState(false);
  const [fileError, setFileError] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);
  const navigate = useNavigate();

  const handleText1 = async (event) => {
    setLine1(event.target.value);
  };

  const handleText2 = async (event) => {
    setLine2(event.target.value);
  };

  const handleUpload = async (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (line1 === "" && line2 === "" && file === "") {
      setLine1Error(true);
      setLine2Error(true);
      setFileError(true);
    } else if (line1 === "" && line2 !== "" && file !== "") {
      setLine1Error(true);
      setLine2Error(false);
      setFileError(false);
    } else if (line1 !== "" && line2 === "" && file !== "") {
      setLine1Error(false);
      setLine2Error(true);
      setFileError(false);
    } else if (line1 !== "" && line2 !== "" && file === "") {
      setLine1Error(false);
      setLine2Error(false);
      setFileError(true);
    } else {
      setLine1Error(false);
      setLine2Error(false);
      setFileError(false);

      var formData = new FormData();
      formData.append("line1", line1);
      formData.append("line2", line2);
      formData.append("image", file);

      try {
        setLoading(true);

        const response = await AdminListService.uploadSlider(formData);

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
        navigate("/sliders");
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
            <h2>Add Slider</h2>
          </div>
          <div className="main-content-box">
            {/* <form className="profile-form" method='post'> */}
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  name="line1"
                  placeholder="Enter 1st Line"
                  className="form-control"
                  onChange={handleText1}
                />
                {line1Error ? (
                  <p className="help is-danger">Please enter 1st line</p>
                ) : null}
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  name="line2"
                  placeholder="Enter 2nd Line"
                  className="form-control"
                  onChange={handleText2}
                />
                {line2Error ? (
                  <p className="help is-danger">Please enter 2nd line</p>
                ) : null}
              </div>
              </div>
              <br/>
              <div className="row">
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
