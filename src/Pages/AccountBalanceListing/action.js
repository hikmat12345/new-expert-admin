import { fetchAction } from "../../fetchAction";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

export const getBusiness = ({ callback }) => {
    return fetchAction({
      endpoint: `${APP_BASE_URL_2}/AccountBalanceSetting/getall?pagenumber=1&pagesize=1`,
    }).then((res) => {
      const { result, error } = res;
      error ? callback([]) : callback({ result });
    });
  };