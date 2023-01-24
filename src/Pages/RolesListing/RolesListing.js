//lib
import { FAEText, FAEButton, FAETextField } from "@plexaar/components";
import React, { useEffect, useState, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
 
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RiBriefcaseLine, RiDeleteBinLine, RiFileListLine, RiMore2Line, RiPencilLine, RiSearch2Line, RiUserSettingsLine } from "react-icons/ri";

 
//src
import './RolesListing.scss'
import { addRoles, deleteRoles, getRoles, searchRole } from "./action";
import Pagination from "../../Components/Pagination"
import { UserContext } from "../../Contexts/userContext";
import { BiUser } from "react-icons/bi";
import Loader from "../../Components/Loader/Loader";
import { FAEConfirmationModal } from "../../Components/FAEConfirmationModal/FAEConfirmationModal";



const RolesListing = () => {

  const [userId] = useContext(UserContext);
  const [userRoles, setUserRoles] = useState("")
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [emptyRows, setEmptyRows] = useState(0);
  const [modal, setModal] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [counter, setCounter] = useState(1)
  const [searchText, setSearchText] = useState("");
  const [roleId, setRoleId] = useState();

  const [open, setOpen] = useState(false);



  toast.configure();


  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      getRoles({
        callback: (res) => {
          setUserRoles(res)
        }
      })
    }, 500);
  }, [counter])

  const handleClickOpen = (id) => {
    console.log(id)
    setRoleId(id)
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
  };


  const handleChangeName = (e) => { setName(e) }
  const handleChangeDescription = (e) => { setDescription(e) }

  const handleDelete = () => {
    console.log("rol id", roleId)
    let id = roleId;
    deleteRoles({
      id, callback: (res) => {
        if (res.error) {
          toast.error(res.message)
        }
        else {
          setCounter(counter + 1)
          toast.success('Deleted Successfully!')
        }
      }
    });
    handleClose1();
  }

  const handleSubmit = () => {
    addRoles({
      name,
      description,
      callback: (res) => {
        setModal(false)
        setName("")
        setDescription("")
        setCounter(counter + 1)
      }
    });
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSearchChange = (e) => { setSearchText(e.target.value) }
  const handleSearch = (e) => {
    if (e.keyCode == 13 && searchText !== '') {
      searchRole({
        searchText,
        callback: (data) => {
          setUserRoles(data.roles)
        },
      });
    }

  }



  return (
    <>
      <FAEConfirmationModal open={open} onClick={handleClose1} onConfirm={handleDelete} />

      {userRoles !== "" ?
        <div className="role-listing ">
          <div className="add-role role_func role_topSec">
            <input placeholder="Search" type="search" onChange={handleSearchChange} onKeyDown={(e) => handleSearch(e)}></input>
            <RiSearch2Line />
            <FAEButton onClick={() => history.push({ pathname: "/add-role" })} >
              Add Roles
            </FAEButton>
          </div>
          
          <TableContainer component={Paper} className="tabular_container">
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow style={{ background: "white" }}>
                  <TableCell >Id</TableCell>

                  <TableCell >Name</TableCell>
                  <TableCell >Description</TableCell>
                  <TableCell align="left">Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {userRoles
                  .slice(
                    pageNumber * rowsPerPage,
                    pageNumber * rowsPerPage + rowsPerPage
                  )
                  .map((userRoles) => {
                    const { id, name, description } = userRoles;
                    return (
                      <TableRow
                        key={id + name}>


                        <TableCell >{id}</TableCell>
                        <TableCell >{name}</TableCell>
                        <TableCell >{description}</TableCell>
                        <TableCell style={{ display: "flex" }}>

                          <FAEButton
                            onClick={() => history.push({ pathname: "/user-role",  state: { id: id },})}

                          ><RiUserSettingsLine />
                            Assign Role
                          </FAEButton>

                          <FAEButton className="btn_gray_bg"
                            onClick={() => history.push({ pathname: "/assigned-users",  state: { id: id }, })}

                          ><RiUserSettingsLine />
                            Assigned Users
                          </FAEButton>

                          <a onClick={handleClose}><RiPencilLine size={20} className="icon_bg" /></a>



                          <a onClick={() => handleClickOpen(id)}><RiDeleteBinLine size={20} className="icon_bg" /></a>

                          <a>

                            {/* <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <div  class="icon_bg"><RiMore2Line size = {20}/></div>
                    </Button> {id}
                    <Menu
                      id= {id}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >  
                      <MenuItem onClick={handleClose}><RiPencilLine size={20}/> Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(id)}><RiDeleteBinLine size={20}/>{id} Delete</MenuItem>
                    </Menu>
                  </div> */}



                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && userRoles.length > rowsPerPage && (
                  <TableRow style={{ height: 42 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

            </Table>


            {userRoles.length > 0 && (
              <Pagination
                data={userRoles}
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
                <FAEButton className='modal-btn-1' onClick={() => { setModal(false); setCounter(counter + 1) }}>Cancel</FAEButton>
                <FAEButton onClick={handleSubmit} >Save</FAEButton></div>
            </Box>
          </Modal>
        </div>
        :
        <Loader />}

    </>
  )
}

export default RolesListing