// libs
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { FAEButton } from "@findanexpert-fae/components";
import { FAEAutoComplete } from "@findanexpert-fae/components";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { FaCheck, FaFilter, FaRegTimesCircle, FaRemoveFormat, FaSearch, FaUserCheck, FaXmark } from "react-icons/fa";




// src
import history from "../../history";
import Pagination from "../../Components/Pagination";
import { changeTitle, formatDate, noRecordFoundMsg } from "../../utils";
import { getCountries, getVouchers, deleteVouchers, applyFilterVouchers, searchVoucher } from "./action";

// scss
import "./VoucherListing.scss";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";
import { FAEConfirmationModal } from "../../Components/FAEConfirmationModal/FAEConfirmationModal";
import SearchBar from "material-ui-search-bar";
import { height } from "@mui/system";


// for modal


const VoucherListing = () => {
  const [countries, setCountries] = useState([]);
  const [vouchers, setVouchers] = useState(null);
  const [country, setCountry] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [emptyRows, setEmptyRows] = useState(0);
  const [voucherId, setVoucherId] = useState();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState('');


  // for modal
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = (id) => {
    console.log("id KKKK", id)
    setVoucherId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    changeTitle("Vouchers");
  });

  useEffect(() => {
    getCountries({
      callback: (res) => {
        const { countrylist } = res;
        setCountries(countrylist)
      },
    });
  }, []);

  useEffect(() => {
    getVouchers({
      callback: (data) => {
        setVouchers(data.result.vouchers
          // country
          //   ? data.result.vouchers.filter(
          //     (nonDeletedVoucher) =>
          //       nonDeletedVoucher.isDeleted === false &&
          //       nonDeletedVoucher.countryId === country
          //   )
          //   : data.result.vouchers.filter(
          //     (nonDeletedVoucher) => nonDeletedVoucher.isDeleted === false
          //   )

        )
        // toast.success(data.error)

      },
    });
  }, []);

  const getAllVouchers = () => {
    getVouchers({
      callback: (data) => {
        setVouchers(data.result.vouchers)
      },
    });
    setSearchText("")
  }




  const deleteVoucher = () => {
    let id = voucherId;
    console.log("testing", id)

    // const confirmation = window.confirm(
    //   `Do you really want to delete voucher of ID = ${id}`
    // );
    // if (id !== undefined) {
    deleteVouchers({
      id,
      callback: (data) => {
        setVouchers(vouchers.filter((voucher) => voucher.id !== id));
        // console.log(data.outputMsg);
        toast.success(data.outputMsg)
      },
    });
    setOpen(false)
    // }
  };

  const handleChangeCountry = (value) => {
    console.log("value", value)
    setCountry(value);
  };

  const handleFiltersVouchers = (e) => {
    let status = e.target.value;
    if (e.target.value === "All") {
      console.log("in all")
      getVouchers({
        callback: (data) => {
          setVouchers(data.result.vouchers)
        },
      });
    }
    else {
      applyFilterVouchers({
        status,
        callback: (data) => {
          setVouchers(data.result.vouchers)

        },
      });
    }

  }


  const search = (e) => {
     if (e.keyCode == 13 && searchText !== '') {
      searchVoucher({
        searchText,
        callback: (data) => {
          setVouchers(data.result.vouchers)
        },
      });
    }



  }
  const searchHandle = (e) => {
    // setIsOpenSearch(true)
    setSearchText(e.target.value)
    console.log("serach==>", e.target.value)
  }


  return (
    <>
      <FAEConfirmationModal open={open} onClick={handleClose} onConfirm={deleteVoucher} />

      {vouchers !== null ?

        <div className="voucher-listing-container dpl dpr">
          <div className="add-voucher-btn-wrapper addBtn_sec">
            {/* <div className="addBtn_sec"> */}
            <FAEButton onClick={() => history.push({ pathname: "/add" })}>
              Add Voucher
            </FAEButton>
            {/* </div> */}
          </div>


          <div className="voucher-listing-filters">
 


            <select name="select" className="select_style" onChange={handleFiltersVouchers}>
              <option value='All'>All</option>

              <option value='Active'>Active</option>
              <option Used='Used'>Used</option>
              <option value='Expired'>Expired</option>
            </select>
            <div >

              {/* <span style={{margin: "0px 10px"}}><FilterListOutlinedIcon/></span> */}
              <div class="search-box">
                
                <button class="btn-search">{searchText === "" ? <FaSearch/> : <FaRegTimesCircle onClick={getAllVouchers}/> }</button>
                <input value={searchText} onChange={searchHandle} onKeyDown={search} type="text" class="input-search" placeholder="Type to Search..." />
              </div>


            </div>
          </div>

          <div className="">
            <TableContainer component={Paper} className="tabular_container">

              {vouchers.length > 0 ? <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow style={{ background: "white" }}>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Voucher Code</TableCell>
                    <TableCell align="center">Expiry Date</TableCell>
                    <TableCell align="center">Assign to</TableCell>
                    <TableCell align="center">Redeem </TableCell>
                    {/* <TableCell align="right"></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vouchers.reverse()
                    .slice(
                      pageNumber * rowsPerPage,
                      pageNumber * rowsPerPage + rowsPerPage
                    )
                    .map((voucher, index) => {
                      const { id, title, amount, voucherCode, expiryDate, type, isUsed, assigneeName } =
                        voucher;
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
                          key={id}
                         >
                          <TableCell component="th" scope="row">
                            {title}
                          </TableCell>
                          <TableCell align="center">{amount}</TableCell>
                          <TableCell align="center" style={{ cursor: "pointer" }}
                            onClick={() =>
                              history.push({
                                pathname: "/update",
                                state: { id: id },
                              })
                            }
                          >
                            <a className="v_code">{voucherCode}</a></TableCell>
                          <TableCell align="center" className={isDateExpire ? "expiry_date" : ""}>{formatedExpiryDate}</TableCell>
                           <TableCell
                            align="center"
                            onClick={() => history.push({
                              pathname: "/voucher-assign", state: { id: id, amount: amount },
                            })}
                          // onClick={() => deleteVoucher(id)}
                          // onClick={() => handleClickOpen(id)}
                          >
                            {assigneeName !== null ? assigneeName : <FaUserCheck className="voucher-listing-delete-icon" />}
                          </TableCell>
                          <TableCell
                            align="center"

                          >
                            {/* <EditOutlinedIcon className="voucher-listing-edit-icon" /> */}
                            {/* {console.log("isUsed==>", isUsed)} */}
                            {isUsed &&
                              <FaCheck className="voucher-listing-edit-icon" />
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && vouchers.length > rowsPerPage && (
                    <TableRow style={{ height: 42 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
                :
                noRecordFoundMsg("No record found.")
              }

              {vouchers.length > 0 && (
                <Pagination
                  data={vouchers}
                  dataPerPage={rowsPerPage}
                  getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
                  getEmptyRows={(emptyRows) => {
                    setEmptyRows(emptyRows);
                  }}
                />
              )}
            </TableContainer>
          </div>


        </div> : <Loader />}
 


    </>
  );
};

export default VoucherListing;
