// libs
import React, { useState, useEffect } from "react";
import { FAEAutoComplete } from "@findanexpert-fae/components/dist/stories/FAEAutoComplete/FAEAutoComplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// src
import Pagination from "../../Components/Pagination";

const AdminUsers = () => {
  const [countries, setCountries] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [country, setCountry] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch(
      `https://newadminapi-dev.findanexpert.net/api/Country`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countrylist);
      });
  }, []);

  useEffect(() => {
    console.log(countries, "country ===>");
    country !== "" &&
      fetch(
        `https://marketing-dev.findanexpert.net/api/SearchUsers/AdminUserByCountry/${country}`
      )
        .then((response) => response.json())
        .then((data) => setAdminUsers(data.result))
        .catch((err) => console.log(err));
  }, [country]);

  const handleChangeCountry = (value) => {
    console.log(value,'gdfgdf');
    setCountry(value);
  };

  return (
    <>
      <div className="admin-users-container dpr dpl">
        <div className="admin-users-wrapper dpt">
          <p className="title_alignment_with_table">Admin Users</p>
          <FAEAutoComplete
            className="industries-autocomplete"
            placeholder="choose country"
            values={countries.map((country) => ({
              label: country.name,
              value: country.id,
            }))}
            getSelectedValue={handleChangeCountry}
          />

          <div className="industries">
            <div className="dpt">
              {adminUsers?.length > 0 && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Firstname</TableCell>
                        <TableCell align="right">Lastname</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Mobile</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminUsers
                        .slice(
                          pageNumber * rowsPerPage,
                          pageNumber * rowsPerPage + rowsPerPage
                        )
                        .map((group, index) => {
                          const { firstName, lastName, email, mobile } = group;
                          return (
                            <TableRow key={index} className={index%2 === 0 ? "" : "table-row-light-bg-color"}>
                              <TableCell component="th" scope="row">
                                {firstName}
                              </TableCell>
                              <TableCell align="right">{lastName}</TableCell>
                              <TableCell align="right">{email}</TableCell>
                              <TableCell align="right">{mobile}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>

                  <Pagination
                    data={adminUsers}
                    dataPerPage={rowsPerPage}
                    getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
                    getEmptyRows={(emptyRows) => {
                      // setEmptyRows(emptyRows);
                    }}
                  />
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
