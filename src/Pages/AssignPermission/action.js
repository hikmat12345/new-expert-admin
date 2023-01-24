import { fetchAction } from "../../fetchAction";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

export const getComponents = ({ role_id, callback }) => {
 return fetchAction({
   endpoint: `${APP_BASE_URL_2}/UsersRole/GetComponents?RoleId=${role_id}`
 }).then((res) => {
   const { code, components } = res;
   code !== 0 ? callback([]) : callback(components);
 });
};

export const assignPermission = ({
  userId,
  list,
  callback,
}) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL_2}/UsersRole/AddPermissions`,
    verb: "POST",
    payload: JSON.stringify({
      userId:parseInt(userId),
      components:list,
    }),
  }).then((res) => callback(res));
};
