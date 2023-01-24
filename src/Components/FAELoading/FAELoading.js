//libs
import React from "react";
import { FAEContainer } from "../FAEContainer/FAEContainer";

//src

//scss
import "./FAELoading.scss";

export const FAELoading = ({
  small,
  loaderImage,
  justify,
  align,
  className = "",
  height = "",
  type = "",
  ...rest
}) => {
  return (
    <FAEContainer justify={justify} align={align}>
      <div
        className={`fae--loader-main-container ${className}`}
        {...rest}
        style={{ height: height }}
      >
        {small ? (
          type === "video" ? (
            <video
              muted
              autoPlay
              loop
              playsInline
              type="video/mp4"
              width="100%"
              height="100px"
              src= 'https://image.similarpng.com/very-thumbnail/2021/07/Loading-icon-in-red-color-on-transparent-background-PNG.png'
              className="fae--loader-image-small"
              alt="loader"
            />
          ) : (
            <img
              className="fae--loader-image-small"
              src= "https://image.similarpng.com/very-thumbnail/2021/07/Loading-icon-in-red-color-on-transparent-background-PNG.png"
              alt="loader"
            />
          )
        ) : type === "video" ? (
          <video
            muted
            autoPlay
            loop
            playsInline
            type="video/mp4"
            width="100%"
            height="100px"
            src= 'https://image.similarpng.com/very-thumbnail/2021/07/Loading-icon-in-red-color-on-transparent-background-PNG.png'
            alt="loader"
          />
        ) : (
          <img src= "https://image.similarpng.com/very-thumbnail/2021/07/Loading-icon-in-red-color-on-transparent-background-PNG.png" alt="loader" width="100%" height="100px" />
        )}
      </div>
    </FAEContainer>
  );
};
