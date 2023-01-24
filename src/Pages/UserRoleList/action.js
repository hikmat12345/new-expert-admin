import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

export const getUsers = ({ callback }) => {
 return fetchAction({
   endpoint: `${APP_BASE_URL_4}/Users/GetAllUser`
 }).then((res) => {
   const { code, newUsersModel } = res;
   console.log("Response", newUsersModel)
   code !== 0 ? callback([]) : callback(newUsersModel);
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


export const roleAssign = ({ roleId, userId, callback }) => {
  console.log("in action",roleId, userId)
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Roles/AssignRole?RoleId=${roleId}&UserId=${userId}`,
    // endpoint: `${APP_BASE_URL_4}/Roles/AssignRole`,
    verb: "POST",
    // payload: JSON.stringify({
    //   "RoleId": roleId,
    //   "UserId": userId
    // }),
  }).then((res) => {
    console.log("asdf====",res)
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
