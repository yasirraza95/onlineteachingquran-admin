import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import HeaderSidebar from "../../Admin/includes/HeaderSidebar";
import ToTop from "../../User/Include/ToTop";
import MoveTable from "../../Admin/includes/MoveTable";
import AdminFooter from "../../Admin/includes/AdminFooter";
import useLibrary from "../../../hooks/useLibrary";
import AdminListService from "../../../services/admin-list.service";

export default function Sliders() {
  const API_URL = process.env.REACT_APP_API_Link;
  const Image_URL = process.env.REACT_APP_Image_Link;
  const [loading, setLoading] = useState(false);
  const { convertObject } = useLibrary();
  const [resultData, setResultData] = useState([]);
  const [totalResults, setTotalResults] = useState("0");

  const delData = async (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b71ca",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          const response = await AdminListService.deleteVolunteer(delId);
          if (response.status === 200) {
            setLoading(false);
            toast.success("Deleted Successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            getResultData();
          }
        } catch (err) {
          toast.error("There is something wrong", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }
      }
    });
  };

  const getResultData = async () => {
    setLoading(true);
    try {
      let resultData;
      const response = await AdminListService.getSliderList();
      resultData = response.data.response;
      setResultData(resultData);
      setTotalResults(resultData.length);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    console.log("calling");
    getResultData();
  }, []);


  return (
    <div className="semi-dark">
      <div className="wrapper">
        <HeaderSidebar />

        <main className="page-content">
          <div className="manage-heading-2">
            <h2>
              All Sliders <span>[{totalResults}]</span>
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
                      <th>No</th>
                      <th>Image</th>
                      <th>Line1</th>
                      <th>Line2</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.length ? (
                      resultData.map((el, index) => (
                        <tr key={el.id}>
                          <td>
                            {index + 1}
                          </td>
                          <td>
                            <img
                              style={{ width: "100px" }}
                              src={`${Image_URL}/${el.image}`}
                              alt={el.name}
                            />
                          </td>
                          <td>{convertObject(el.line1)}</td>
                          <td>{convertObject(el.line2)}</td>
                          <td>
                            <button
                              className="btn btn-primary px-4 back-blue"
                              onClick={() => delData(el.id)}
                            >
                              Delete <i className="bi bi-trash-fill"></i>
                            </button>
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
