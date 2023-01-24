//lib
import { FAEText, FAEButton,FAETextField} from "@plexaar/components";
import React, { useEffect, useState, useContext } from "react";
 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//src
import './UserRoleList.scss'
import { addRoles, deleteDiscount, deleteRoles, getDiscounts, getRoles, getUsers, roleAssign, searchDiscountCode  } from "./action";
 import { UserContext } from "../../Contexts/userContext";
 import { RiDeleteBinLine, RiFacebookLine, RiFlag2Fill, RiFlagLine, RiPencilLine, RiSearch2Line, RiUserFollowLine } from "react-icons/ri";
 import Loader from "../../Components/Loader/Loader";
import { useHistory, useLocation } from "react-router-dom";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";
import { getAssignedUser } from "../AssignedUsers/action";



const UserRoleList=()=>{
  const [userList, setUserList] = useState('');
  const [assignUserIDs, setAssignUserIDs] = useState([]);

 const [userId] = useContext(UserContext);
 const location=useLocation();

 


 toast.configure();


 let history =useHistory();

  
 useEffect(() => {
   setTimeout(() => {
    getUsers({
        callback: (res) => {
        console.log("after call back", res)
        setUserList(res)
      }
    })
  }, 500);
}, [])

useEffect(() => {
  let id = location.state.id;
  let assignUserIDs;
  setTimeout(() => {
    getAssignedUser({
      id, callback: (res) => {
        let result = res.users.map(a => a.id);
        console.log("after call back ddddddddd d", result)

        setAssignUserIDs(result)
      }

    })
  }, 500);

}, [])

// console.log("after call back assignUserIDs", assignUserIDs)



const assignRole = (uId) => {
  let roleId = location.state.id;
  let userId = uId;
  console.log("rol id", roleId, userId)

  roleAssign({
    roleId, userId, callback: (res) => {
      if (res.error) {
        toast.error(res.message)
      }
      else {
        // setCounter(counter + 1)
        toast.success('Assigned Successfully!')
        window.location.reload();
      }
    }
  });
 }

 
 
 
return(
  <>
         <div className="addUser_role"> 
         <div className="role_func role_topSec">
        <input placeholder="Search" type = "search"></input>
          <RiSearch2Line/>
          <FAEButton onClick={() => history.push({ pathname: "/add-role" })} >
            Add Roles
          </FAEButton>
        </div>
        <div className="card_grid">
        {userList !== '' && userList.map((item) => (
           <div className="user_card">
            {/* {item.img} */}
            <div style={{display: "flex"}}>
           <img  height={90} width = {90}  src={getImageOrVideoSrcFromPublicFolder("Avatar.png")} alt={"logo"} />
           <div style={{margin:"0px 70px 0px 0px"}}>
           <div>{item.firstName +' '+item.lastName }</div>
           <div>ID: {item.id}</div>
           {/* <div>{item.email }</div> */}

          { !assignUserIDs.includes(item.id) &&  <FAEButton style = {{margin: "10px 0px"}} onClick = {() => assignRole(item.id)}> Assign Role</FAEButton>}
           </div>
          
           { assignUserIDs.includes(item.id) && <div className="icon_bg" style = {{color: "#d14056"}}> <RiUserFollowLine/></div>}
           </div>

   
   
             </div>
         ))}

</div>


         </div>
    </>
)
}

export default UserRoleList




const card=(props)=>{

  // const [userId] = useContext(UserContext);
  
 
  
 
  
 return(
   <>
           
 
        
     </>
 )
 }
 