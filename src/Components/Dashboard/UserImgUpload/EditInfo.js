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

export default function EditInfo() {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const dispatch = useDispatch();
    const userActions = bindActionCreators(actionCreaters, dispatch);
    const navigate = useNavigate();
    const { id } = useParams();
    const handleText = async (event) => {
        setEmail(event.target.value);
    };

    const handleText2 = async (event) => {
        setPhone(event.target.value);
    };

    const getResultData = async () => {
        setLoading(true);
        try {
            let resultData;
            const response = await AdminListService.getSiteInfo();
            resultData = response.data.response;
            setEmail(resultData[0].email);
            setPhone(resultData[0].phone);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        getResultData();
    }, []);


    const updateInfo = async () => {
        if (email === "" && phone === "") {
            setEmailError(true);
            setPhoneError(true);
        } else if (email === "" && phone !== "") {
            setEmailError(true);
            setPhoneError(false);
        } else if (email !== "" && phone === "") {
            setEmailError(false);
            setPhoneError(true);
        } else {
            setPhoneError(false);
            setEmailError(false);

            try {
                setLoading(true);

                const response = await AdminListService.updateSiteInfo(email, phone);

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
                        <h2>Edit Site Info</h2>
                    </div>
                    <div className="main-content-box">
                        {/* <form className="profile-form" method='post'> */}
                        <div className="row">
                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="form-control"
                                    onChange={handleText}
                                    value={email || ""}
                                />
                                {emailError ? (
                                    <p className="help is-danger">Please enter Email</p>
                                ) : null}
                            </div>

                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone"
                                    className="form-control"
                                    onChange={handleText2}
                                    value={phone || ""}
                                />
                                {phoneError ? (
                                    <p className="help is-danger">Please enter Phone</p>
                                ) : null}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-6">
                                <button
                                    type="submit"
                                    className="btn btn-outline-secondary w-50"
                                    onClick={updateInfo}
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
