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
import { useParams } from "react-router-dom";

export default function EditTeacher() {
  const state = useSelector((state) => state.stateVals);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [desg, setDesg] = useState("");
  const [fb, setFb] = useState("");
  const [x, setX] = useState("");
  const [yt, setYt] = useState("");
  const [image, setImage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [desgError, setDesgError] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const getResultData = async () => {
    setLoading(true);

    try {
      let resultData;
      const response = await AdminListService.getTeacherById(id);
      resultData = response.data.response;
      setName(resultData.name);
      setDesg(resultData.designation);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    getResultData();
  }, []);

  const handleText = async (event) => {
    setName(event.target.value);
  };

  const handleText2 = async (event) => {
    setDesg(event.target.value);
  };

  const handleText3 = async (event) => {
    setFb(event.target.value);
  };

  const handleText4 = async (event) => {
    setX(event.target.value);
  };

  const handleText5 = async (event) => {
    setYt(event.target.value);
  };

  const handleText6 = async (event) => {
    setImage(event.target.value);
  };

  const uploadData = async () => {
    if (name === "" && desg === "") {
      setNameError(true);
      setDesgError(true);
    } else if (name === "" && desg !== "") {
      setNameError(true);
      setDesgError(false);
    } else if (desg === "" && name !== "") {
      setNameError(false);
      setDesgError(true);
    } else {
      setNameError(false);
      setDesgError(false);

      try {
        setLoading(true);

        const response = await AdminListService.updateTeacher(name, desg, id);

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
            <h2>Edit Teacher</h2>
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
                  value={name || ""}
                />
                {nameError ? (
                  <p className="help is-danger">Please enter name</p>
                ) : null}
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  name="designation"
                  placeholder="Enter Desgination"
                  className="form-control"
                  onChange={handleText2}
                  value={desg || ""}
                />
                {desgError ? (
                  <p className="help is-danger">Please enter designation</p>
                ) : null}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  name="fb"
                  placeholder="Enter FB Link"
                  className="form-control"
                  onChange={handleText3}
                  value={fb || ""}
                />
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  name="x"
                  placeholder="Enter X Link"
                  className="form-control"
                  onChange={handleText4}
                  value={x || ""}
                />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Youtube Link"
                  className="form-control"
                  onChange={handleText5}
                  value={yt || ""}
                />
              </div>
              <div className="col-lg-6">
                <input
                  type="file"
                  name="image"
                  placeholder="Choose Image"
                  className="form-control"
                  onChange={handleText6}
                  value={image || ""}
                />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-lg-6">
                <button
                  type="submit"
                  className="btn btn-outline-secondary w-50"
                  onClick={uploadData}
                  style={{ height: "48px" }}
                >
                  Update
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
