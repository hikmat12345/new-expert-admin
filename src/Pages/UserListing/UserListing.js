//lib
import { FAEText, FAEButton,FAETextField} from "@plexaar/components";
import React, { useEffect, useState,useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//src
import './UserListing.scss'
import { addRoles, deleteDiscount, deleteRoles, getAllUsers, getDiscounts, getRoles, removeUser, searchDiscountCode, searchUser  } from "./action";
import Pagination from "../../Components/Pagination"
import { UserContext } from "../../Contexts/userContext";
import { BiUser } from "react-icons/bi";
import { formatDate } from "../../utils";
import { RiDeleteBinLine, RiPencilLine, RiSearch2Line } from "react-icons/ri";
import { FAEConfirmationModal } from "../../Components/FAEConfirmationModal/FAEConfirmationModal";
import Loader from "../../Components/Loader/Loader";



const UserListing=()=>{

 const [userId] = useContext(UserContext);
 const [userRoles, setUserRoles] = useState([])
 const [userList, setUserList] = useState('')
 const [pageNumber, setPageNumber] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [emptyRows, setEmptyRows] = useState(0);
 const [modal,setModal]=useState(false)
 const [name,setName]=useState("")
 const [description,setDescription]=useState("")
 const [counter,setCounter]=useState(1)
 const [open, setOpen] = useState(false);
 const [discountId, setDiscountId] = useState();
 const [searchText, setSearchText] = useState("");


 toast.configure();


 let history =useHistory();

 
 const handleClickOpen = (id) => {
   setDiscountId(id)
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

useEffect(()=>{
  setTimeout(() => {
    getAllUsers({
      callback:(res)=>{
        setUserList(res)
      }
    })
  }, 500);
},[counter])

const handleChangeName=(e)=>{setName(e)}
const handleChangeDescription=(e)=>{setDescription(e)}

const handleDelete=()=>{
  let id = discountId;
  // if (window.confirm('Are you sure you wish to delete this item?'))
  {
    removeUser({ id,callback:(res)=>{} });
    setCounter(counter+1)
    toast.success('Deleted Successfully!')
   
  }
  setOpen(false)

}
const handleSubmit=()=>{
  addRoles({
    name,
    description,
    callback:(res)=>{
      setModal(false)
      setName("")
      setDescription("")
      setCounter(counter+1)
    }
    });
}

const handleSearch = (e) => {

  console.log("search text==>", e.key)
  if (e.keyCode == 13 && searchText !== '') {
    searchUser({
      searchText,
      callback: (data) => {
        setUserList(data.newUsersModel)
      },
    });
  }
  
}


const handleSearchClick = (e) => {

  searchUser({
      searchText,
      callback: (data) => {
        setUserList(data.newUsersModel)
      },
    });
  
  
}

const handleSearchChange = (e) => {setSearchText(e.target.value)}

return(
  <>
        <FAEConfirmationModal open={open} onClick={handleClose} onConfirm={handleDelete} />
      {userList !== '' ?
      <div className="role-listing ">
        <div className="add-role role_func role_topSec">
         <input placeholder="Search" type = "search" onChange={handleSearchChange} onKeyDown = {(e) => handleSearch(e)}></input>
          <RiSearch2Line 
          onClick={handleSearchClick}
           />
          <FAEButton onClick={() => history.push({ pathname: "/add-user" })} >
            Add New
          </FAEButton>
        </div>
        <TableContainer component={Paper} className="tabular_container">
           <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow  style={{ background: "white" }}>
              <TableCell >Id</TableCell>
              <TableCell >Name</TableCell>

                <TableCell >Mobile</TableCell>
                <TableCell >Email</TableCell>
                <TableCell align="left">Actions</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.reverse()
                .slice(
                  pageNumber * rowsPerPage,
                  pageNumber * rowsPerPage + rowsPerPage
                )
                .map((userList) => {
                  // console.log("ll==>", userList)
                  const { id, firstName, lastName, mobile, email} = userList;
                
                   return (
                    <TableRow
                      key={id}>
                      
                      <TableCell >{id }</TableCell>
                      <TableCell >{firstName + " " + lastName}</TableCell>
                      <TableCell >{mobile}</TableCell>
                      <TableCell >{email}</TableCell>
                       <TableCell style ={{display: "flex"}}><a
                        align="right"
                       >
                        
                        <div  onClick={() =>
                              history.push({
                                pathname: "/update-user",
                                state: { id: id },
                              })
                            } class="icon_bg"><RiPencilLine size = {20}/></div>

                      </a>
                      <a
                        align=" "
                        // onClick={() => history.push({pathname:"/assign-user",state: { id: userRoleId ,name:description }})}
                      >
                        <div onClick={()=>handleClickOpen(id)} class="icon_bg">< RiDeleteBinLine size = {20} /></div>

                         
                      </a>
                   
                        </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && userList.length > rowsPerPage && (
                <TableRow style={{ height: 42 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> 
          </Table>

          {userList.length > 0 && (
            <Pagination
              data={userList}
              dataPerPage={rowsPerPage}
              getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
              getEmptyRows={(emptyRows) => {
                setEmptyRows(emptyRows);
              }}
            />
          )}
        </TableContainer>
        <Modal
        className='modal-container'
        open={modal}
        onClose={() => { setModal(false) }}
        >
        <Box className="modal-box">
          <p className="modal-text">Add A New Role</p>
          <FAETextField
              getValue={handleChangeName}
              value={name}
              placeholder="Enter Role Name"
              label="Role Name"
              required
            />
          <FAETextField
              getValue={handleChangeDescription}
              value={description}
              placeholder="Enter Role Description"
              label="Role Description"
              required
            />
            <div className="modal-btn">
          <FAEButton className='modal-btn-1' onClick={()=>{setModal(false);setCounter(counter+1)}}>Cancel</FAEButton>
          <FAEButton onClick={handleSubmit} >Save</FAEButton></div>
        </Box>
      </Modal>
      </div>  : <Loader />}
      
    </>
)
}

export default UserListing