//libs
import React, { useState, useEffect } from "react";
import {
  // FAESelect,
  FAEText,
  FAEDatePicker,
  FAETextField,
  FAERadioGroup,
  FAEAutoComplete,
  FAEButton,
} from "@findanexpert-fae/components";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MultiSelect } from "react-multi-select-component";
import MuiPhoneNumber from 'material-ui-phone-number';




//src
import { addZeroToDate, formatDate, getCookies, getImageOrVideoSrcFromPublicFolder } from "../../utils";
import history from "../../history";
import { getCountries, getDiscountById, getServices, saveDiscount, updateDiscount } from "./action";


//scss
import "./AddDiscountCode.scss";

const AddDiscountCode = () => {
  const location = useLocation();
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)
  // console.log("location+++???", location)

  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [type, setType] = useState("P");
  const [email, setEmail] = useState(location.state ? null : "");
  const [discountCode, setDiscountCode] = useState(location.state ? null : "");
  // const [createdByEmail, setCreatedByEmail] = useState(user.email);
  const [amount, setAmount] = useState(location.state ? null : "");
  const [title, setTitle] = useState(location.state ? null : "");
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState(location.state ? null : "");
  const [minAmount, setMinAmount] = useState(location.state ? null : "");
  const [expiryDate, setExpiryDate] = useState("");
  const [selected, setSelected] = useState([]);

  toast.configure();

  const handleChangeType = (e) => { console.log("val==>", e.target.value); setType(e.target.value); };
  const handleChangeCountry = (value) => { setCountry(value); };
  const handleChangeEmail = (value) => { setEmail(value); };
  const handleChangeDiscountCode = (value) => { setDiscountCode(value); };
  const handleChangeTitle = (value) => { setTitle(value); };
  const handleChangePhone = (value) => { console.log(value); setPhone(value); };
  const handleChangeAmount = (value) => { setAmount(value); };
  const handleChangeMinAmount = (value) => { setMinAmount(value); };
  const handleChangeExpiryDate = (value) => {
    const expiryDate = `${value.year}-${value.month}-${value.day}`;
    setExpiryDate(expiryDate);
  };


  useEffect(() => {
    // console.log("update===>", location.state.id)
    if (location.state) {
      var id = location.state.id;
      getDiscountById({
        id,
        callback: (data) => {
          console.log("inside callback==> ", data.result.discountCodeModels[0])
          const { title, amount, type, countryId, minAmount, expiryDate, createdForEmail, dCode, percentageDiscount, amountDiscount, createdForPhone } = data.result.discountCodeModels[0];
          setTitle(title);
          setAmount(percentageDiscount);
          setType(type.trim());
          setCountry(countryId);
          setMinAmount(minAmount);
          setExpiryDate(expiryDate);
          setEmail(createdForEmail);
          setPhone(createdForPhone);
          setDiscountCode(dCode);
        }
      })
    }
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.state) {
      updateDiscount({
        id: location.state.id,
        expiryDate: expiryDate != "" ? new Date(addZeroToDate(expiryDate)).toISOString() : new Date(),



        callback: (data) => {
          // alert(data.message);
          if (data.error) {
            toast.error(data.message)
          }
          else {
            // toast.success("Record Created successfully")
            toast.success(data.message)
            history.push('/discount-codes')
          }
        }
      })

    }
    else  {
      saveDiscount({
        // id: location.state ? location.state.id : 0,
        title,
        amount: Number(amount),
        type,
        // countryId: Number(country),
        minAmount: Number(minAmount),
        expiryDate: expiryDate != "" ? new Date(addZeroToDate(expiryDate)).toISOString() : new Date(),
        email,
        phone: phone,
        discountCode,
 

        callback: (data) => {
          // alert(data.message);
          if (data.error) {
            toast.error(data.message)
          }
          else {
            // toast.success("Record Created successfully")
            toast.success(data.message)
            history.push('/discount-codes')
          }
        }
      })

    }

  };



  return (
    <>



      <div className="addDiscount_title">
        <FAEText subHeading >
          {location.state ? "Update Discount code" : 'Create New Discount'}
        </FAEText>
      </div>


      <div className="addDiscount_container">

        <form
          className=" "
          onSubmit={handleSubmit}
        >
          {/* {console.log(location.state.id)} */}

          <div className="addDiscount_row">

            {(title || title === "" || !location.state) && (
              <FAETextField
                getValue={handleChangeTitle}
                value={title ? title : ""}
                placeholder="Enter Title"
                label="Discount Title"
                disabled={location.state}
                required
              />
            )}


            <div className="dropdown_outer">
              <FAEText>Discount Type</FAEText>
              <select disabled={location.state} name="select" className="select_style" onChange={handleChangeType}>

                <option value='P'>Percentage</option>
                <option value='A'>Amount</option>
              </select>
            </div>
          </div>

          <div className="addDiscount_row">
                          {/* {"min amount ===" + amount} */}


            {/* {(amount || amount === "" || !location.state) && ( */}
            <FAETextField
              getValue={handleChangeAmount}
              value={amount ? amount : ""}
              placeholder={type === "P" ? " Enter Discount Percentage" : "Enter Discount amount"}
              label={type === "P" ? "Discount Percentage(%)" : "Discount Amount"}
              type="number"
              disabled={location.state}
              required
            />
            {/* )} */}

            {(discountCode || discountCode === "" || !location.state) && (
              <FAETextField
                getValue={handleChangeDiscountCode}
                value={discountCode ? discountCode : ""}
                placeholder="Enter Discount code"
                label="Discount code"
                disabled={location.state}
                required
              />
            )}
          </div>

          <div className="addDiscount_row">
          {/* {console.log(minAmount === null ? "min amount ===" + minAmount : "sadadasdasd")} */}

            {(
              <FAETextField
                getValue={handleChangeMinAmount}
                value={minAmount !== null ? minAmount : ""}
                placeholder="Enter Minimum amount"
                label="Minimum Amount"
                type="number"
                disabled={location.state}
                required
              />
            )}

            {(expiryDate || !location.state) && (
              <FAEDatePicker
                label="Expiry date"
                minimumDate={new Date()}
                value={
                  expiryDate ? formatDate(new Date(expiryDate).toString()) : null
                }

                getSelectedDate={handleChangeExpiryDate}
                dateFormat={(date) =>
                  `${date.year}-${date.month < 10 ? 0 : ""}${date.month}-${date.day < 10 ? 0 : ""
                  }${date.day}`
                }
              />

            )}

            {/* <FAEDatePicker
              label="Expiry date"
              minimumDate = {new Date()}
              value={
                expiryDate ? formatDate(new Date(expiryDate).toString()) : null
              }
              
              getSelectedDate={handleChangeExpiryDate}
              dateFormat={(date) =>
                `${date.year}-${date.month < 10 ? 0 : ""}${date.month}-${
                  date.day < 10 ? 0 : ""
                }${date.day}`
              }
            /> */}

          </div>
          <div style={{ margin: "20px 0px 15px 0px" }}><hr /></div>
          <FAEText bold>Created For</FAEText>

          <div className="addDiscount_row">

            {(email || email === "" || !location.state) && (
              <FAETextField
                getValue={handleChangeEmail}
                value={email ? email : ""}
                placeholder="Enter email"
                label="Email"
                type="email"
                disabled={location.state}
                required
              />
            )}

            {(phone || phone === "") && (
              <div className="phone_inputWidth">
                <FAEText>Phone Number</FAEText>

                {
                  // location.state ? <div>{phone}</div> : 
                  <MuiPhoneNumber disabled={location.state} defaultCountry="pk" value={phone} onChange={handleChangePhone} />}
              </div>


              // <FAETextField
              //   getValue={handleChangePhone}
              //   value={phone ? phone : ""}
              //   placeholder="Enter description"
              //   label="Description"
              //   type = "number"
              //   disabled = {location.state}
              //   required
              // />
            )}
          </div>


          <div style={{ textAlign: "right", padding: "20px" }}><FAEButton  className = "btn_gray_bg" onClick = {() => history.push('/discount-codes')}>Cancel</FAEButton> <FAEButton className = "btn_org_bg">Save</FAEButton></div>

        </form>
      </div>
    </>
  );
};

export default AddDiscountCode;
