import { fetchAction } from "../../fetchAction";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

export const GetBusinessStaff = ({ userId, callback }) => {
 return fetchAction({
   endpoint: `${APP_BASE_URL_2}/UsersRole/GetBusinessStaff?BusinessId=${userId}`
 }).then((res) => {
   const { code, businessStaff } = res;
   code !== 0 ? callback([]) : callback(businessStaff);
 });
};

export const AssignUserRole = ({
  role_id,
  list,
  callback,
}) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL_2}/UsersRole/AddBusinessStaffRole`,
    verb: "POST",
    payload: JSON.stringify({
      roleId:parseInt(role_id),
      staffs:list,
    }),
  }).then((res) => callback(res));
};
