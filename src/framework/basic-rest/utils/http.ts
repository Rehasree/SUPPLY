import axios from "axios";
//import { getToken } from "./get-token";
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGIxM2RiODUyNTk3Nzg4Yzg0NzNjMiIsInRva2VuX3RpbWUiOiIxNjMyNDg0NzEzMDU1IiwiaWF0IjoxNjMyNDg0NzEzfQ.0lU2QPKyLYP7Y-8ss7JTNvtNJYZ6-YHHKO7ng37iKCs
//https://supplys-main.herokuapp.com/api
//https://probackend.supplys.app/api
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGIxM2RiODUyNTk3Nzg4Yzg0NzNjMiIsInRva2VuX3RpbWUiOiIxNjMyNDg0NzEzMDU1IiwiaWF0IjoxNjMyNDg0NzEzfQ.0lU2QPKyLYP7Y-8ss7JTNvtNJYZ6-YHHKO7ng37iKCs';
const http = axios.create({
  baseURL: 'https://supplys-main.herokuapp.com/api',
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
  //  const token = getToken();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGIxM2RiODUyNTk3Nzg4Yzg0NzNjMiIsInRva2VuX3RpbWUiOiIxNjMyNDg0NzEzMDU1IiwiaWF0IjoxNjMyNDg0NzEzfQ.0lU2QPKyLYP7Y-8ss7JTNvtNJYZ6-YHHKO7ng37iKCs';
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
