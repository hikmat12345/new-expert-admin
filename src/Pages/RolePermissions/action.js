import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

export const getAllMenus = ({ callback }) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Menu/GetAllMenus`
  }).then((res) => {
    // const { code, menuModels } = res;
    console.log("Response", res)
    callback(res);
  });
 };


export const saveRole = ({
  id,
  title,
  description,
  callback,
}) => {
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)

  let country = getCookies('country')
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Roles/AddRole`,
    verb: "POST",
    payload: JSON.stringify({
          title: title,
          description: description,
    

    }),
  }).then((res) => callback(res));
};


export const saveRolePermissions = ({
  roleId,
  permissions,
 
  callback,
}) => {
  let country = getCookies('country')
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Roles/AddRolePermissions`,
    verb: "POST",
    payload: JSON.stringify({
      roleId: roleId,
      permissions: permissions,
    

    }),
  }).then((res) => callback(res));
};
