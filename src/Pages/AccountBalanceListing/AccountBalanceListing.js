// libs
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";

// src
import history from "../../history";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";

// scss
import "./AccountBalanceListing.scss";
import Pagination from "../../Components/Pagination";
import { changeTitle } from "../../utils";
import {getBusiness} from './action'

const AccountBalanceListing = () => {
  const [businesses, setBusinesses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    changeTitle("Account Balance");
  });

  useEffect(() => {
    getBusiness({
      callback: (data) => {
        setBusinesses(data.result)
      },
    });
  }, []);

  return (
    <>
      <div className="account-balance-listing-container dpl dpr">
        <FAEText subHeading bold align="center">
          Businesses
        </FAEText>
        <div className="add-account-balance-btn-wrapper">
          <FAEButton onClick={() => history.push({ pathname: "/add-balance" })}>
            Add Balance
          </FAEButton>
        </div>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Account Number</TableCell>
                <TableCell align="right">Threshold</TableCell>
                <TableCell align="right">Account Limit</TableCell>
                <TableCell align="right">Withdraw Limit Per Day</TableCell>
                <TableCell align="right">Withdraw Limit Per Month</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses
                .slice(
                  pageNumber * rowsPerPage,
                  pageNumber * rowsPerPage + rowsPerPage
                )
                .map((business) => {
                  const {
                    id,
                    accountnumber,
                    accountlimit,
                    threshold,
                    withdrawlimitperday,
                    withdrawlimitpermonth,
                  } = business;
                  return (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {accountnumber}
                      </TableCell>
                      <TableCell align="right">{threshold}</TableCell>
                      <TableCell align="right">{accountlimit}</TableCell>
                      <TableCell align="right">{withdrawlimitperday}</TableCell>
                      <TableCell align="right">
                        {withdrawlimitpermonth}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={() =>
                          history.push({
                            pathname: "/update-balance",
                            state: { id: id },
                          })
                        }
                      >
                        <EditOutlinedIcon className="voucher-listing-edit-icon" />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <Pagination
            data={businesses}
            dataPerPage={rowsPerPage}
            getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
            getEmptyRows={(emptyRows) => {
              // setEmptyRows(emptyRows);
            }}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default AccountBalanceListing;
