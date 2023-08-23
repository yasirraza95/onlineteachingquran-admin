import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";
import VideoModel from "./VideoModel";

export default function Header() {
  let locatEURL = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const state = useSelector((state) => state.stateVals);
  const { name } = state;

  var welcomeFname;
  if (name) {
    welcomeFname = name.split(" ");
  } else {
    welcomeFname = "Unknown";
  }

  const logOut = async (event) => {
    event.preventDefault();

    setLoading(true);
    userActions.logOut(null);
    setLoading(false);
    navigate("/");
  };
  return (
    <>
      <ToastContainer />
      <header>
        <div className="row">
          <div className="col-lg-3 d-flex align-items-center justify-content-center">
            <Link to="/welcome">
              <img src="/images/logo-white.png" className="logo" alt="" />
            </Link>
          </div>
          <div className="col-lg-9 ps-lg-0">
            <div className="top-contacts">
              <div className="row">
                <div className="col-lg-6">
                  <div className="fax-con">
                    <div>
                      Fax-Number:
                      <a href="fax:866-632-6450"> 866-632-6450</a> Phone number:
                      <a href="tel:800-772-0396"> 800-772-0396</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="apps-dtl">
                    <Link to="/" onClick={(e) => logOut(e)}>
                      Logout{" "}
                    </Link>
                    <span className="lines-sperater">/</span>
                    <Link
                      to="/"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#newvideo"
                    >
                      About our application{" "}
                    </Link>
                    <a
                      href="https://apps.apple.com/us/app/ashley-sleep-elite/id1477612846"
                      className="apple-logo"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/images/apple-logo.png" alt="" />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.pixider.ashley&hl=en"
                      className="andriod-logo"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/images/android-logo.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-items">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                  className="navbar-toggler hmbrgr"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          locatEURL.pathname === "/welcome" ? "active" : ""
                        }`}
                        aria-current="page"
                        to="/welcome"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Claims
                      </a>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/submitClaim">
                          File a Claims
                        </Link>
                        <Link className="dropdown-item" to="/prevClaims">
                          View Previous Claims
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        type="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Account
                      </a>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profileInfo">
                          My Info
                        </Link>
                      </div>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        type="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Help
                      </a>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/privacy-policy">
                          Privacy Policy
                        </Link>
                        <Link className="dropdown-item" to="/contact">
                          Contact US
                        </Link>
                        <Link className="dropdown-item" to="/w9Download">
                          Download W9
                        </Link>
                      </div>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/faq">
                        FAQ’S
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="red-welcome">
                <div className="trianles">
                  <img
                    src="/images/lef-red.png"
                    className="lef-red"
                    alt="lef-red.png"
                  />
                  <img
                    src="/images/rig-red.png"
                    className="rig-red"
                    alt="rig-red.png"
                  />
                  <div className="welcome-txt">
                    Welcome - {welcomeFname[0] ? welcomeFname[0] : "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <VideoModel />
      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
    </>
  );
}
