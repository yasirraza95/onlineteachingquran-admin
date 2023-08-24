import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useTable from "../../../hooks/useTable";
import useSortableData from "../../../hooks/useSortableData";
import { useSelector } from "react-redux";
import UserService from "../../../services/user.service";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import $ from "jquery";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import HeaderSidebar from "../../Admin/includes/HeaderSidebar";
import ToTop from "../../User/Include/ToTop";
import { quizSearch } from "../../schema";
import MoveTable from "../../Admin/includes/MoveTable";
import AdminFooter from "../../Admin/includes/AdminFooter";
import useLibrary from "../../../hooks/useLibrary";
import AdminListService from "../../../services/admin-list.service";
import { Link } from "react-router-dom";

export default function Sliders() {
  const API_URL = process.env.REACT_APP_API_Link;

  const state = useSelector((state) => state.stateVals);
  const { id, uType } = state;
  const [loading, setLoading] = useState(false);
  const { convertObject } = useLibrary();
  const { height, width } = useWindowDimensions();
  const [insertedVal, setInsertedVal] = useState("");
  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");
  const [selectedCol, setSelectedCol] = useState("");
  const dateRef = useRef(null);

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

  const changeLimit = (e) => {
    let newLimit = e;
    console.log(limit);
    setLimit(newLimit);
    const getResultData = async () => {
      try {
        if (values.fieldtype === "" && values.searchval === "") {
          setLoading(true);

          setLimit(newLimit);

          const response = await UserService.listPagerVolunteers(
            newLimit
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;
            setResultData(resultData);
            setTotalResults(response.data.records);
            setCurrentPage(1);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
          } else {
            setTotalResults("0");
            setTotalPages("1");
            setResultData([]);
            setLoading(false);
          }
        } else if (values.fieldtype !== "" && values.searchval !== "") {
          setLoading(true);

          setLimit(newLimit);

          const response = await AdminListService.getSearchBloodDonorList(
            values.fieldtype,
            values.searchval,
            newLimit
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;

            setResultData(resultData);
            setTotalResults(response.data.records);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
          } else {
            setTotalResults("0");
            setTotalPages("1");
            setResultData([]);
            setLoading(false);
          }
        } else if (values.fieldtype !== "" || values.searchval !== "") {
          handleSubmit();
        }
      } catch (err) {
        if (err.response.status === 404) {
          setTotalResults("0");
          setTotalPages("1");
          setResultData([]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
  };

  const changePagination = (e) => {
    setCurrentPage(e);

    let pageNo = e;

    const getResultData = async () => {
      setLoading(true);
      try {
        if (values.fieldtype === "" && values.searchval === "") {
          const response = await AdminListService.getPaginationBloodDonorList(
            pageNo,
            limit
          );

          let resultData;
          resultData = response.data.response;

          setResultData(resultData);
          setLimit(response.data.per_page);
          setLoading(false);
        } else if (values.fieldtype !== "" || values.searchval !== "") {
          handleSubmit();
        }
      } catch (err) {
        setLoading(false);
      }
    };
    getResultData();
  };

  const getResultData = async () => {
    setLoading(true);

    try {
      let resultData;
      const response = await UserService.listVolunteers();
      resultData = response.data.response;
      setResultData(resultData);
      setLimit(response.data.per_page);
      setCurrentPage(1);
      setTotalResults(response.data.records);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (err) {
      setTotalPages("1");
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    getResultData();
    // getPercentage();
  }, []);

  const changeColumn = (e) => {
    setSelectedCol(e.target.value);
  };

  const changeValue = (e) => {
    setInsertedVal(e.target.value);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,

      initialValues: {
        fieldtype: "",
        searchval: "",
      },
      validationSchema: quizSearch,
      onSubmit: (values, action) => {
        // console.log(values);
        searchData(values);
      },
    });

  const searchData = (values) => {
    const getResultData = async () => {
      setLoading(true);

      try {
        let resultData;
        const response = await UserService.listSearchBloodDonor(values);
        resultData = response.data.response;
        setResultData(resultData);
        setLimit(response.data.per_page);
        setTotalResults(response.data.records);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (err) {
        setTotalPages("1");
        if (err.response.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
  };

  const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    const { items, requestSort, sortConfig } = useSortableData(slice);

    //FIXME Why Sorting missing
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const allSelect = async () => {
      $("input:checkbox").prop("checked", $(".slect_all").prop("checked"));
      var checkedVals = $(".select_one:checkbox:checked")
        .map(function () {
          return this.value;
        })
        .get();
      console.log(checkedVals.join("+"));
    };

    return (
      <>
        <table className="table caption-top align-middle table-borderless table-style-1">
          <thead>
            <tr>
              {/* <th>
              <input
                className="form-check-input select_one"
                type="checkbox"
                onChange={changeSelection}
              />
            </th> */}
              <th
                scope="col"
                onClick={() => requestSort("index")}
                className={getClassNamesFor("index")}
              >
                No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                Name
              </th>
              <th
                scope="col"
                onClick={() => requestSort("image")}
                className={getClassNamesFor("image")}
              >
                Image
              </th>
              <th
                scope="col"
                onClick={() => requestSort("date")}
                className={getClassNamesFor("date")}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((el, index) => (
                <tr key={el.id}>
                  {/* <td>
                    <input
                      className="form-check-input select_one"
                      id={el.salesID}
                      value={el.salesID}
                      type="checkbox"
                      onChange={changeSelection}
                    />
                  </td> */}
                  <td>
                    {currentPage === 1
                      ? index + 1
                      : (currentPage - 1) * limit + index + 1}
                  </td>
                  <td>{convertObject(el.name)}</td>
                  <td>
                    <img
                      style={{ width: "100px" }}
                      src={`https://api.sehatbooking.com/public/upload/${el.image}`}
                      alt={el.name}
                    />
                  </td>
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
      </>
    );
  };

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");

      const weIp = res.data.IPv4;
      secureLocalStorage.setItem("ip", weIp);
    };
    getIp();
  }, [handleSubmit]);

  return (
    <div className="semi-dark">
      <div className="wrapper">
        <HeaderSidebar />

        <main className="page-content">
          <div className="manage-heading-2">
            <h2>
              All Volunteers <span>[{totalResults}]</span>
            </h2>
          </div>
          <div className="slides-here">
            <div className="main-content-box">
              <div className="manage-territories-box mb-30">
                {/* <div className="row">
                  <div className="col-lg-12">
                    <h2 className="manage-territories-heading">All Claims</h2>
                  </div>

                </div> */}


                
              </div>
              <MoveTable />
              <div className="table-responsive">
                <Table data={resultData} rowsPerPage={limit} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="pagi">
                {totalResults > limit && totalPages > 1 ? (
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={parseInt(limit)}
                    totalItemsCount={totalResults}
                    onChange={(e) => {
                      changePagination(e);
                    }}
                    pageRangeDisplayed={
                      width >= 1024
                        ? 8
                        : width >= 768
                        ? 6
                        : width >= 425
                        ? 3
                        : width >= 375
                        ? 2
                        : 1
                    }
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                  />
                ) : (
                  ""
                )}
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
