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
import './DiscountCodeListing.scss'
import { addRoles, deleteDiscount, deleteRoles, getDiscounts, getRoles, searchDiscountCode  } from "./action";
import Pagination from "../../Components/Pagination"
import { UserContext } from "../../Contexts/userContext";
import { BiUser } from "react-icons/bi";
import { formatDate } from "../../utils";
import { RiDeleteBinLine, RiPencilLine, RiSearch2Line } from "react-icons/ri";
import { FAEConfirmationModal } from "../../Components/FAEConfirmationModal/FAEConfirmationModal";
import Loader from "../../Components/Loader/Loader";



const DiscountCodeListing=()=>{

 const [userId] = useContext(UserContext);
 const [userRoles, setUserRoles] = useState([])
 const [discountList, setDiscountList] = useState('')
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
  console.log("id KKKK", id)
  setDiscountId(id)
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

useEffect(()=>{
  setTimeout(() => {
    getDiscounts({
      callback:(res)=>{
        setDiscountList(res)
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
    deleteDiscount({ id,callback:(res)=>{} });
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
    searchDiscountCode({
      searchText,
      callback: (data) => {
        setDiscountList(data.result.discountCodeModels)
      },
    });
  }
  
}


const handleSearchClick = (e) => {

      searchDiscountCode({
      searchText,
      callback: (data) => {
        setDiscountList(data.result.discountCodeModels)
      },
    });
  
  
}

const handleSearchChange = (e) => {
  // console.log(e.target.value)
  setSearchText(e.target.value)
}

return(
  <>
        <FAEConfirmationModal open={open} onClick={handleClose} onConfirm={handleDelete} />
      {discountList !== '' ?
      <div className="role-listing ">
        <div className="add-role role_func role_topSec">
         <input placeholder="Search" type = "search" onChange={handleSearchChange} onKeyDown = {(e) => handleSearch(e)}></input>
          <RiSearch2Line 
          onClick={handleSearchClick}
           />
          <FAEButton onClick={() => history.push({ pathname: "/add-discount" })} >
            Add New
          </FAEButton>
        </div>
        <TableContainer component={Paper} className="tabular_container">
           <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow  style={{ background: "white" }}>
              <TableCell >Title</TableCell>
              <TableCell >Discount</TableCell>

                <TableCell >Expiry Date</TableCell>
                <TableCell >Type</TableCell>
                <TableCell align="left">Actions</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {discountList
                .slice(
                  pageNumber * rowsPerPage,
                  pageNumber * rowsPerPage + rowsPerPage
                )
                .map((discountList) => {
                  // console.log("ll==>", discountList)
                  const { id, percentageDiscount, expiryDate, type, title, amountDiscount } = discountList;
                  const splitExpiryDate = expiryDate
                  .substring(0, 10)
                  .split("-");
                const isDateExpire =
                  new Date(
                    `${splitExpiryDate[0]},
              ${splitExpiryDate[1]},
              ${splitExpiryDate[2]}`
                  ) < new Date();

                const expiryDateFormat = formatDate(
                  new Date(expiryDate).toString()
                );
                const formatedExpiryDate = `${expiryDateFormat.day} ${expiryDateFormat.monthName}, ${expiryDateFormat.year}`;
                  return (
                    <TableRow
                      key={id}>
                      
                      <TableCell >{title }</TableCell>
                      <TableCell >{percentageDiscount !== 0 ? `${percentageDiscount}%` :  `£${amountDiscount}`}</TableCell>
                      <TableCell >{formatedExpiryDate}</TableCell>
                      <TableCell >{type}</TableCell>
                       <TableCell style ={{display: "flex"}}><a
                        align="right"
                       >
                        
                        <div  onClick={() =>
                              history.push({
                                pathname: "/update-discount",
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
              {emptyRows > 0 && discountList.length > rowsPerPage && (
                <TableRow style={{ height: 42 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> 
          </Table>

          {discountList.length > 0 && (
            <Pagination
              data={discountList}
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

export default DiscountCodeListing