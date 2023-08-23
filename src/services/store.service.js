import axios from "axios";

const API_URL = process.env.REACT_APP_API_Link;

const getStoreState = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "store/state/list", {
    headers: headers,
  });
};

const getCityByStateId = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "store/city/get-by-state-id/" + id, {
    headers: headers,
  });
};

const getStoreByCityId = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "store/get-by-city-id/" + id, {
    headers: headers,
  });
};

const getStoreInfoById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "store/get-by-id/" + id, {
    headers: headers,
  });
};

const StoreService = {
  getStoreState,
  getCityByStateId,
  getStoreByCityId,
  getStoreInfoById,
};

export default StoreService;
