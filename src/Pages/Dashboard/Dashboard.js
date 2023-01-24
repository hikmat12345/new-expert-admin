//libs
 import React from "react";
 


//src
import history from "../../history";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";
import ServiceProvider from "../ServiceProvider";
 
//scss
import "./Dashboard.scss";
 

const Dashboard = ({ message, src, link }) => {
  return (
    <>
      <div className="container_center">
          <img height={500} width = {1050}  src={getImageOrVideoSrcFromPublicFolder("Dashboard_img.png")} alt={"logo"} />
       </div>
 
    </>
  );
};

export default Dashboard;
