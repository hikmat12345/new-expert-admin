import { fetchAction } from "../../fetchAction";
import { getCookies } from "../../utils";

  const APP_BASE_URL_4 = process.env.REACT_APP_BASE_URL_4;

 


 

 

export const saveRole = ({
  id,
  title,
  description,
 
  callback,
}) => {
  
  return fetchAction({
    // endpoint: `${APP_BASE_URL_4}/Roles/AddRole`,
    endpoint: `${APP_BASE_URL_4}/Roles/AddRole?Name=${title}&Description=${description}`,
    
    verb: "POST",
    payload: JSON.stringify({
          title,
          description,
    

    }),
  }).then((res) => callback(res));
};
