// ./utils/auth.js
import axios from "axios";

export const setupInterceptors = () => {
  axios.interceptors.request.use(
    config => {
      // eslint-disable-next-line
      config.headers = {
        ...config.headers,
        "content-type": "application/vnd.api+json",
        accessToken: localStorage.getItem("accessToken"),
        tokenTyppe: localStorage.getItem("tokenType")
      };
      return config;
    },
    error =>
      // Do something with request error
      Promise.reject(error)
  );

  axios.interceptors.response.use(
    response => {
      if (response.data["accessToken"]) {
        persistAuthHeadersInDeviceStorage(response.data);
      }

      return response;
    },
    function(error) {
      // Do something with response error
      if (error.response.status === 401) {
      }
      return Promise.reject(error);
    }
  );

  function persistAuthHeadersInDeviceStorage(data) {
    localStorage.setItem("accessToken", data["accessToken"]);
    localStorage.setItem("tokenType", data["tokenType"]);
    localStorage.setItem("content-type", data["content-type"]);
  }
};
