// libs
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// src
import { FAEAutoComplete } from "@findanexpert-fae/components/dist/stories/FAEAutoComplete/FAEAutoComplete";
import Pagination from "../../Components/Pagination";

// scss
import "./Services.scss";

const Services = () => {
  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [country, setCountry] = useState(null);
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
    country !== null &&
      typeof country !== "string" &&
      fetch(
        `https://newadminapi-dev.findanexpert.net/api/Services/${country}`
      )
        .then((response) => response.json())
        .then((data) => setServices(data.servicesList))
        .catch((err) => console.log(err));
  }, [country]);

  const handleChangeCountry = (value) => {
    setCountry(value);
  };

  return (
    <>
      <div className="services-container dpr dpl">
        <div className="services-wrapper dpt">
          <p className="title_alignment_with_table">Services</p>
          <FAEAutoComplete
            className="services-autocomplete"
            placeholder="choose country"
            values={countries.map((country) => ({
              label: country.name,
              value: country.id,
            }))}
            getSelectedValue={handleChangeCountry}
          />

          <div className="industries">
            <div className="audience-created-group-data dpt">
              {services?.length > 0 && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Service Name</TableCell>
                        <TableCell align="right">Duration</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {services
                        .slice(
                          pageNumber * rowsPerPage,
                          pageNumber * rowsPerPage + rowsPerPage
                        )
                        .map((group, index) => {
                          const { serviceName, duration, price } = group;
                          return (
                            <TableRow key={index} className={index%2 === 0 ? "" : "table-row-light-bg-color"}>
                              <TableCell component="th" scope="row">
                                {serviceName}
                              </TableCell>
                              <TableCell align="right">{duration}</TableCell>
                              <TableCell align="right">{price}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>

                  <Pagination
                    data={services}
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

export default Services;
