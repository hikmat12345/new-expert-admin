// libs
import React from "react";

// src
import { FAELoading } from "./FAELoading";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";

export default {
  title: "Components/FAELoading",
  component: FAELoading,
};

const Template = (args) => <FAELoading {...args} />;

export const Default = Template.bind({});
Default.args = {
  small: false,
  loaderImage: getImageOrVideoSrcFromPublicFolder("loader.webm"),
  height: "200px",
  type: "video",
};
