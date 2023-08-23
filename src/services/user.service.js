import axios from "axios";

import secureLocalStorage from "react-secure-storage";
// import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_Link;

const login = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "admin-login",  
    {
      username: values.name,
      password: values.password,
    },
    {
      headers: headers,
    }
  );
};

const AdminforgotPass = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "user/forgot-admin",
    {
      email: values.email,
    },
    {
      headers: headers,
    }
  );
};

const changePass = (values, forgotToken) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "user/update-password/" + forgotToken,
    {
      password: values.password,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const checkToken = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "user/check-forgot-token/" + token, {
    headers: headers,
  });
};

const validateProfileEmail = (values, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "user/check-profile-email-exist/" + id + "/" + values.email,
    {
      headers: headers,
    }
  );
};



const UpdateAdminInfo = (values, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "user/update/" + id,
    {
      first_name: values.fname,
      last_name: values.lname,
      email: values.email,
      state: values.state,
      city: values.city,
      zip: values.zipcode,
      address: values.address,
      phone: values.phone,
      updated_by: "1",

      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const listBloodRequest = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  let query = `${API_URL}admin-requests`;

  console.log("query="+query);
  return axios.get(query,
    {
      headers: headers,
    }
  );
};
const listBloodDonor = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  let query = `${API_URL}list-all-donor`;

  // console.log("query="+query);
  return axios.get(query,
    {
      headers: headers,
    }
  );
};

const listVolunteers = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  let query = `${API_URL}list-admin-volunteers`;

  return axios.get(query,
    {
      headers: headers,
    }
  );
};

const listPagerVolunteers = (limit, page) => {
  const headers = {
    "Content-Type": "application/json",
  };

  let query = `${API_URL}list-admin-volunteers?limit=${limit}&page=${page}`;

  return axios.get(query,
    {
      headers: headers,
    }
  );
};

const listSearchBloodDonor = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let column = ``;
console.log("values="+values);
  if(values.fieldtype == '1') {
    column = 'first_name';
  } else if(values.fieldtype == '2') {
    column = 'last_name';
  } else if(values.fieldtype == '3') {
    column = 'address';
  } else if(values.fieldtype == '4') {
    column = 'city';
  } else if(values.fieldtype == '5') {
    column = 'group';
  }

  let query = `${API_URL}list-all-donor`;
  if(values) {
    query += `?${column}=${values.searchval}`;
  }

  console.log("query="+query);
  return axios.get(query,
    {
      headers: headers,
    }
  );
};
const listSearchBloodRequest = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let column = ``;
console.log("values="+values);
  if(values.fieldtype == '1') {
    column = 'phome';
  } else if(values.fieldtype == '2') {
    column = 'blood';
  } else if(values.fieldtype == '3') {
    column = 'state';
  } else if(values.fieldtype == '4') {
    column = 'city';
  }

  let query = `${API_URL}admin-requests`;
  if(values) {
    query += `?${column}=${values.searchval}`;
  }

  console.log("query="+query);
  return axios.get(query,
    {
      headers: headers,
    }
  );
};

const totalRequest = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "request-counter", {
    headers: headers,
  });
};
const totalDonor = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "donor-counter", {
    headers: headers,
  });
};

const UserService = {
  login,
  AdminforgotPass,
  changePass,
  checkToken,
  validateProfileEmail,
  UpdateAdminInfo,
  listBloodRequest,
  listBloodDonor,
  listVolunteers,
  listPagerVolunteers,
  listSearchBloodDonor,
  listSearchBloodRequest,
  totalRequest,
  totalDonor
};

export default UserService;
