import moment from "moment";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useSortableData from "../../hooks/useSortableData";
import useTable from "../../hooks/useTable";
import UserService from "../../services/user.service";

import AdminFooter from "../Admin/includes/AdminFooter";
import HeaderSidebar from "../Admin/includes/HeaderSidebar";
import MoveTable from "../Admin/includes/MoveTable";
import ToTop from "../Admin/includes/ToTop";
import useLibrary from "../../hooks/useLibrary";
import Cards from "./Cards";
import Table from "./Table";
export default function Dashboard() {
  const { convertObject } = useLibrary();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");
  const state = useSelector((state) => state.stateVals);
  const { name, id, uType } = state;


  useLayoutEffect(() => {

    const getResultData = async () => {
      setLoading(true);

      try {
        let resultData;
          const response = await UserService.listBloodRequest();
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
    // getPercentage();
  }, []);

  const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    const { items, requestSort, sortConfig } = useSortableData(slice);

    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
      <>
        <table className="table caption-top align-middle table-borderless table-style-1">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("index")}
                className={getClassNamesFor("index")}
              >
                No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("phone")}
                className={getClassNamesFor("phone")}
              >
                Phone No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("blood")}
                className={getClassNamesFor("blood")}
              >
                Blood Group
              </th>

              <th
                scope="col"
                onClick={() => requestSort("state")}
                className={getClassNamesFor("state")}
              >
                State
              </th>

              <th
                scope="col"
                onClick={() => requestSort("city")}
                className={getClassNamesFor("city")}
              >
                City
              </th>

              <th
                scope="col"
                onClick={() => requestSort("date")}
                className={getClassNamesFor("date")}
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((el, index) => (
                <tr key={el.id}>
                  <td>
                    {currentPage === 1
                      ? index + 1
                      : (currentPage - 1) * limit + index + 1}
                  </td>
                  <td>{convertObject(el.phone)}</td>
                  <td>{convertObject(el.blood)}</td>
                  <td>{convertObject(el.state)}</td>
                  <td>{convertObject(el.city)}</td>
                  <td>{convertObject(el.date)}</td>
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

  return (
      <div className="semi-dark">
        <div className="wrapper">
          <HeaderSidebar />

          <main className="page-content">
            <div className="manage-heading-2">
              <h4 style={{fontWeight: "700", lineHeight: "1.5", fontSize: "1.25rerm", marginBottom: "40px"}}>
              Hi, Welcome back
              </h4>
            </div>
            <Cards/>
            <div className="row">
              <div className="col">
                {/* <div className="manage-heading-2 mt-3">
                <h2>
                  Latest Blood Requests Need Your Attention{" "}
                </h2>
              </div> */}
                <div className="slides-here">
                   {/* <div className="alert alert-info">
                  <b>Info!</b> You can search your required data by putting text
                  in search box
                </div> */}
                  <div className="main-content-box">
                    <div className="col-md-12">
                  <div className="manage-heading-2 mt-3">
                <h2>
                  Latest Blood Requests Need Your Attention{" "}
                </h2>
                       <Link
                    className="btn btn-primary px-4 d-block back-blue mb-3 float-lg-end"
                    to="/blood-request"
                  >
                    View Blood Requests
                  </Link>
              </div>
              </div>
                    <div className="clearfix"></div>
                  <MoveTable />
                    <div className="table-responsive">
                      <Table data={resultData} rowsPerPage={limit} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </main>

          <ToTop />
          {/* <div className={`loader ${loading ? "in" : ""}`}>
            <div className="spinner-border main-spin"></div>
          </div> */}
        </div>
        <AdminFooter />
      </div>
  );
}
