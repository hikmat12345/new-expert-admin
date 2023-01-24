//libs
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Router } from "react-router-dom";

//src
import history from "./history";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import Routes from "./Routes";
import { UserContext } from "./Contexts/userContext";

//scss
import "./App.scss";

const App = () => {
  const [userId] = useContext(UserContext);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (userId === null) {
      localStorage.removeItem("isLogin");
    }
    setLoading(true)
  })
  useEffect(() => {
    (localStorage.getItem("isLogin") === null ||
      localStorage.getItem("isLogin") === "false") &&
      history.push({ pathname: "/login" });
  }, []);

  return (
    <>
    {loading &&
      <Router history={history}>
        {localStorage.getItem("isLogin") === "true" && <Navbar />}
        <div className="fae--admin-layout">
          {localStorage.getItem("isLogin") === "true"  && <SideBar />}
          <div style={{ width: "100%" }}>
            <Routes />
          </div>
        </div>
      </Router>
    }
    </>
  );
};

export default App;
