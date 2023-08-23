import { useFormik } from "formik";
import React, { useLayoutEffect, useRef, useState } from "react";
import Pagination from "react-js-pagination";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useSortableData from "../../../hooks/useSortableData";
import useTable from "../../../hooks/useTable";
import { quizSearch } from "../../../schema";
import UserService from "../../../services/user.service";
import Footer from "../Include/Footer";
import Header from "../Include/Header";
import MoveTable from "../Include/MoveTable";
import SeeAttachment from "../Include/SeeAttachment";

export default function Header1() {
  const state = useSelector((state) => state.stateVals);
  const { id } = state;

  const [attachment, setAttachment] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");
  const dateRef = useRef(null);

  const changeDate = (e) => {
    setLoading(true);

    const getPrevClaimstData = async () => {
      setLoading(true);
      if (id) {
        try {
          if (values.fieldtype === "" && values.searchval === "") {
            const response = await UserService.getSearchPrevClaimstById(
              id,
              "",
              e,
              limit,
              1
            );
            let resultData;
            if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setTotalResults(response.data.records);
              setTotalPages(response.data.total_pages);
              setLimit(response.data.per_page);
              setLoading(false);
            }
          } else if (values.fieldtype === "" || values.searchval === "") {
            setLoading(false);

            handleSubmit();
          } else {
            const response = await UserService.getSearchWithDatePrevClaimstById(
              id,
              values.fieldtype,
              values.searchval,
              e,
              limit
            );
            let resultData;
            if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setTotalResults(response.data.records);
              setTotalPages(response.data.total_pages);
              setLimit(response.data.per_page);
              setLoading(false);
            }
          }
        } catch (err) {
          setResultData([]);
          setTotalResults("0");
          setTotalPages("1");
          if (err.response.status === 404) {
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      }
    };
    getPrevClaimstData();
  };

  const changeLimit = (e) => {
    let newLimit = e;
    setLimit(newLimit);
    // console.log(limit);
    const getPrevClaimstData = async () => {
      setLoading(true);
      if (id) {
        try {
          if (
            values.fieldtype === "" &&
            values.searchval === "" &&
            dateRef.current.value === ""
          ) {
            const response = await UserService.getLimitPrevClaimstById(
              id,
              newLimit
            );

            let resultData;
            if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setLimit(response.data.per_page);
              setCurrentPage(1);
              setLoading(false);
            }
          } else if (values.fieldtype === "" && values.searchval === "") {
            if (dateRef.current.value !== "") {
              const response = await UserService.getSearchPrevClaimstById(
                id,
                "",
                dateRef.current.value,
                newLimit,
                1
              );
              let resultData;
              if (response.status === 206) {
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setLimit(response.data.per_page);
                setCurrentPage(1);
                setLoading(false);
              }
            }
          } else if (values.fieldtype === "" || values.searchval === "") {
            handleSubmit();
            setLoading(false);
          } else if (values.fieldtype !== "" && values.searchval !== "") {
            if (dateRef.current.value !== "") {
              const response =
                await UserService.getSearchWithDatePrevClaimstById(
                  id,
                  values.fieldtype,
                  values.searchval,
                  dateRef.current.value,
                  newLimit,
                  1
                );
              let resultData;
              if (response.status === 206) {
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setLimit(response.data.per_page);
                setCurrentPage(1);
                setLoading(false);
              } else {
                setTotalResults("0");
                setTotalPages("1");
                setResultData([]);
                setLoading(false);
              }
            } else {
              const response = await UserService.getSearchPrevClaimstById(
                id,
                values.fieldtype,
                values.searchval,
                newLimit,
                1
              );

              let resultData;
              if (response.status === 206) {
                setLoading(false);
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setCurrentPage(1);
                setLimit(response.data.per_page);
              } else {
                setTotalResults("0");
                setTotalPages("1");
                setResultData([]);
                setLoading(false);
                Swal.fire({
                  text: "Error fetching record",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            }
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
      }
    };
    getPrevClaimstData();
  };

  const changePagination = (e) => {
    setCurrentPage(e);

    // console.log(e)
    let pageNo = e;
    // setLimit(newLimit);
    // console.log(limit);
    const getPrevClaimstData = async () => {
      setLoading(true);
      if (id) {
        try {
          if (
            values.fieldtype === "" &&
            values.searchval === "" &&
            dateRef.current.value === ""
          ) {
            const response = await UserService.getPaginatedPrevClaimstById(
              id,
              pageNo,
              limit
            );
            console.log(response);
            let resultData;
            if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setLimit(response.data.per_page);
              setLoading(false);
            }
          } else if (values.fieldtype === "" && values.searchval === "") {
            if (dateRef.current.value !== "") {
              const response = await UserService.getSearchPrevClaimstById(
                id,
                "",
                dateRef.current.value,
                limit,
                pageNo
              );
              let resultData;
              if (response.status === 206) {
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setLimit(response.data.per_page);

                setLoading(false);
              }
            }
          } else if (values.fieldtype === "" || values.searchval === "") {
            handleSubmit();
            setLoading(false);
          } else if (values.fieldtype !== "" && values.searchval !== "") {
            if (dateRef.current.value !== "") {
              const response =
                await UserService.getSearchWithDatePrevClaimstById(
                  id,
                  values.fieldtype,
                  values.searchval,
                  dateRef.current.value,
                  limit,
                  pageNo
                );
              let resultData;
              if (response.status === 206) {
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setLimit(response.data.per_page);

                setLoading(false);
              } else {
                setTotalResults("0");
                setTotalPages("1");
                setResultData([]);
                setLoading(false);
              }
            } else {
              const response = await UserService.getSearchPrevClaimstById(
                id,
                values.fieldtype,
                values.searchval,
                limit,
                pageNo
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
                Swal.fire({
                  text: "Error fetching record",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            }
          }
        } catch (err) {
          if (err.response.status === 404) {
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      }
    };
    getPrevClaimstData();
  };

  const searchData = async (action) => {
    setLoading(true);

    try {
      if (dateRef.current.value === "") {
        const response = await UserService.getSearchPrevClaimstById(
          id,
          values.fieldtype,
          values.searchval,
          limit,
          1
        );

        let resultData;
        if (response.status === 206) {
          setLoading(false);
          resultData = response.data.response;
          setResultData(resultData);
          setTotalResults(response.data.records);
          setTotalPages(response.data.total_pages);
          setCurrentPage(1);
          setLimit(response.data.per_page);
        } else {
          setTotalResults("0");
          setTotalPages("1");
          setResultData([]);
          setLoading(false);
          Swal.fire({
            text: "Error fetching record",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const response = await UserService.getSearchWithDatePrevClaimstById(
          id,
          values.fieldtype,
          values.searchval,
          dateRef.current.value,
          limit,
          1
        );
        let resultData;
        if (response.status === 206) {
          resultData = response.data.response;
          setResultData(resultData);
          setTotalResults(response.data.records);
          setTotalPages(response.data.total_pages);
          setCurrentPage(1);
          setLimit(response.data.per_page);
          setLoading(false);
        }
      }
    } catch (err) {
      setTotalPages("1");
      setTotalResults("0");
      if (err.response.status === 500) {
        setLoading(false);
        Swal.fire({
          text: "Something went wrong, try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        setLoading(false);
        setResultData([]);
      }
    }
  };

  useLayoutEffect(() => {
    const getPrevClaimstData = async () => {
      setLoading(true);
      if (id) {
        try {
          const response = await UserService.getPrevClaimstById(id);

          let resultData;
          if (response.status === 206) {
            resultData = response.data.response;
            setResultData(resultData);
            setLimit(response.data.per_page);
            setTotalResults(response.data.records);
            setTotalPages(response.data.total_pages);
            setLoading(false);
          }
        } catch (err) {
          setTotalPages("1");
          if (err.response.status === 404) {
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      }
    };
    getPrevClaimstData();
  }, [id]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,

      initialValues: {
        fieldtype: "",
        searchval: "",
      },
      validationSchema: quizSearch,
      onSubmit: (values, action) => {
        // action.resetForm();
        searchData(action);
      },
    });

  const Table = ({ data, rowsPerPage }) => {
    const { slice } = useTable(data, 1, rowsPerPage);
    const { items, requestSort, sortConfig } = useSortableData(slice);

    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
      <>
        <table className="table caption-top align-middle table-borderless table-style-1 prev-claims">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("id")}
                className={getClassNamesFor("id")}
              >
                No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("sale_deliver_invoice_no")}
                className={getClassNamesFor("sale_deliver_invoice_no")}
              >
                Invoice No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("product_name")}
                className={getClassNamesFor("product_name")}
              >
                Product Name
              </th>
              <th
                scope="col"
                onClick={() => requestSort("size")}
                className={getClassNamesFor("size")}
              >
                Product Size
              </th>

              <th
                scope="col"
                onClick={() => requestSort("sale_ship_qty")}
                className={getClassNamesFor("sale_ship_qty")}
              >
                Quantity
              </th>

              <th
                scope="col"
                onClick={() => requestSort("size_price")}
                className={getClassNamesFor("size_price")}
              >
                Price
              </th>

              <th
                scope="col"
                onClick={() => requestSort("sale_split_sale_status")}
                className={getClassNamesFor("sale_split_sale_status")}
              >
                Split Sale
              </th>
              <th
                scope="col"
                onClick={() => requestSort("sale_reward")}
                className={getClassNamesFor("sale_reward")}
              >
                Reward
              </th>
              <th
                scope="col"
                onClick={() => requestSort("store_name")}
                className={getClassNamesFor("store_name")}
              >
                Store
              </th>
              <th
                scope="col"
                onClick={() => requestSort("city_name")}
                className={getClassNamesFor("city_name")}
              >
                City
              </th>
              <th
                scope="col"
                onClick={() => requestSort("state_name")}
                className={getClassNamesFor("state_name")}
              >
                State
              </th>
              <th
                scope="col"
                onClick={() => requestSort("invoice_date")}
                className={getClassNamesFor("invoice_date")}
              >
                Invoice Date
              </th>

              <th
                scope="col"
                onClick={() => requestSort("sales_file")}
                className={getClassNamesFor("sales_file")}
              >
                Attachment
              </th>

              <th
                scope="col"
                onClick={() => requestSort("sale_status")}
                className={getClassNamesFor("sale_status")}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((el, index) => (
                <tr key={index}>
                  <td>
                    {currentPage === 1
                      ? index + 1
                      : (currentPage - 1) * limit + index + 1}
                  </td>
                  <td>{el.sale_deliver_invoice_no}</td>
                  <td>{el.product_name}</td>
                  <td>{el.size + " " + el.size_code}</td>
                  <td>{el.sale_ship_qty}</td>
                  <td>${el.size_price}</td>
                  <td>{el.sale_split_sale_status}</td>
                  <td>${el.sale_reward}</td>
                  <td>{el.store_name}</td>
                  <td>{el.city_name}</td>
                  <td>{el.state_name}</td>
                  <td>{el.invoice_date}</td>

                  <td>
                    <Link
                      to="/"
                      className="orng-textbtn"
                      onClick={() => {
                        setAttachment(
                          process.env.REACT_APP_API_Link + el.sales_file
                        );
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                    >
                      SEE ATTACHMENT
                    </Link>
                  </td>

                  {el.sale_status === "rejected" ? (
                    <td className="rejected">
                      <img src="images/rejected.png" alt="" /> Rejected <br />
                      <strong>Reason:</strong> {el.reject_reason}
                    </td>
                  ) : (
                    <td className="rejected">
                      <img src="images/approved.png" alt="" /> Approved <br />
                      {el.reject_reason === "" ? null : (
                        <>
                          <strong>Reason:</strong> {el.reject_reason}
                        </>
                      )}
                    </td>
                  )}
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
        {totalResults > limit && totalPages > 1 ? (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={parseInt(limit)}
            totalItemsCount={totalResults}
            onChange={(e) => {
              changePagination(e);
            }}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First Page"
            lastPageText="Last Lage"
          />
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <div className="user-panel">
      <section className="main-ban page-heading">
        <div className="container">
          <Header />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="traning-awards">
                <h1 className="mban-head w-100">
                  PREVIOUS CLAIMS [{totalResults}]
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="claims-part">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="gen-hed">
                Previously <span>Entered Sales</span>
              </h2>
              <span className="gen-txt">
                Here you can view the detailed information of claims. By
                clicking on <strong>SEE ATTACHMENT</strong> link you can view
                the picture of claims.
              </span>
              <span className="gen-txt">
                You can search your required data by putting text in search box
              </span>
            </div>

            <div className="col-lg-12">
              <div className="table-holder rzl-tabl">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row mt-3">
                    <div className="col-lg-3">
                      <select
                        className={`form-select ${
                          errors.fieldtype && touched.fieldtype
                            ? "is-danger"
                            : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="fieldtype"
                        value={values.fieldtype || ""}
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">Invoice No</option>
                        <option value="2">Product Name</option>
                        <option value="3">Product Size </option>
                        <option value="4">Quantity</option>
                        <option value="5">Price</option>
                        <option value="6">Store</option>
                        <option value="7">City</option>
                        <option value="8">State</option>
                        <option value="9">Status</option>
                      </select>
                      {errors.fieldtype && touched.fieldtype ? (
                        <p className="help is-danger">{errors.fieldtype}</p>
                      ) : null}
                    </div>

                    <div className="col-lg-4 ">
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.searchval && touched.searchval
                              ? "is-danger"
                              : ""
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="searchval"
                          value={values.searchval || ""}
                          required
                        />

                        <button
                          className="btn btn-outline-secondary sebmit-dat"
                          type="submit"
                        >
                          Search
                        </button>
                      </div>
                      {errors.searchval && touched.searchval ? (
                        <p className="help is-danger">{errors.searchval}</p>
                      ) : null}
                    </div>
                    <div className="col-lg-2 ">
                      <input
                        type="date"
                        ref={dateRef}
                        className="form-control"
                        onChange={(e) => changeDate(e.target.value)}
                        placeholder="dd-mm-yyyy"
                      />
                    </div>
                    <div className="col-lg-2 ">
                      <select
                        className="form-select"
                        value={limit}
                        onChange={(e) => changeLimit(e.target.value)}
                      >
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                        <option value="500">500</option>
                      </select>
                    </div>
                    <div className="col-lg-1 text-end">
                      <button
                        className="btn btn-outline-secondary"
                        type="reset"
                        onClick={() => window.location.reload(false)}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
                <MoveTable />
                <div className="table-responsive">
                  <Table data={resultData} rowsPerPage={limit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
      <SeeAttachment src={attachment} />
    </div>
  );
}
