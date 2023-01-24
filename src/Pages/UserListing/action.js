import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

export const getAllUsers = ({ callback }) => {
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


export const removeUser = ({ id, callback }) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Users/RemoveUser?id=${id}`,
    verb: "DELETE",
  }).then((res) => {
    console.log(res)
    callback(res);
  });
};

export const searchUser = ({searchText, callback}) => {
  console.log("text===> ", searchText)
  return fetchAction({
   endpoint: `${APP_BASE_URL_4}/Users/SearchUser?text=${searchText}`,

  //  `${APP_BASE_URL_4}/Voucher/SearchVouchers?id=${171}&text=${searchText}`,
   verb: "GET"
 }).then((res) => callback(res));
};
