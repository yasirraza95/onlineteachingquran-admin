import axios from "axios";
import secureLocalStorage from "react-secure-storage";
const API_URL = process.env.REACT_APP_API_Link;

const login = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "user/admin-login", {
      username: values.name,
      password: values.password,
    }, {
      headers: headers,
    }
  );
};

const forgotPass = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "user/forgot-admin", {
      email: values.email,
    }, {
      headers: headers,
    }
  );
};

const getSearchBloodDonorList = (col, val, limit, pageNo, id) => {
  if (col === "1") {
    col = "first_name";
  } else if (col === "2") {
    col = "last_name";
  } else if (col === "3") {
    col = "address";
  } else if (col === "4") {
    col = "city_name";
  } else if (col === "5") {
    col = "blood_group";
  } else if (col === "6") {
    col = "date";
  } else {
    col = "created_at";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
    "list-all-donor" +
    id +
    "?" +
    col +
    "=" +
    val +
    "&limit=" +
    limit +
    "&page=" +
    pageNo, {
      headers: headers,
    }
  );
};
const getNewLimitBloodDonorList = (limit, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-all-donor" + "?limit=" + limit, {
    headers: headers,
  });
};
const getSearchBloodRequestList = (col, val, limit, pageNo, id) => {
  if (col === "1") {
    col = "phone";
  } else if (col === "2") {
    col = "blood";
  } else if (col === "3") {
    col = "state";
  } else if (col === "4") {
    col = "city";
  } else {
    col = "created_at";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
    "admin-requests" +
    id +
    "?" +
    col +
    "=" +
    val +
    "&limit=" +
    limit +
    "&page=" +
    pageNo, {
      headers: headers,
    }
  );
};
const getNewLimitBloodRequestList = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "admin-requests" + "?limit=" + limit, {
    headers: headers,
  });
};
const getPaginationBloodDonorList = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-all-donor?page=" + pageNo + "&limit=" + limit, {
      headers: headers,
    }
  );
};
const getPaginationBloodRequestList = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "admin-requests?page=" + pageNo + "&limit=" + limit, {
      headers: headers,
    }
  );
};
const UpdateAdminInfo = (id, values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  console.log(values);
  let object = {};

    object = {
      updated_by: id,
      new_password: values.new_password,
      current_password: values.current_password,
    }

  return axios.post(`${API_URL}update-admin-password/${id}`,
    object
  , {
    headers: headers,
  });
};

const UpdateAdminProfile = (id, data) => {
  console.log(data);
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  return axios.post(`${API_URL}update-admin-image/${id}`,
    data
  , {
    headers: headers,
  });
};

const uploadVolunteer = (data) => {
  console.log(data);
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  return axios.post(`${API_URL}volunteer`,
    data
  , {
    headers: headers,
  });
};

const deleteVolunteer = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "volunteer/" + id, {
    headers: headers,
  });
};

const deleteData = (donorId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "admin-donor/" + donorId, {
    headers: headers,
    data: {
      deleted_by: adminId,
    },
  });
};

const deleteRequest = (donorId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(`${API_URL}admin-request/${donorId}`, {
    headers: headers,
    data: {
      deleted_by: adminId,
    },
  });
};

const AdminListService = {
  login,
  forgotPass,
  getSearchBloodDonorList,
  getSearchBloodRequestList,
  getNewLimitBloodDonorList,
  getNewLimitBloodRequestList,
  getPaginationBloodDonorList,
  getPaginationBloodRequestList,
  UpdateAdminInfo,
  UpdateAdminProfile,
  uploadVolunteer,
  deleteVolunteer,
  deleteData,
  deleteRequest,
};

export default AdminListService;