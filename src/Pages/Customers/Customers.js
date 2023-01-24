// libs
import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// src
// import FAEAutoComplete from "../../Components/FAEAutoComplete";
import { FAEAutoComplete } from "@findanexpert-fae/components/dist/stories/FAEAutoComplete/FAEAutoComplete";
import Pagination from "../../Components/Pagination";
import { getCookies, noRecordFoundMsg } from "../../utils";


// scss
import "./Customers.scss";

const Customers = () => {
  const [countries, setCountries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [country, setCountry] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userId, setUserId] = useState(getCookies("userId") ?? null);



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
    country !== null &&
      typeof country !== "string" &&
      fetch(
        `https://newadminapi-dev.findanexpert.net/api/Customer/${userId}/${country}`
      )
        .then((response) => response.json())
        .then((data) => 
        (
          setCustomers(data.customerlist)),
          setIsLoaded(true)
        )
        .catch((err) => console.log(err));
  }, [country]);

  const handleChangeCountry = (value) => {
    setCountry(value);
  };

  useEffect(() => {
    console.log("country ==> ",country);
    console.log("industries ==> ", customers);
  });

  return (
    <>
      <div className="industries-container dpl dpr">
        <div className="industries-wrapper dpt">
          <p className="title_alignment_with_table">Country</p>
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
            <strong className="title_alignment_with_table">
            {isLoaded ? "Customers" : ''}
            </strong>
              {customers?.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>Email</TableCell>
                        {/* <TableCell align="right">Lastname</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers
                        .slice(
                          pageNumber * rowsPerPage,
                          pageNumber * rowsPerPage + rowsPerPage
                        )
                        .map((group, index) => {
                          console.log(index, group)
                          const { industryName } = group;
                          return (
                            <TableRow key={index} className={index%2 === 0 ? "" : "table-row-light-bg-color"}>
                              <TableCell component="th" scope="row">
                                {group.firstName}
 
                              </TableCell>
                              <TableCell component="th" scope="row">
                                 {group.lastName}

                              </TableCell>

                              <TableCell component="th" scope="row">
                                 {group.mobile}

                              </TableCell>

                              <TableCell component="th" scope="row">
                                 {group.email}

                              </TableCell>
                             </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>

                  <Pagination
                    data={customers}
                    dataPerPage={rowsPerPage}
                    getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
                    getEmptyRows={(emptyRows) => {
                      // setEmptyRows(emptyRows);
                    }}
                  />
                </TableContainer>
              )
              :
              noRecordFoundMsg(isLoaded ? "No record found" : '')
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
