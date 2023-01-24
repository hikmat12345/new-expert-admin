import { createContext, useState, useEffect} from "react";
import { getCookies } from "../utils";

export const UserContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [userId, setUserId] = useState(getCookies("userId") ?? null);
  return (
    <UserContext.Provider value={[userId, setUserId]}>
      {console.log("in user context +++>>>", userId)}
      {children}
    </UserContext.Provider>
  );
};
