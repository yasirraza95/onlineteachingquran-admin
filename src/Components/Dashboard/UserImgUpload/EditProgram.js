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

export default function EditProgram() {
  const state = useSelector((state) => state.stateVals);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [desg, setDesg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [desgError, setDesgError] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const getResultData = async () => {
    setLoading(true);

    try {
      let resultData;
      const response = await AdminListService.getProgramById(id);
      resultData = response.data.response;
      setName(resultData.name);
      setDesg(resultData.description);
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

        const response = await AdminListService.updateProgram(name, desg, id);

        setLoading(false);

        toast.success("Program Updated", {
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
        
        setLoading(false);
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

  return (
    <div className="semi-dark">
      <div className="wrapper">
        <ToastContainer />
        <HeaderSidebar />
        <main className="page-content">
          <div className="manage-heading-2">
            <h2>Edit Program</h2>
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
