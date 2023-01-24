//lib
import { FAEText, FAEButton} from "@plexaar/components"
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
import './AssignUser.scss'
import {  AssignUserRole, GetBusinessStaff  } from "./action";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/userContext";


const AssignUser=()=>{
 
 let history =useHistory();
 const location=useLocation();
 const [userId] = useContext(UserContext);
 const [businessStaff,setBusinessStaff]=useState([]);

 var role_name=location.state.name;
 useEffect(() => {
  console.log(userId)
  GetBusinessStaff({
     userId,
     callback:(res)=>{
       setBusinessStaff(res);
      }
      });
},[]);

const handleSubmit=(e)=>{
 e.preventDefault();
 let list = []
 for (var i = 0; i < e.target.length - 1; i++) {
  if (e.target[i].checked) {
   list.push({
    id: parseInt(e.target[i].name),
    email: e.target[i].attributes.email.nodeValue
   })
  }
 }
 if (list == '') { alert('Atleast Assign role to one user') }
 else {
  var role_id=location.state.id;
  AssignUserRole({
   role_id,
   list,
   callback: (res) => {
    console.log(res)
     alert("Assigned Role To User Successfully!")
     history.push({ pathname: '/role-listing' })

   }
 })
  console.log(
   JSON.stringify({
    roleId: location.state.id,
    staffs: list
   })
  )
 }
}

return(
  <>
    <div className="role-listing">
    <form onSubmit={handleSubmit}>
      <TableContainer component={Paper}>
      
        <FAEText className="roles-heading">Assigning Users</FAEText>
        <FAEText className="roles-sub-heading">{role_name}</FAEText>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell >First Name</TableCell>
              <TableCell >Last Name</TableCell>
              <TableCell >Email</TableCell>
              <TableCell align="right">Assign Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessStaff
              .map((businessStaff) => {
                const { id, firstName, lastName, email } = businessStaff;
                return (
                  <TableRow
                    key={id}>
                    <TableCell >{firstName}</TableCell>
                    <TableCell >{lastName}</TableCell>
                    <TableCell >{email}</TableCell>
                    <TableCell align="right"><input
                    type="checkbox" 
                    name={id} 
                    email={email}
                    /> </TableCell>
                  </TableRow>
                );
              })
            }

          </TableBody>
        </Table>
        <div className='save-btn' ><FAEButton >Save</FAEButton></div>
     
      </TableContainer>
      </form>
    </div> 
      
    </>
)
}

export default AssignUser