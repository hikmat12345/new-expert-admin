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
import { getCountries, getDiscountById, getServices, saveDiscount, saveUser, updateDiscount } from "./action";


//scss
import "./AddUser.scss";
import { getRoles } from "../RolesListing/action";

const AddUser = () => {
  const location = useLocation();
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)
  // console.log("location+++???", location)

     const [email, setEmail] = useState(location.state ? null : "");
  const [lastName, setLastName] = useState(location.state ? null : "");
  const [amount, setAmount] = useState(location.state ? null : "");
  const [firstName, setFirstName] = useState(location.state ? null : "");
   const [phone, setPhone] = useState(location.state ? null : "");
  const [rolId, setRolId] = useState(location.state ? null : "");
  const [password, setPassword] = useState(location.state ? null : "");
  const [userName, setUserName] = useState("");
  const [userRoles, setUserRoles] = useState("");

  toast.configure();

  const handleChangeFirstName = (value) => { setFirstName(value); };
  const handleChangeLastName = (value) => { setLastName(value); };
  const handleChangeUserName = (value) => { setUserName(value); };
  const handleChangeRole = (e) => { console.log("val==>", e.target.value); setRolId(e.target.value); };
  const handleChangeEmail = (value) => { setEmail(value); };
  const handleChangePhone = (value) => { console.log(value); setPhone(value); };
  const handleChangePassword = (value) => { setPassword(value); };
 
  useEffect(() => {
    setTimeout(() => {
      getRoles({
        callback: (res) => {
          console.log("User==>", res)

          setUserRoles(res)
        }
      })
    }, 500);
  }, [])


  useEffect(() => {
    // console.log("update===>", location.state.id)
    if (location.state) {
      var id = location.state.id;
      // getDiscountById({
      //   id,
      //   callback: (data) => {
      //     console.log("inside callback==> ", data.result.discountCodeModels[0])
      //     const { title, amount, type, countryId, minAmount, expiryDate, createdForEmail, dCode, percentageDiscount, amountDiscount, createdForPhone } = data.result.discountCodeModels[0];
      //     setTitle(title);
      //     setAmount(percentageDiscount);
      //     setType(type.trim());
      //     setCountry(countryId);
      //     setMinAmount(minAmount);
      //     setExpiryDate(expiryDate);
      //     setEmail(createdForEmail);
      //     setPhone(createdForPhone);
      //     setDiscountCode(dCode);
      //   }
      // })
    }
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.state) {
      updateDiscount({
        // id: location.state.id,
        // expiryDate: expiryDate != "" ? new Date(addZeroToDate(expiryDate)).toISOString() : new Date(),
        callback: (data) => {
          // alert(data.message);
          if (data.error) {
            toast.error(data.message)
          }
          else {
            // toast.success("Record Created successfully")
            toast.success(data.message)
            history.push('/users')
          }
        }
      })

    }
    else  {
      saveUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        mobile: phone,
        password: password,
        roleId: rolId,
        
 

        callback: (data) => {
          // alert(data.message);
          if (data.error) {
            toast.error(data.message)
          }
          else {
            // toast.success("Record Created successfully")
            toast.success(data.message)
            history.push('/users')
          }
        }
      })

    }

  };



  return (
    <>



      <div className="addDiscount_title">
        <FAEText subHeading >
          {location.state ? "Update User" : 'Create New User'}
        </FAEText>
      </div>


      <div className="addDiscount_container">

        <form
          className=" "
          onSubmit={handleSubmit}
        >
          {/* {console.log(location.state.id)} */}

          <div className="addDiscount_row">

            {(firstName || firstName === "" || !location.state) && (
              <FAETextField
                getValue={handleChangeFirstName}
                value={firstName ? firstName : ""}
                placeholder="Enter First Name"
                label="First Name"
                // disabled={location.state}
                required
              />
            )}

{(lastName || lastName === "" || !location.state) && (
              <FAETextField
                getValue={handleChangeLastName}
                value={lastName ? lastName : ""}
                placeholder="Enter Last Name"
                label="Last Name"
                disabled={location.state}
                required
              />
            )}
           
          </div>


          <div className="addDiscount_row">
                          
            <FAETextField
              getValue={handleChangeUserName}
              value={userName ? userName : ""}
              placeholder={"Enter User Name"}
              label={"User name"}
              // type="number"
              // disabled={location.state}
              required
            />
 
 <div className="dropdown_outer">
              <FAEText>User Roll</FAEText>
              <select disabled={location.state} name="select" className="select_style" onChange={handleChangeRole}>
              <option value='P'>Select</option>
              {userRoles !== "" && userRoles.map((role, index) => (
                <option key = {role.id} value = {role.id}>{role.name}</option>
              ))
                 }
               </select>
            </div>
          </div>

          
     

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

 
            )}

           

          </div>
          <div style={{width: "50%"}}>
          {(password || password === "" || !location.state) && (
              <FAETextField
                getValue={handleChangePassword}
                value={password ? password : ""}
                placeholder="Enter password"
                label="Password"
                // type="t"
                disabled={location.state}
                required
              />
            )}
          </div>


          <div style={{ textAlign: "right", padding: "20px" }}><FAEButton  className = "btn_gray_bg" onClick = {() => history.push('/discount-codes')}>Cancel</FAEButton> <FAEButton className = "btn_org_bg">Save</FAEButton></div>

        </form>
      </div>
    </>
  );
};

export default AddUser;
