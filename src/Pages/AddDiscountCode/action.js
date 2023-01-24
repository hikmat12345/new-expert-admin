import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

export const getCountries = ({ callback }) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL}/Country`,
  }).then((res) => {
    const { countrylist, error } = res;
    error ? callback([]) : callback({ countrylist });
  });
};


export const getDiscountById = ({id,callback}) => {
    return fetchAction({
      endpoint: `${APP_BASE_URL_4}/DiscountCode/GetDiscountCodeById/${id}`,
      verb: "GET"
    }).then((res) => callback(res));
};


export const getServices = ({callback}) => {
    return fetchAction({
      endpoint: `${APP_BASE_URL_2}/Providers/GetServiceTypes`,
    }).then((res) => callback(res));
};


export const saveDiscount = ({
  id,
  title,
  amount,
  type,
  countryId,
  serviceId,
  minAmount,
  expiryDate,
  email,
  phone,
  numOfVouchers,
  callback,
  discountCode
}) => {
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)

  let country = getCookies('country')
  return fetchAction({
    endpoint: `${APP_BASE_URL_4}/DiscountCode/AddDiscountCode`,
    // endpoint: id>0 ? `${APP_BASE_URL_2}/Voucher/UpdateVoucher`:`${APP_BASE_URL_2}/Voucher/AddVoucher`,
    verb: "POST",
    payload: JSON.stringify({
          // voucherId: id>0 ? id : 0,
          title: title,
          amount: amount,
          type: type,
          countryId: country.id,
          // user.countryId,
          // serviceIds: serviceId.toString(),
          minAmount,
          expiryDate: expiryDate,
          createdForEmail: email,
          createdForPhone: phone,
          dCode: discountCode,
          createdBy: id > 0 ? 0 : user.id,
          modifiedBy: id> 0 ? user.id : 0,
          percentageDiscount: type === "P" ? amount : 0,
          amountDiscount: type === "A" ? amount : 0
          // noOfVouchers: numOfVouchers,

    }),
  }).then((res) => callback(res));
};


export const updateDiscount = ({
  id,
  expiryDate,
  callback,
  
}) => {
   

   return fetchAction({
    endpoint: `${APP_BASE_URL_4}/DiscountCode/UpdateDiscountCode`,
    verb: "PUT",
    payload: JSON.stringify({
          id: id,
          expiryDate: expiryDate,
    }),
  }).then((res) => callback(res));
};

