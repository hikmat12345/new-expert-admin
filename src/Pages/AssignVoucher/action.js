import { fetchAction } from "../../fetchAction";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

export const GetBusinessStaff = ({ userId, callback }) => {
 return fetchAction({
   endpoint: `${APP_BASE_URL_2}/UsersRole/GetBusinessStaff?BusinessId=${userId}`
 }).then((res) => {
   const { code, businessStaff } = res;
   code !== 0 ? callback([]) : callback(businessStaff);
 });
};


export  const GetUser = ({ userCaller, callback }) => {  
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Voucher/GetUser?id=${userCaller}`
  }).then((res) => {
    // console.log("new one==>", res.result.users[0])
     
    // res.code !== 0 ? callback([]) : 
    callback(res);
  });
 };

 export const AssignUserVoucher = ({
  voucherId,
  assigneeId,
  callback,
}) => {
  console.log(voucherId,assigneeId, "flag")
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/Voucher/AddAssignee`,
    verb: "POST",
    payload: JSON.stringify({
      voucherId: voucherId,
      assigneeId:assigneeId,
    }),
  }).then((res) => callback(res));
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
