import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

export const getDiscounts = ({ callback }) => {
 return fetchAction({
   endpoint: `${APP_BASE_URL_4}/DiscountCode/GetAllDiscountCode?CountryId=${getCookies('country').id}`
 }).then((res) => {
   const { code, discountCodeModels } = res.result;
   console.log("Response", discountCodeModels)
   code !== 0 ? callback([]) : callback(discountCodeModels);
 });
};

export const addRoles = ({
  name,
  description,
  callback,
}) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL_2}/UsersRole/AddUsersRole`,
    verb: "POST",
    payload: JSON.stringify({
      "name": name,
      "description": description
    }),
  }).then((res) => callback(res));
};


export const getAssignedUser = ({ id, callback }) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Roles/GetUsersInRole?RoleId=${id}`,
    verb: "GET",
  }).then((res) => {
    console.log(res)
    callback(res);
  });
};

export const searchDiscountCode = ({searchText, callback}) => {
  console.log("text===> ", searchText)
  return fetchAction({
   endpoint: 
   `${APP_BASE_URL_4}/Voucher/SearchVouchers?id=${171}&text=${searchText}`,
   verb: "GET"
 }).then((res) => callback(res));
};
