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
// import Multiselect from 'multiselect-react-dropdown';
// import MultiSelect from "@khanacademy/react-multi-select";



//src
import { addZeroToDate, formatDate, getCookies, getImageOrVideoSrcFromPublicFolder } from "../../utils";
import history from "../../history";
import { getVouchersById,getCountries, getServices, saveVoucher } from "./action";


//scss
import "./CreateOrEditVoucher.scss";

const CreateOrEditVoucher = () => {
  const location = useLocation();
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)
  // console.log("location+++???", location)

  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [type, setType] = useState(location.state ? "" : "G");
  const [email, setEmail] = useState(location.state ? null : "");
  const [numOfVouchers, setNumOfVouchers] = useState(location.state ? null : "");
  // const [createdByEmail, setCreatedByEmail] = useState(user.email);
  const [amount, setAmount] = useState(location.state ? null : "");
  const [title, setTitle] = useState(location.state ? null : "");
  const [country, setCountry] = useState(null);
  const [service, setService] = useState('');
  const [minPrice, setMinPrice] = useState(location.state ? null : "");
  const [expiryDate, setExpiryDate] = useState("");
  const [selected, setSelected] = useState([]);

  toast.configure();


  useEffect(() => {
    
    if (location.state) {
      var id=location.state.id;
      getVouchersById({
        id,
        callback:(data)=>{
          const {title,amount,type,countryId,serviceId,minPrice,expiryDate,createdForEmail, createdForNumOfVouchers} = data.result[0];
          setTitle(title);
          setAmount(amount);
          setType(type);
          setCountry(countryId);
          setService(serviceId);
          setMinPrice(minPrice);
          setExpiryDate(expiryDate);
          setEmail(createdForEmail);
          setNumOfVouchers(createdForNumOfVouchers);
         }
      })
    }
  }, []);

  useEffect(() => {
    getCountries({
      callback: (data) => {
        setCountries(data);
        !location.state && setCountry(data.countrylist[0].id);
      },
    });
  }, []);

  useEffect(() => {
    let  options  = [];
     getServices({
      callback: (data) => {
          data?.map(
          (item) =>  {
            let obj ={
              value: item.serviceTypeId,
              label: item.name
            }
            options.push(obj)
          }          // options.push({label: item.name, value: item.serviceTypeId})
        );   
          console.log("updated services", options)
       setServices(options)
        // setServices(data)
      },
    });
    // fetch(`${process.env.REACT_APP_BASE_URL_2}/Providers/GetServiceTypes`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setServices(data);
    //   });
  }, []);

  
   

  const getCountryById = (countryId) => {
    const countryDetail = countries.find((country) => country.id === countryId);
    return {
      label: countryDetail.name,
      value: countryDetail.id,
    };
  };

  const getServiceById = (serviceId) => {
    const serviceDetail = services.find(
      (service) => service.serviceTypeId === serviceId
    );
    return {
      label: serviceDetail.name,
      value: serviceDetail.serviceTypeId,
    };
  };

  const handleChangeType = (value) => {setType(value);};
  const handleChangeCountry = (value) => {setCountry(value);};
  const handleChangeEmail = (value) => {setEmail(value);};
  const handleChangeNumOfVouchers = (value) => {setNumOfVouchers(value);};
  const handleChangeTitle = (value) => {setTitle(value);};
  const handleChangeService = (value) => {setService(value);};
  const handleChangeAmount = (value) => { setAmount(value);};
  const handleChangeMinPrice = (value) => {setMinPrice(value);};
  const handleChangeExpiryDate = (value) => {
    const expiryDate = `${value.year}-${value.month}-${value.day}`;
    setExpiryDate(expiryDate);};

    

    useEffect(() => {
      let idList = []
      selected.map((item) => {
        console.log("item", item.value)
        // idList.push({id: item.value})
        idList.push(item.value)
        setService(idList)
      })
    },[selected])

    console.log("service", service.toString())


  const handleSubmit = (e) => {
    e.preventDefault();
    if(Number(amount > 0)){
    console.log("Amount => ", amount, "amoun num ==>", Number(amount))
    saveVoucher({
      id:location.state ? location.state.id : 0,
      title,
      amount:Number(amount),
      type,
      countryId: Number(country),
      serviceId: service,
      minPrice: Number(minPrice),
      expiryDate: expiryDate != "" ? new Date(addZeroToDate(expiryDate)).toISOString() : new Date(),
      email,
      numOfVouchers: Number(numOfVouchers),
      
      callback:(data)=>{
        // alert(data.message);
        if(data.error){
          toast.error(data.message)
        }
        else  {
           // toast.success("Record Created successfully")
           toast.success(data.message)
           history.push('/vouchers')
        }
       }
    })

  }
    // fetch(
    //   !location.state
    //     ? `${process.env.REACT_APP_BASE_URL_2}/Voucher/AddVoucher`
    //     : `${process.env.REACT_APP_BASE_URL_2}/Voucher/UpdateVoucher`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify({
    //       voucherId: location.state ? location.state.id : 0,
    //       title: title,
    //       amount: Number(amount),
    //       type: type,
    //       countryId: Number(country),
    //       serviceId: Number(service),
    //       minPrice: Number(minPrice),
    //       expiryDate: new Date(addZeroToDate(expiryDate)).toISOString(),
    //       createdForEmail: email,
    //       createdFornumOfVouchers: null,
    //       voucherCode: "",
    //       adminId: 1,
    //     }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     alert(data.message);
    //     console.log(history.goBack());
    //   })
    //   .catch((err) => console.log(err));
  };

  const selectServices = (e) => {
    console.log("asdaad===>", e)
    // setSelected([...e])

  }
 

  return (
    <>
    <div  className="pageName_div">
    <FAEText subHeading bold>
          {!location.state ? 'Create a new Voucher' : 'Update Voucher' }
        </FAEText>
        </div>
    <div className="container_center">
    {/* <img src = {getImageOrVideoSrcFromPublicFolder('/gift.png')}></img> */}
      <form
        className="create-or-edit-voucher-container dpt dpb"
        onSubmit={handleSubmit}
      >
        
        <div className="create-or-edit-voucher-wrapper">
          {(country || !location.state) && countries[0] && (
            <FAEAutoComplete
              label="Choose country"
              placeholder="choose country"
              values={countries.map((country) => ({
                label: country.name,
                value: country.id,
              }))}
              value={
                country
                  ? getCountryById(country)
                  : {
                      label: countries[0].name,
                      value: countries[0].id,
                    }
              }
              getSelectedValue={handleChangeCountry}
              required
            />
          )}

{(type || !location.state) && (
            <FAERadioGroup
              value={type ? type : "G"}
              getSelectedValue={handleChangeType}
              label="Select Voucher type"
              values={[
                {
                  label: "Gift",
                  value: "G",
                  disabled: location.state && type !== "G" ? true : false,
                },
                {
                  label: "Electronic",
                  value: "E",
                  disabled: location.state && type !== "E" ? true : false,
                },
                
              ]}
            />
          )}
          {(title || title === "" || !location.state) && (
            <FAETextField
              getValue={handleChangeTitle}
              value={title ? title : ""}
              placeholder="Voucher Title"
              label="Voucher Title"
              required
            />
          )}
          
          {(amount || amount === "" || !location.state) && (
            <FAETextField
              getValue={handleChangeAmount}
              value={amount ? amount : ""}
               
              placeholder="Amount"
              label="Amount"
              type="number"
              required
              error={(value) => value < 0}
              errorMessage="Amount can not be less than 0."
            />
            
          )}

{(minPrice || minPrice === "" || !location.state) &&
            (type === "S" || type === "E") && (
              <FAETextField
                getValue={handleChangeMinPrice}
                value={minPrice ? minPrice : ""}
                placeholder="Minimum Spent limit"
                label="Minimum Spent limit"
                type="number"
                // required
              />
            )}

{(numOfVouchers || numOfVouchers === "" || !location.state) && (
            <FAETextField
              getValue={handleChangeNumOfVouchers}
              value={numOfVouchers ? numOfVouchers : ""}
              placeholder="Number of Vouchers to be created"
              label="Number of Vouchers to be created"
              type="number"
            />
          )}
         
          
          {(service || service === 0 || !location.state) &&
            (type === "E")  &&
            services[0] && (
              <div className="MuiInputBase-input MuiOutlinedInput-input service_dropdown">
                <p className="fae--text   tertiary-text-color " style={{padding:"5px"}}>Choose service</p>
                <MultiSelect
                options={services}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
               />
            </div>)}

               {/* <FAEAutoComplete
                label="Choose Service"
                placeholder="choose service"
                required
                values={services.map((service) => ({
                  label: service.name,
                  value: service.serviceTypeId,
                }))}
                value={service && getServiceById(service)}
                getSelectedValue={handleChangeService}
              />
            )} */}
 
      


          {(expiryDate || !location.state) && (
            <FAEDatePicker
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
            />
            
          )}
          
        </div>
        {location.state ? (
          <FAEButton>Update</FAEButton>
        ) : (
          <FAEButton>Submit</FAEButton>
        )}
      </form>
      </div>
    </>
  );
};

export default CreateOrEditVoucher;
