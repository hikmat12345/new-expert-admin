import { toast } from "react-toastify";
import history from "./history";

export const fetchAction = (action) => {
  const { endpoint, headers, payload, verb } = action;
  const result = new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: verb,
      headers: contentType === "multipart"
      ? {
          mode: "no-cors",
          Authorization: isBearer? `bearer ${process.env.REACT_APP_BEARER_TOKEN}` : `Basic ${Buffer.from(
            `${process.env.REACT_APP_USER_NAME}:${process.env.REACT_APP_PASSWORD}`
          ).toString("base64")}`,
          "Access-Control-Allow-Origin": "*",
        }
      : contentType === "includeBearer"
       ? { 
          "Content-Type": "application/json",
          mode: "no-cors",
          Authorization: `bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          "Access-Control-Allow-Origin": "*",
          ...actionInfo.headers,
        }
        :{
          "Content-Type": "application/json",
          mode: "no-cors",
          Authorization: `Basic ${Buffer.from(
            `${process.env.REACT_APP_USER_NAME}:${process.env.REACT_APP_PASSWORD}`
          ).toString("base64")}`,
          "Access-Control-Allow-Origin": "*",
          ...actionInfo.headers,
        },
      body: payload,
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((error) => 
         history.push("/not-found"),
      // toast.error("Internal server error")
      );
  });
  return result;
};
