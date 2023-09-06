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

const getSliderList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "sliders", {
    headers: headers,
  });
};

const getNamazList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "namaz-timings", {
    headers: headers,
  });
};

const getTimeById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "namaz-timings/" + id, {
    headers: headers,
  });
};

const updateTimeById = (time, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(API_URL + "namaz-timings/" + id, { "time": time }, {
    headers: headers,
  });
};

const getSiteInfo = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "site-info", {
    headers: headers,
  });
};

const updateSiteInfo = (email, phone) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(API_URL + "site-info", { "email": email, "phone": phone }, {
    headers: headers,
  });
};

const updateService = (name, description, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(API_URL + "service/" + id, { "name": name, "description": description }, {
    headers: headers,
  });
};

const updateProgram = (name, description, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(API_URL + "program/" + id, { "name": name, "description": description }, {
    headers: headers,
  });
};

const getServices = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "services", {
    headers: headers,
  });
};

const getPrograms = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "weekly-programs", {
    headers: headers,
  });
};

const getTeachers = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "teachers", {
    headers: headers,
  });
};

const getServiceById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "service/" + id, {
    headers: headers,
  });
};

const getProgramById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "weekly-program/" + id, {
    headers: headers,
  });
};

const getTeacherById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "teacher/" + id, {
    headers: headers,
  });
};

const addService = (name, desc) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "service", { "name": name, "description": desc }, {
    headers: headers,
  });
};

const addProgram = (name, desc) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "weekly-program", { "name": name, "description": desc }, {
    headers: headers,
  });
};

const addTeacher = (name, desc) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "teacher", { "name": name, "description": desc }, {
    headers: headers,
  });
};

const totalSlider = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "slider-counter", {
    headers: headers,
  });
};

const totalService = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "service-counter", {
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

const uploadSlider = (data) => {
  console.log(data);
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  return axios.post(`${API_URL}slider`,
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

const deleteSlider = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "slider/" + id, {
    headers: headers,
  });
};

const deleteTeacher = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "teacher/" + id, {
    headers: headers,
  });
};

const deleteProgram = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "weekly-program/" + id, {
    headers: headers,
  });
};

const deleteService = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "service/" + id, {
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
  getSliderList,
  getNamazList, getTimeById, updateTimeById,
  getSiteInfo, updateSiteInfo, updateService,
  getPrograms, addProgram, getProgramById,
  getTeachers, addTeacher, getTeacherById,
  getServices, addService, getServiceById,
  totalSlider,
  totalService,
  getSearchBloodDonorList,
  getSearchBloodRequestList,
  getNewLimitBloodDonorList,
  getNewLimitBloodRequestList,
  getPaginationBloodDonorList,
  getPaginationBloodRequestList,
  UpdateAdminInfo,
  UpdateAdminProfile,
  uploadVolunteer, uploadSlider,
  deleteVolunteer,
  deleteSlider,
  deleteTeacher,
  deleteProgram,
  deleteService,
  deleteData,
  deleteRequest,
};

export default AdminListService;