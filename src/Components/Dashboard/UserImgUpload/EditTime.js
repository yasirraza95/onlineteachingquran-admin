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
import { useNavigate, useParams } from "react-router-dom";

export default function EditTime() {
    const [loading, setLoading] = useState(false);

    const [time, setTime] = useState("");
    const [timeError, setTimeError] = useState(false);

    const dispatch = useDispatch();
    const userActions = bindActionCreators(actionCreaters, dispatch);
    const navigate = useNavigate();
    const { id } = useParams();
    const handleText = async (event) => {
        setTime(event.target.value);
    };

    const getResultData = async () => {
        setLoading(true);
        try {
          let resultData;
          const response = await AdminListService.getTimeById(id);
          resultData = response.data.response;
          console.log();
          setTime(resultData.time);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };
    
      useLayoutEffect(() => {
        getResultData();
      }, []);


    const updateTime = async () => {
        if (time === "") {
            setTimeError(true);
        } else {
            setTimeError(false);

            try {
                setLoading(true);

                const response = await AdminListService.updateTimeById(time, id);

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
                        <h2>Edit Time</h2>
                    </div>
                    <div className="main-content-box">
                        {/* <form className="profile-form" method='post'> */}
                        <div className="row">
                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    name="time"
                                    placeholder="Enter Time"
                                    className="form-control"
                                    onChange={handleText}
                                    value={time || ""}
                                />
                                {timeError ? (
                                    <p className="help is-danger">Please enter Time</p>
                                ) : null}
                            </div>

                            <div className="col-lg-6">
                                <button
                                    type="submit"
                                    className="btn btn-outline-secondary w-50"
                                    onClick={updateTime}
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
