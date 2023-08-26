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
