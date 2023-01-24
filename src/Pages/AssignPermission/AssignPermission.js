//lib
import { FAEText, FAEButton,FAETextField} from "@plexaar/components";
// import { FAEText } from "@plexaar/components/dist/dist/stories/FAEText/FAEText";
// import { FAEButton } from "@plexaar/components/dist/dist/stories/FAEButton/FAEButton";
import React, { useEffect, useState,useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";

//src
import './AssignPermission.scss'
import {  assignPermission, getComponents  } from "./action";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/userContext";


const AssignPermission=()=>{
 
 let history =useHistory();
 const location=useLocation();
 const [userId] = useContext(UserContext);
 const [roleComponents,setRoleComponents]=useState([]);
 const [checked,setChecked]=useState([])

 var role_name=location.state.name;
 useEffect(() => {
  var role_id=location.state.id;
  console.log(userId)
  getComponents({
     role_id,
     callback:(res)=>{
       setRoleComponents(res);
       res.map((chk)=>{
        const { id, canView } = chk;
         if(canView==true)
         {
           checked.push('' + id)
         }
       })
       console.log(res)
      }
      });
},[]);

const handleSubmit=()=>{
 
    if (checked.length == 0) {
      alert("Give at least one permission")
    }
    else {
      let list = []
      checked.map((i) => {
        list.push(
          {
            "roleId": location.state.id,
            "componentId": parseInt(i),
            "canView": true
          }
        )
      })
      assignPermission({
        userId,
        list,
        callback: (res) => {
          alert("Added Roles Permission Successfully!")
          history.push({ pathname: '/role-listing' })

        }
      })

      // console.log(
      //   JSON.stringify({
      //     userId:parseInt(userId),
      //     components:list,
      //   })
      // )
    }
  
}
const handleCheckbox=(e)=>{
  if(e.target.checked === true){
    checked.push(e.target.name)
  }
  else{
    setChecked(oldState => oldState.filter(item => item !== e.target.name))
  }
}

return(
  <>
 
    <div className="role-listing">
      <TableContainer component={Paper}>
        <FAEText className="roles-heading">Assign Permissions</FAEText><br />
        <FAEText className="roles-sub-heading">{role_name}</FAEText>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell >Name</TableCell>
              <TableCell align="right">Can View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roleComponents
              .map((roleComponents) => {
                const { id, name, canView } = roleComponents;
                return (
                  <TableRow
                    key={id}>
                    <TableCell >{name}</TableCell>
                    <TableCell align="right"><input type="checkbox" name={id} onChange={handleCheckbox} defaultChecked={canView==true? true :false} /> </TableCell>
                  </TableRow>
                );
              })
            }

          </TableBody>
        </Table>
        <div className='save-btn' onClick={handleSubmit}><FAEButton >Save</FAEButton></div>
      </TableContainer>

    </div> 
      
    </>
)
}

export default AssignPermission