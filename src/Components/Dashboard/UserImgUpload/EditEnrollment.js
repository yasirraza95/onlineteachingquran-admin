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

export default function EditEnrollment() {
  const state = useSelector((state) => state.stateVals);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [priceStarter, setPriceStarter] = useState("");
  const [price, setPrice] = useState("");
  const [priceDuration, setPriceDuration] = useState("");
  const [nameError, setNameError] = useState(false);
  const [priceStarterError, setPriceStarterError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [priceDurationError, setPriceDurationError] = useState(false);

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const getResultData = async () => {
    setLoading(true);

    try {
      let resultData;
      const response = await AdminListService.getEnrollmentById(id);
      resultData = response.data.response;
      setName(resultData.name);
      setPrice(resultData.price);
      setPriceStarter(resultData.starter);
      setPriceDuration(resultData.duration);
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
    setPriceStarter(event.target.value);
  };

  const handleText3 = async (event) => {
    setPrice(event.target.value);
  };

  const handleText4 = async (event) => {
    setPriceDuration(event.target.value);
  };

  const uploadData = async () => {

    if (priceStarter === "" && price === "" && priceDuration === "") {
      setPriceStarterError(true);
      setPriceError(true);
      setPriceDurationError(true);
    } else if (priceStarter === "" && price === "") {
      setPriceStarterError(true);
      setPriceError(true);
      setPriceDurationError(false);
    } else if (priceStarter === "" && priceDuration === "") {
      setPriceStarterError(true);
      setPriceError(false);
      setPriceDurationError(true);
    } else if (price === "" && priceDuration === "") {
      setPriceStarterError(false);
      setPriceError(true);
      setPriceDurationError(true);
    } else if (priceStarter === "") {
      setPriceStarterError(true);
      setPriceError(false);
      setPriceDurationError(false);
    } else if (price === "") {
      setPriceStarterError(false);
      setPriceError(true);
      setPriceDurationError(false);
    } else if (priceDuration === "") {
      setPriceStarterError(false);
      setPriceError(false);
      setPriceDurationError(true);
    } else {
      setPriceStarterError(false);
      setPriceError(false);
      setPriceDurationError(false);
    
      try {
        setLoading(true);

        const response = await AdminListService.updateEnrollmentById(priceStarter, price, priceDuration, id);

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
            <h2>Edit Enrollment</h2>
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
                  disabled
                />
                {nameError ? (
                  <p className="help is-danger">Please enter name</p>
                ) : null}
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={handleText2}
                  value={priceStarter || ""}
                />
                {priceStarterError ? (
                  <p className="help is-danger">Please enter price starter</p>
                ) : null}
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={handleText3}
                  value={price || ""}
                />
                {priceError ? (
                  <p className="help is-danger">Please enter price</p>
                ) : null}
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={handleText4}
                  value={priceDuration || ""}
                />
                {priceDurationError ? (
                  <p className="help is-danger">Please enter price duration</p>
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
