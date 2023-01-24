 import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";
 


const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
 




export const getCountries = ({ callback }) => {
  return fetchAction({
    endpoint: `${APP_BASE_URL}/Country`,
  }).then((res) => {
    const { countrylist, error } = res;
    error ? callback([]) : callback({ countrylist });
  });
};

 
 


 