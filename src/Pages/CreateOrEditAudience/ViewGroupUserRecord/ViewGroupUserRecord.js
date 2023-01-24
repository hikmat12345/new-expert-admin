// libs
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// src
import Pagination from "../../../Components/Pagination";

// scss

const ViewGroupUserRecord = ({ isSearchGroupUser, data, rowsPerPage }) => {
  const [pageNumber, setPageNumber] = useState(0);

  return (
    <>
      {!isSearchGroupUser && (
        <div className="audience-created-group-data dpb">
          {data?.length > 0 && (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Firstname</TableCell>
                    <TableCell align="right">Lastname</TableCell>
                    <TableCell align="right">Mobile</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(
                      pageNumber * rowsPerPage,
                      pageNumber * rowsPerPage + rowsPerPage
                    )
                    .map((group, index) => {
                      const {
                        firstName,
                        lastName,
                        mobile,
                        email,
                        countryName,
                        gender,
                      } = group;
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {firstName}
                          </TableCell>
                          <TableCell align="right">{lastName}</TableCell>
                          <TableCell align="right">{mobile}</TableCell>
                          <TableCell align="right">{email}</TableCell>
                          <TableCell align="right">{countryName}</TableCell>
                          <TableCell align="right">{gender}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>

              <Pagination
                data={data}
                dataPerPage={rowsPerPage}
                getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
                getEmptyRows={(emptyRows) => {
                  // setEmptyRows(emptyRows);
                }}
              />
            </TableContainer>
          )}
        </div>
      )}
      {isSearchGroupUser && (
        <div className="audience-created-group-data dpb">
          {data?.length > 0 && (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Firstname</TableCell>
                    <TableCell align="right">Lastname</TableCell>
                    <TableCell align="right">Mobile</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(
                      pageNumber * rowsPerPage,
                      pageNumber * rowsPerPage + rowsPerPage
                    )
                    .map((group, index) => {
                      const {
                        firstName,
                        lastName,
                        mobile,
                        email,
                        countryName,
                        gender,
                      } = group;
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {firstName}
                          </TableCell>
                          <TableCell align="right">{lastName}</TableCell>
                          <TableCell align="right">{mobile}</TableCell>
                          <TableCell align="right">{email}</TableCell>
                          <TableCell align="right">{countryName}</TableCell>
                          <TableCell align="right">{gender}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>

              <Pagination
                data={data}
                dataPerPage={rowsPerPage}
                getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
                getEmptyRows={(emptyRows) => {
                  // setEmptyRows(emptyRows);
                }}
              />
            </TableContainer>
          )}
        </div>
      )}
    </>
  );
};

export default ViewGroupUserRecord;
