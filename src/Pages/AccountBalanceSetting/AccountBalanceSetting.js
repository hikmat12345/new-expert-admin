// libs
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FAETextField,
  FAEAutoComplete,
  FAEButton,
} from "@findanexpert-fae/components";

// src
import history from "../../history";

// scss
import "./AccountBalanceSetting.scss";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";

const AccountBalanceSetting = () => {
  const location = useLocation();

  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState(location.state ? null : "");
  const [threshold, setThreshold] = useState(location.state ? null : "");
  const [accountLimit, setAccountLimit] = useState(location.state ? null : "");
  const [withdrawLimitPerDay, setWithdrawLimitPerDay] = useState(
    location.state ? null : ""
  );
  const [withdrawLimitPerMonth, setWithdrawLimitPerMonth] = useState(
    location.state ? null : ""
  );

  useEffect(() => {
    // console.log(location.state.id)
    if (location.state) {
      fetch(
        `${process.env.REACT_APP_BASE_URL_2}/AccountBalanceSetting/getbyid?id=${location.state.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          const {
            accountnumber,
            threshold,
            accountlimit,
            withdrawlimitperday,
            withdrawlimitpermonth,
          } = data.result[0];
          setBusiness(accountnumber);
          setThreshold(threshold.toString());
          setAccountLimit(accountlimit.toString());
          setWithdrawLimitPerDay(withdrawlimitperday.toString());
          setWithdrawLimitPerMonth(withdrawlimitpermonth.toString());
        });
    }
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASE_URL_2}/AccountBalanceSetting/mainbusiness`
    )
      .then((response) => response.json())
      .then((data) => setBusinesses(data.result));
  }, []);

  const handleChangeBusiness = (value) => {
    setBusiness(value);
  };
  const handleChangeThreshold = (value) => {
    setThreshold(value);
  };
  const handleChangeAccountLimit = (value) => {
    setAccountLimit(value);
  };
  const handleChangeWithdrawLimitPerDay = (value) => {
    setWithdrawLimitPerDay(value);
  };
  const handleChangeWithdrawLimitPerMonth = (value) => {
    setWithdrawLimitPerMonth(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      !location.state
        ? `${process.env.REACT_APP_BASE_URL_2}/AccountBalanceSetting/AddAccountBalanceSettings`
        : `${process.env.REACT_APP_BASE_URL_2}/AccountBalanceSetting/updateaccountbalancesettings`,
      {
        method: location.state ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: location.state ? location.state.id : 0,
          accountnumber: business,
          threshold: Number(threshold),
          accountlimit: Number(accountLimit),
          withdrawlimitperday: Number(withdrawLimitPerDay),
          withdrawlimitpermonth: Number(withdrawLimitPerMonth),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(history.goBack());
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="account-balance-setting-container">
        <div className="account-balance-setting-wrapper">
          <FAEText subHeading bold align="center">
            Account Balance Setting
          </FAEText>
          <form
            className="account-balance-setting-form dpt dpb"
            onSubmit={handleSubmit}
          >
            {(business || !location.state) && (
              <FAEAutoComplete
                label="Select Business"
                placeholder="Select Business"
                required
                disabled
                values={
                  !location.state
                    ? businesses.map((business) => ({
                        label: business.businessname,
                        value: business.accountnumber,
                      }))
                    : []
                }
                value={
                  business && {
                    label: business,
                    value: business,
                  }
                }
                getSelectedValue={handleChangeBusiness}
              />
            )}
            {(threshold || threshold === "" || !location.state) && (
              <FAETextField
                getValue={handleChangeThreshold}
                value={threshold ? threshold : ""}
                placeholder="Threshold"
                label="Threshold"
                type="number"
                required
              />
            )}
            {(accountLimit || accountLimit === "" || !location.state) && (
              <FAETextField
                getValue={handleChangeAccountLimit}
                value={accountLimit ? accountLimit : ""}
                placeholder="Account Limit"
                label="Account Limit"
                type="number"
                required
              />
            )}
            {(withdrawLimitPerDay ||
              withdrawLimitPerDay === "" ||
              !location.state) && (
              <FAETextField
                getValue={handleChangeWithdrawLimitPerDay}
                value={withdrawLimitPerDay ? withdrawLimitPerDay : ""}
                placeholder="Withdraw Limit Per Day"
                label="Withdraw Limit Per Day"
                type="number"
                required
              />
            )}
            {(withdrawLimitPerMonth ||
              withdrawLimitPerMonth === "" ||
              !location.state) && (
              <FAETextField
                getValue={handleChangeWithdrawLimitPerMonth}
                value={withdrawLimitPerMonth ? withdrawLimitPerMonth : ""}
                placeholder="Withdraw Limit Per Month"
                label="Withdraw Limit Per Month"
                type="number"
                required
              />
            )}
            {location.state ? (
              <FAEButton>Update</FAEButton>
            ) : (
              <FAEButton>Submit</FAEButton>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountBalanceSetting;
