//lib
// import { FAEText, FAEButton } from "@plexaar/components";
import React, { useEffect, useState, useContext } from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MobileScreenShareOutlinedIcon from '@mui/icons-material/MobileScreenShareOutlined';

import { useHistory } from "react-router-dom";
import {
  FAEButton,
  FAETextField,

} from "@findanexpert-fae/components";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//src
import './AssignVoucher.scss'
import { AssignUserRole, AssignUserVoucher, GetBusinessStaff, GetUser } from "./action";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/userContext";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";
import { FaAt, FaEnvelope, FaPhone, FaSearch, FaUser, FaVoicemail } from "react-icons/fa";
// import { FAEButton } from "../../Components/FAEButton/FAEButton";


const AssignVoucher = () => {

  let history = useHistory();
  const location = useLocation();
  const [userId] = useContext(UserContext);
  const [userAccount, setUserAccount] = useState("");
  const [isAssign, setIsAssign] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userCaller, setUserCaller] = useState();
  const [voucher_id, setVoucher_id] = useState(location.state.id);


  console.log("location dot state do id==>", location.state.id)



  const handleChangeUserAccount = (value) => { setUserAccount(value); };
  const assignUser = () => { setIsAssign(true) }
  const keyPress = (e) => { if (e.keyCode == 13) {
    // setUserCaller(e.target.value)
    //  console.log('value ===>', e.target.value);

    console.log('userCaller=-=-=',e.target.value)
    if(e.target.value !== undefined){
      let userCaller = e.target.value;
    GetUser({
      userCaller,
      callback: (res) => {
        if(res.result.users === null){
          toast.error("No user found")
        }
       else if(res.result.error){
          console.log("in render com 1", res.result.error, res.result.message)
          toast.error(res.result.message)
         }
        else
        {
         setUserInfo(res.result.users[0]);
        console.log("in render com", res)
        }
      }
    });
  }
     }
    }

    const onAssignConfirm = () => {
      let assigneeId = userInfo.accountNumber;
      let voucherId = location.state.id;
      console.log("confirm",assigneeId)
      console.log("confirm 2",voucherId)

      AssignUserVoucher({
        voucherId,
        assigneeId,
              callback: (res) => {
                console.log("confirm ===>" ,res.message)
                // alert("Assigned Role To User Successfully!")
                if(res.statusCode == 0){
                toast.success(res.message)
                history.push({ pathname: '/vouchers' })
                }
                else toast.error(res.message)
      
              }
            })
    }


  // var role_name = location.state.name;
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let list = []
  //   for (var i = 0; i < e.target.length - 1; i++) {
  //     if (e.target[i].checked) {
  //       list.push({
  //         id: parseInt(e.target[i].name),
  //         email: e.target[i].attributes.email.nodeValue
  //       })
  //     }
  //   }
  //   if (list == '') { alert('Atleast Assign role to one user') }
  //   else {
  //     var role_id = location.state.id;
  //     AssignUserRole({
  //       role_id,
  //       list,
  //       callback: (res) => {
  //         console.log(res)
  //         alert("Assigned Role To User Successfully!")
  //         history.push({ pathname: '/role-listing' })

  //       }
  //     })
  //     console.log(
  //       JSON.stringify({
  //         roleId: location.state.id,
  //         staffs: list
  //       })
  //     )
  //   }
  // }



  return (
    <>
      <div className="pageName_div">Voucher Created</div>
      <div className="container_center">
        <div className="v_userSection">
          <div className="assign_voucher ">
            <div>
              <span style={{ position: "absolute", padding: "89px 0px 20px 55px", color: "white" }}>{`£${location.state.amount}`}</span>
              <img height={140} width={300} src={getImageOrVideoSrcFromPublicFolder("gift.png")} alt={"gift"} />
              {/* <div className="assign_voucher_btnDiv"><FAEButton onClick={assignUser}>Assign</FAEButton></div> */}

              {
              // isAssign && 
              (userAccount || userAccount === "") && (
                <FAETextField
                  getValue={handleChangeUserAccount}
                  onKeyDown={(e) => keyPress(e)}
                  value={userAccount ? userAccount : ""}
                  placeholder="Account Number"
                  label="Account Number"
                  required
                />
              )}
            </div>


          </div>
         {userInfo !== undefined && <div>
          <p className="line"></p>
          <div className="userDetail_sec ">
            <div style={{ display: "flex", margin: "0px 0px 5px 185px" }}>
              <img height={80} width={80} src={getImageOrVideoSrcFromPublicFolder("avatar.png")} alt={"gift"} />
              <div style={{ padding: "15px", marginTop: "15px" }}>ID: <i className="main_color">{userInfo.accountNumber}</i></div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="user_info"><PersonOutlineOutlinedIcon />{userInfo.firstName}</p>
              <p className="user_info" ><PersonOutlineOutlinedIcon />{userInfo.lastName}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="user_info"><EmailOutlinedIcon />{userInfo.email}</p>
              <p className="user_info"><MobileScreenShareOutlinedIcon />{userInfo.phone}</p>
            </div>
          </div>
          
          <div style={{ margin: "30px", textAlign: "center" }} onClick = {onAssignConfirm}><FAEButton >confirm</FAEButton></div>
          </div>}

        </div>





      </div>

    </>
  )
}

export default AssignVoucher