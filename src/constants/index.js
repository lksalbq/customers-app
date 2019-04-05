var url = "";

if (process.env.NODE_ENV === "development") {
  //API
  url = "http://localhost:8080";
} else if (process.env.NODE_ENV === "production") {
  //PRODUCTION ****
  //***** */
  //API
  url = "https://customer-api-mrnt.herokuapp.com";
}

export const authUrl = `${url}/api/auth`;
export const customersUrl = `${url}/api/customers`;

/// MESSAGE TYPES
export const SUCCESS_MESSAGE = "success";
export const ERROR_MESSAGE = "error";
export const WARN_MESSAGE = "warn";
