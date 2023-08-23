import React from 'react'
import "./ContactUs.css";
import HeaderSidebar from '../Admin/includes/HeaderSidebar'
import AdminFooter from '../Admin/includes/AdminFooter'
import ToTop from '../Admin/includes/ToTop'

export default function ContactUs() {
  return (
    <div className="semi-dark">
    <div className="wrapper">
      <HeaderSidebar />

      <div className="manage-heading-2">
              <h4 style={{fontWeight: "700", lineHeight: "1.5", fontSize: "1.25rerm", marginBottom: "40px"}}>
              Hi, Welcome back
              </h4>
            </div>

  <div className="overlay">
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <div className="contact-us text-center">
          <h3>Contact Us</h3>
          <p className="mb-5">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
          <div className="row">
            <div className="col-md-6">
              <div className="mt-5 text-center px-3">
                <div className="d-flex flex-row align-items-center">
                  <span className="icons">
                    <i className="bi bi-geo-alt-fill" style={{color: "#fff"}}></i>
                  </span>
                  <div className="address text-left">
                    <span>Address</span>
                    <p>461-Sugar camp-San jose, California, USA</p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mt-3">
                  <span className="icons">
                    <i className="fa fa-phone" style={{color: "#fff"}}></i>
                  </span>
                  <div className="address text-left">
                    <span>Phone</span>
                    <p>501 205 2929</p>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mt-3">
                  <span className="icons">
                    <i className="fa fa-envelope-o" style={{color: "#fff"}}></i>
                  </span>
                  <div className="address text-left">
                    <span>Address</span>
                    <p>contact@bbbootstrap.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-center px-1">
                <div className="forms p-4 py-5 bg-black">
                  <h5>Send Message</h5>
                  <div className="mt-4 inputs">
                    <input type="text" className="form-control" placeholder="Name"/>
                    <input type="text" className="form-control" placeholder="Email"/>
                    <textarea className="form-control" placeholder="Type your message"></textarea>
                  </div>
                  <div className="button mt-4 text-left">
                    <button className="btn btn-dark" style={{backgroundColor: "#D0F2FF", color: "#000"}}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <ToTop />
      {/* <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div> */}
    </div>
    <AdminFooter />
  </div>
  )
}
