// lib
import React from "react";
import { useState,useContext } from "react";
import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";
import { FAETextField } from "@findanexpert-fae/components/dist/stories/FAETextField/FAETextField";

// src
import { UserContext } from "../../Contexts/userContext";
// scss
import "./Login.scss";
import { setCookies } from "../../utils";

const Login = () => {
  
  const [userId, setUserId] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (value) => {
    setEmail(value);
    error && setError("");
  };

  const handleChangePassword = (value) => {
    setPassword(value);
    error && setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://expertcrmapi-dev.findanexpert.net/api/SignIn/SignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        accountNumber: "",
        mobileNumber: "",
        forceLogout: true,
        isMobile: false,
        deviceId: "web",
        devicePlatform: "web",
        deviceName: "web",
        macAddress: "web",
        pushToken: "web"
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.message);
        } else if (!data.error) {
          localStorage.setItem("isLogin", true);
          setCookies("userId", data.result.id);
          setCookies("user", data.result);

          setUserId(data.result.id)
          console.log(data.result.id)
          // window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <img src="" alt="" />
          <FAEText className="login-title">Welcome to Plexaar</FAEText>
          <form className="login-form" onSubmit={handleSubmit}>
            <FAETextField
              getValue={handleChangeEmail}
              placeholder="Email"
              type="email"
              required
              className="login-field"
            />
            <FAETextField
              getValue={handleChangePassword}
              placeholder="Password"
              type="password"
              required
              className="login-field"
            />
            <a href="/" className="login-forgot-password">
              Forgot Password?
            </a>
            <FAEText className="login-error-message">{error && error}</FAEText>
            <FAEButton className="login-btn">LOGIN</FAEButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
