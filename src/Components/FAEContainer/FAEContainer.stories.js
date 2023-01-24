//libs
import React from "react";
import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";

//src
import { FAEContainer } from "./FAEContainer";

export default {
  title: "Components/FAEContainer",
  component: FAEContainer,
};

const Template = (args) => <FAEContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <FAEShadowBox style={{ width: "90%" }}>asdasd</FAEShadowBox>,
};
