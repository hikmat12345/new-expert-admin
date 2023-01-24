//libs
import React, { useState, useEffect } from "react";
import {FAEButton} from "@findanexpert-fae/components";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Components/Loader/Loader";

//src
import { getCookies, getImageOrVideoSrcFromPublicFolder } from "../../utils";
import history from "../../history";
import {getAllMenus, saveRolePermissions } from "./action";

//scss
import "./RolePermissions.scss";
const RolePermissions = () => {
  const location = useLocation();
  console.log("location===>",location.state.id)
  let tempUser = getCookies('user');
  let userObj = JSON.stringify(tempUser)
  let user = JSON.parse(userObj)
 
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [roleId, setRoleId] = useState(location.state.id);
  const [permissions, setPermissions] = useState([]);

  const [description, setDescription] = useState([]);
  const [title, setTitle] = useState([]);

  const [menues, setMenues] = useState([])
  toast.configure();
  const handleChangeDesc = (value) => { setDescription(value); };
  const handleChangeTitle = (value) => { setTitle(value); };

  useEffect(()=>{
    var temp = []
    setTimeout(() => {
      getAllMenus({
        callback:(res)=>{
          setMenues(res.menuModels)
          console.log("All menues in useEffect==> ", res.menuModels, res.code)
        }
      })
    }, 500);
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRolePermissions({
        roleId,
        permissions,
        callback: (data) => {
           if (data.error) {
            toast.error(data.message)
          }
          else {
            toast.success(data.message)
            history.push('/Role-listing')
          }
        }
      })
  };

const handleCheck = (e, menuName, submenuName , action) => {
  let tempPermissions = permissions;
  if(e.target.checked){
  tempPermissions.push(`admin.${menuName}.${submenuName}.${action}`)
  }
  else if(tempPermissions.includes(`admin.${menuName}.${submenuName}.${action}`)){
      const index = tempPermissions.indexOf(`admin.${menuName}.${submenuName}.${action}`);
      tempPermissions.splice(index, 1);
    }
  // let uniqueChars = [...new Set(tempPermissions)];

  console.log(e.target.checked,"tempPermissions e-->>", tempPermissions)
  setPermissions(tempPermissions)
}
  return (
    <>
    {menues.length > 0 ?
      <div className="container_breadcrums">
        <img
           width={300} src={getImageOrVideoSrcFromPublicFolder("b.svg")} alt={"logo"} />
        <div style={{margin: "0px 10px 0px 20px"}}>
          <div className="card_grid">
        { menues.map((item, index) => (
         <div className="single_menu">
         <input className="check_box" onChange={() => handleCheck(item)} value={item.menuName} type="checkbox" />
        <label> {item.menuName}</label>
         <div style={{marginLeft: "8px"}}>
        {item.subMenuModels.length > 0 ?
          item.subMenuModels.map((submenu) => (
            <div style={{margin: "8px"}}>
            <input onChange={(e) => handleCheck(e, item.menuName, submenu.subMenuName, null)} className="check_box" type="checkbox" />
            <label>{submenu.subMenuName}</label>
            <div  style={{margin: "8px"}}>
            <input onChange={(e) => handleCheck(e, item.menuName, submenu.subMenuName, submenu.actionName)}  className="check_box" type="checkbox" />
            <label>{submenu.actionName}</label>
            </div>
            </div>
          ))
          :
          item.actions.map((action) => (
            <div style={{margin: "3px 10px"}}>
            <input onChange={(e) => handleCheck(e, item.menuName, item.menuName, action)}  className="check_box" label = {action} type="checkbox" value={action}/>
            <label>{action}</label>
            </div>
          ))  
        }
      </div>
         </div> 
        ))}
        </div>
        </div>
        <div style={{ textAlign: "center" }}><FAEButton 
        // onClick = {() => history.push('/role-listing')}
        onClick = {handleSubmit}
        >confirm</FAEButton></div>
      </div>
      :
      <Loader/>
    }
    </>
  );
};

export default RolePermissions;

/**
 *  Recursive Structure
 * 
 *  {name,children}
 * 
 *   
 */

const TreeItem = (item) => {
 const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div style={{marginLeft: "10px"}}>
        {isOpen = true ? <i className="fa fa-angle-down"></i>:<i className="fa fa-angle-up"></i>}
        <input type="checkbox" />
        <label>Some Label</label>
        {
          item.children.map(itm => (
            <TreeItem />
          ))
        }
      </div>
    </>
  )
}