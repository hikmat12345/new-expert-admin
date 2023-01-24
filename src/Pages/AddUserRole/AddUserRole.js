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



//src
import { addZeroToDate, formatDate, getCookies, getImageOrVideoSrcFromPublicFolder } from "../../utils";
import history from "../../history";
import { getVouchersById, getCountries, getServices, saveVoucher, saveRole } from "./action";


//scss
import "./AddUserRole.scss";

const AddUserRole = () => {
  const location = useLocation();
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)
 
 
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
    
  toast.configure();













   
  const handleChangeTitle = (value) => { setTitle(value); console.log("Vlllll", value)};
  const handleChangeDesc = (value) => { setDescription(value); console.log("value", value) };

  





  const handleSubmit = (e) => {
    e.preventDefault();
    saveRole({
        // id: location.state ? location.state.id : 0,
        title,
        description,
      

        callback: (data) => {
           if (data.error) {
            toast.error(data.message)
          }
          else {
             toast.success(data.message)
            history.push({pathname: '/role-permission', state: {id: data.code}})
          }
        }
      })

 
  };



  return (
    <>
      <div className="container_breadcrums">
 
        <img
          // height={150}
          width={300} src={getImageOrVideoSrcFromPublicFolder("a.svg")} alt={"logo"} />



        <div className="container_center">


          <div className="add_userRole">
            <div className="pageName_div">
              <FAEText subHeading>
                {'Add User Role'}
              </FAEText>
            </div>
            <form
              className=" "
              onSubmit={handleSubmit}
            >


              <div className=" ">


              
                  <FAETextField
                    getValue={handleChangeTitle}
                    value={title}
                    placeholder="Enter name"
                    label="Name"
                    required
                  />
                 

                
                  <FAETextField
                    getValue={handleChangeDesc}
                    value={description}
                    placeholder="Enter description"
                    label="Description"
                    required
                  />
               



              </div>

              <div style={{ textAlign: "center" }}><FAEButton>Save</FAEButton></div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserRole;
