//libs
import { FAEPageNotFound } from "@plexaar/components";
import React from "react";

//src
import history from "../../history";
import { getFileSrcFromPublicFolder, getImageOrVideoSrcFromPublicFolder } from "../../utils";

//scss
import "./NotFound.scss";

const NotFound = ({ message, src, link }) => {
  return (
    <>
      <div style={{margin: "-60px 0px 0px 0px"}}>
        <FAEPageNotFound
          src={src ?? getImageOrVideoSrcFromPublicFolder("not_found.png")}
          // <img height={600} width = {1250}  src={getImageOrVideoSrcFromPublicFolder("Dashboard_img.png")} alt={"logo"} />

          message={message ?? "Page Not Found!"}
          linkText={link ?? "< Return To Home"}
          onClick={() => history.push("/")}
          width={window.screen.width < 700 ? "100%" : "50%"}
        />
      </div>
    </>
  );
};

export default NotFound;
