import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux/index";
import { useSelector } from "react-redux";
import AdminListService from "../../../services/admin-list.service";
import secureLocalStorage from "react-secure-storage";
import { clear } from "@testing-library/user-event/dist/clear";

export default function HeaderSidebar() {
  const Image_Link = process.env.REACT_APP_Image_Link;
  const [loading, setLoading] = useState(false);
  const [allYears, setAllYears] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const state = useSelector((state) => state.stateVals);
  const { name, uType, image } = state;

  var welcomeFname;

  const getAllYears = async () => {
    try {
      const response = await AdminListService.getAllYears();
      console.log(response.data.response);
      setAllYears(response.data.response);
    } catch (err) {
      setAllYears([]);
    }
  };
  const logOut = async (event) => {
    event.preventDefault();
    secureLocalStorage.clear();
    userActions.logOut(null);
    navigate("/");
  };

  useLayoutEffect(() => {
    getAllYears();
  }, []);

  return (
    <>
      <header className="top-header">
        <nav className="navbar navbar-expand gap-3">
          <div className="mobile-toggle-icon fs-3">
            <i className="bi bi-list"></i>
          </div>
          <div className="top-navbar-right ms-auto">
            {/* <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/profile_admin">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/"
                  onClick={(e) => {
                    logOut(e);
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul> */}
            <ul className="top-navbar-right ms-auto">

            <div class="dropdown"> 
            <div class="profile"> 
            <img class="dropbtn" src={`${Image_Link}/user.png`}/> 
            <div class="dropdown-content"> 
            <ul> 
                {/* <li><i class='bx bx-user'></i>
                <Link to="/profile">Profile</Link></li> */}
                <li><i class='bx bx-user'></i>
                <Link to="/password">Password</Link></li>
                <li><i class='bx bx-log-in-circle'></i>
                <Link to="#"  onClick={(e) => {
                    logOut(e);
                  }}>Logout</Link></li> </ul> </div> </div>
</div>
            </ul>
          </div>
        </nav>
      </header>

      <aside className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <Link to="/">
            <img
              src="/admin_assets/images/logo-icon.png"
              className="logo-icon"
              alt="logo icon"
            />
          </Link>
          <div>
            <img
              src="/admin_assets/images/logo-icon-2.png"
              className="logo-icon-2"
              alt="logo icon"
            />
          </div>
          <div className="toggle-icon ms-auto">
            {" "}
            <i className="bi bi-list" style={{color: "#fff"}}></i>
          </div>
        </div>


        {/* <div className="css-l4qrde">
          <div className="MuiAvatar-root MuiAvatar-circular css-1kgdhtw-MuiAvatar-root">
            <img alt="photoURL" src="/admin_assets/images/" className="MuiAvatar-img css-1pqm26d-MuiAvatar-img"/>
            </div>
            <div className="MuiBox-root css-d0uhtl">
              <h6 className="MuiTypography-root MuiTypography-subtitle2 css-1pyztyk-MuiTypography-root">
                Jaydon Frankie</h6>
                <p className="MuiTypography-root MuiTypography-body2 css-1aaagy3-MuiTypography-root"></p></div></div> */}


        <ul className="metismenu" id="menu">
          <li>
            <Link to="/dashboard">
              <div className="parent-icon">
                <i className="fadeIn animated bx bx-home-circle"></i>
              </div>
              <div className="menu-title">Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to="/enrollments">
              <div className="parent-icon">
              <i class="bi bi-people-fill"></i>
              </div>
              <div className="menu-title">Enrollments</div>
            </Link>
          </li>
          <li>
            <Link to="/sliders">
              <div className="parent-icon">
              <i class="bi bi-people-fill"></i>
              </div>
              <div className="menu-title">Sliders</div>
            </Link>
          </li>
          <li>
            <Link to="/add-slider">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Add Slider</div>
            </Link>
          </li>
          <li>
            <Link to="/namaz-time">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Namaz Time</div>
            </Link>
          </li>
          <li>
            <Link to="/site-info">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Site Info</div>
            </Link>
          </li>
          <li>
            <Link to="/services">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Services</div>
            </Link>
          </li>
          <li>
            <Link to="/add-service">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Add Service</div>
            </Link>
          </li>
          <li>
            <Link to="/teachers">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Teachers</div>
            </Link>
          </li>
          <li>
            <Link to="/add-teacher">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Add Teacher</div>
            </Link>
          </li>
          <li>
            <Link to="/programs">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Weekly Programs</div>
            </Link>
          </li>
          <li>
            <Link to="/add-program">
              <div className="parent-icon">
              <i class='fas fa-hand-holding-medical'></i>
              </div>
              <div className="menu-title">Add Weekly Program</div>
            </Link>
          </li>
        </ul>
      </aside>
      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
    </>
  );
}
