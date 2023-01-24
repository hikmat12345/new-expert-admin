import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";



const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
console.log("APP_BASE_URL_2 ==> ", APP_BASE_URL_2)
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;
console.log("APP_BASE_URL_4", APP_BASE_URL_4)

// let tempUser = getCookies('user');
// let userObj = JSON.stringify(tempUser)
// let user = JSON.parse(userObj)
 

let country = getCookies('country');
let countryId = (getCookies('country') !== null && getCookies('country') !== undefined) ? country.id : 171
// console.log("country==--->>>", country.id)






export const getCountries = ({ callback }) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL}/Country`,
  }).then((res) => {
    const { countrylist, error } = res;
    error ? callback([]) : callback({ countrylist });
  });
};


// export const getVouchers = ({callback}) => {
//      return fetchAction({
//       endpoint: `${APP_BASE_URL_2}/Voucher/Get`,
//       verb: "GET"
//     }).then((res) => callback(res));
// };

export const getVouchers = ({callback}) => {
  return fetchAction({
   endpoint: 
   `${APP_BASE_URL_4}/Voucher/GetByCountryId/${countryId}`,
   verb: "GET"
 }).then((res) => callback(res));
};

export const applyFilterVouchers = ({status, callback}) => {
  console.log("statis===> ", status)
  return fetchAction({
   endpoint: 
   `${APP_BASE_URL_4}/Voucher/${status === "Active" ? "GetActiveVouchers" : status === "Used" ? "GetUsedVouchers": status === "Expired" ? "GetExpiredVouchers" : ""}?id=${countryId}`,
   verb: "GET"
 }).then((res) => callback(res));
};

export const searchVoucher = ({searchText, callback}) => {
  console.log("text===> ", searchText)
  return fetchAction({
   endpoint: 
   `${APP_BASE_URL_4}/Voucher/SearchVouchers?id=${countryId}&text=${searchText}`,
   verb: "GET"
 }).then((res) => callback(res));
};



export const getVouchersByCountryId = ({callback}) => {
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)
  
   return fetchAction({
    endpoint: `${APP_BASE_URL_2}/Voucher/Get/${countryId}`,
    verb: "GET"
  }).then((res) => callback(res));
};



export const deleteVouchers = ({id,callback}) => {
    return fetchAction({
      endpoint: `${APP_BASE_URL_2}/Voucher/DeleteVoucher?id=${id}`,
      verb: "DELETE"
    }).then((res) => callback(res));
};