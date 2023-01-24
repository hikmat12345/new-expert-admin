 //lib
// import { FAEText, FAEButton,FAETextField} from "@plexaar/components";
// import { FAEText } from "@plexaar/components/dist/dist/stories/FAEText/FAEText";
import { FAEButton } from "@plexaar/components";

import React, { useEffect, useState, useContext } from "react";
 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//src
import './AssignedUsers.scss'
import { addRoles, deleteDiscount, deleteRoles, getAssignedUser, getDiscounts, getRoles, searchDiscountCode  } from "./action";
 import { UserContext } from "../../Contexts/userContext";
 import { RiDeleteBinLine, RiPencilLine, RiSearch2Line } from "react-icons/ri";
 import Loader from "../../Components/Loader/Loader";
import { useHistory, useLocation } from "react-router-dom";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";



const AssignedUsers=()=>{

  const [userId] = useContext(UserContext);
  const [userData, setUserData] = useState('');
 


 toast.configure();


 let history =useHistory();
 const location=useLocation();


  

// const handleChangeName=(e)=>{setName(e)}
// const handleChangeDescription=(e)=>{setDescription(e)}
const cardData = [
  {name: "Ahmed Ali",
    id: 'ASDSDASD',
    img: <img  height={90} width = {90}  src={getImageOrVideoSrcFromPublicFolder("Avatar.png")} alt={"logo"} />,
    btn: <FAEButton>Assign Role</FAEButton>
  },
  {name: "Ahmed Ali",
  id: 'ASDSDASD',
  img: <img  height={90} width = {90}  src={getImageOrVideoSrcFromPublicFolder("Avatar.png")} alt={"logo"} />,
  btn: <FAEButton>Assign Role</FAEButton>
},
{name: "Ahmed Ali",
  id: 'ASDSDASD',
  img: <img  height={90} width = {90}  src={getImageOrVideoSrcFromPublicFolder("Avatar.png")} alt={"logo"} />,
  btn: <FAEButton>Assign Role</FAEButton>
},

{name: "Ahmed Ali",
  id: 'ASDSDASD',
  img: <img  height={90} width = {90}  src={getImageOrVideoSrcFromPublicFolder("Avatar.png")} alt={"logo"} />,
  btn: <FAEButton>Assign Role</FAEButton>
},

{name: "Ahmed Ali",
  id: 'ASDSDASD',
  img: <img  height={90} width = {90}  src={getImageOrVideoSrcFromPublicFolder("Avatar.png")} alt={"logo"} />,
  btn: <FAEButton>Assign Role</FAEButton>
},
]
console.log("location assigned state do id==>", location.state)

useEffect(() => {
  let id = location.state.id;
  setTimeout(() => {
    getAssignedUser({
      id, callback: (res) => {
        console.log("after call back", res.users)
        setUserData(res.users)
      }
    })
  }, 500);
}, [])
 
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
        {userData !== '' && userData.map((item) => (
           <div className="user_card">
            {/* {item.img} */}
            <img  height={90} width = {90}  src={getImageOrVideoSrcFromPublicFolder("Avatar.png")} alt={"logo"} />
            <div>
           <div>{item.firstName+ ' ' +item.lastName}</div>
           <div>ID: {item.id}</div>
           {/* <span style = {{margin: "30px 0px", color : "#d14056"}}>{item.email}</span> */}
           </div>
   
   
             </div>
         ))}

</div>


         </div>
    </>
)
}

export default AssignedUsers



 
 