// lib
import React, { useEffect, useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FAEText } from "@findanexpert-fae/components";
import { FAEAutoComplete } from "@findanexpert-fae/components/dist/stories/FAEAutoComplete/FAEAutoComplete";



import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//src
import history from "../../history";

// scss
import "./Navbar.scss";
import { getCookies, getImageOrVideoSrcFromPublicFolder, setCookies } from "../../utils";
// import FAEAutoComplete from "../FAEAutoComplete";
import { getCountries } from "./action";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [country, setCountry] = useState('Pak');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState  (getCookies('country') !== null ? getCookies('country') : null);
  const [selectedCountryName, setSelectedCountryName] = useState  (null);
  const [selectedCountryId, setSelectedCountryId] = useState  (null);
 

  const popoverContainer = useRef();
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)

  console.log('ussser',user.countryId)

 

  useEffect(() => {
    getCountries({
      callback: (res) => {
        const { countrylist } = res;
         setCountries(countrylist)
       },
    });
  }, []);

 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleUserLogout = () => {
    localStorage.removeItem("isLogin");
    window.location.href = "/login";
  };

  // const handleChangeCountry = (id) => {
  //   let selectedCountry =  countries.filter((item, index) => {
  //    return item.id == id 
  //   })
  //   console.log('selectedCountryName', selectedCountry[0].name)
  //   setCookies('country', selectedCountry[0])
  //   setCountry(id);
  //   window.location.reload();
  // };



  useEffect(() => {
    let selectedCountry;
    getCountries({
      callback: (res) => {
        const { countrylist } = res;
        selectedCountry = countrylist.filter((item, index) => {
              return (getCookies('country') == null && item.id == user.countryId)
 
            })
            if(getCookies('country') == null){
            console.log('selectedCountry',selectedCountry)
            setCookies('country', selectedCountry[0])
            setSelectedCountry(selectedCountry[0])
          }

        },
    });
  }, []);


  const handleChangeCountry = (id) => {
    let selectedCountry =  countries.filter((item, index) => {
     return item.id == id 
    })
    console.log('selectedCountryName', selectedCountry[0].name)
    setCookies('country', selectedCountry[0])
    setCountry(id);
    window.location.reload();
  };


   return (
    <>
      <AppBar position="static" style={{height: "40px"}}>
        <Toolbar className="fae--navbar-toolbar min_height"  >
          <div className="fae--navbar-left-side log_header">
          <img  height={28} width = {65}  src={getImageOrVideoSrcFromPublicFolder("logo192.png")} alt={"logo"} />
          </div>
          <div className="fae--navbar-right-side">
            <div className="top_country_dropdown">
            {console.log(selectedCountry,'asdas')}

            <FAEAutoComplete
              className="country_header"
              
              placeholder={selectedCountry !== null ? selectedCountry?.name : "choose country"}
              values={countries.map((country) => ({
                label: country.name,
                value: country.id ,
              }))}
              getSelectedValue={(option) => handleChangeCountry(option)}
              // defaultValue ={selectedCountry.name}
              
              

              

            />



            </div>
           
            <div className="fae--navbar-icons">
              

              <IconButton edge="start" color="inherit" aria-label="menu">
                <EmailOutlinedIcon />
              </IconButton>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <NotificationsNoneOutlinedIcon />
              </IconButton>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <SettingsOutlinedIcon />
              </IconButton>
            </div>
            <div className="fae--navbar-profile">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <Avatar
                  alt="Profile"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg"
                />
                <FAEText primary>{user !== undefined ? (user.firstName + ' ' + user.lastName) : ""}</FAEText>
                <ExpandMoreIcon />
              </IconButton>
              <div ref={popoverContainer}>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  container={popoverContainer.current}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <div className="fae--navbar-profile-popover">
                    <p
                      className="fae--navbar-profile-popover-link"
                      onClick={handleUserLogout}
                    >
                      Logout
                    </p>
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
