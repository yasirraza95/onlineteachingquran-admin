import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import HeaderSidebar from "../../Admin/includes/HeaderSidebar";
import ToTop from "../../User/Include/ToTop";
import MoveTable from "../../Admin/includes/MoveTable";
import AdminFooter from "../../Admin/includes/AdminFooter";
import useLibrary from "../../../hooks/useLibrary";
import AdminListService from "../../../services/admin-list.service";
import { Link } from "react-router-dom";

export default function SiteInfo() {
  const [loading, setLoading] = useState(false);
  const { convertObject } = useLibrary();
  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getResultData = async () => {
    setLoading(true);

    try {
      let resultData;
      const response = await AdminListService.getSiteInfo();
      resultData = response.data.response;
      setResultData(resultData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    getResultData();
  }, []);

  return (
    <div className="semi-dark">
      <div className="wrapper">
        <HeaderSidebar />

        <main className="page-content">
          <div className="manage-heading-2">
            <h2>
              Site Information
            </h2>
          </div>
          <div className="slides-here">
            <div className="main-content-box">
              <div className="manage-territories-box mb-30">
              </div>
              <MoveTable />
              <div className="table-responsive">
                <table className="table caption-top align-middle table-borderless table-style-1">
                  <thead>
                    <tr>
                      <th>
                        No
                      </th>
                      <th>
                        Email
                      </th>
                      <th>
                        Contact No.
                      </th>
                      <th>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.length ? (
                      resultData.map((el, index) => (
                        <tr key={el.id}>
                          <td>
                            {currentPage === 1
                              ? index + 1
                              : (currentPage - 1) * limit + index + 1}
                          </td>
                          <td>{convertObject(el.email)}</td>
                          <td>{convertObject(el.phone)}</td>
                          <td>
                            <Link
                              className="btn btn-primary px-4 back-blue"
                              to={`/edit-info/${el.id}`}
                            >
                              Edit <i className="bi bi-pencil"></i>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center text-capitalize">
                          No record found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <ToTop />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
      <AdminFooter />
      <ToastContainer />
    </div>
  );
}
