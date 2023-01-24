//libs
 import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

//src
 
//scss
import "./Loader.scss";

const Loader = ({ type, loaderImage, height, ...rest }) => {
  return (
    <div className="loading_style">
    <Box sx={{ display: 'flex', justifyContent: "center", padding: "200px" }}>
    <CircularProgress size ={60}/>
  </Box>
  </div>
  );
};

export default Loader;
