import { fetchAction } from "../../fetchAction";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

export const getRoles = ({ callback }) => {
 return fetchAction({
  endpoint: `${APP_BASE_URL_4}/Roles/GetAllRoles`
  // endpoint: `${APP_BASE_URL_2}/UsersRole/GetUsersRole`
 
 }).then((res) => {
   const { code, roles } = res;
   console.log("res====>", res)
   code !== 0 ? callback([]) : callback(roles);
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


export const deleteRoles = ({ id, callback }) => {
  console.log("text===> ", id)

  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Roles/DeleteRole?RoleId=${id}`,
    verb: "DELETE",
  }).then((res) => {
    console.log(res)
    callback(res);
  });
};

export const searchRole = ({searchText, callback}) => {
  return fetchAction({
   endpoint: `${APP_BASE_URL_4}/Roles/SearchRole?name=${searchText}`,
    verb: "GET"
 }).then((res) => callback(res));
};