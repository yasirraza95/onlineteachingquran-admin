import React from "react";
import { Link } from "react-router-dom";
import ToTop from "./ToTop";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              © Copyrights {new Date().getFullYear()} all rights reserved.
            </div>
            <div className="col-lg-4">
              <Link to="/privacyStatement" className="privacy-fot">
                {" "}
                Privacy Statement{" "}
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <ToTop />
    </>
  );
}
