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

// scss
import "./Industries.scss";

const Industries = () => {
  const [countries, setCountries] = useState([]);
  const [industries, setIndustries] = useState([]);
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
        `https://newadminapi-dev.findanexpert.net/api/Industry/${country}`
      )
        .then((response) => response.json())
        .then((data) => setIndustries(data.industrylist))
        .catch((err) => console.log(err));
  }, [country]);

  const handleChangeCountry = (value) => {
    setCountry(value);
  };

  useEffect(() => {
    console.log(country);
    console.log(industries);
  });

  return (
    <>
      <div className="industries-container dpl dpr">
        <div className="industries-wrapper dpt">
          <p className="title_alignment_with_table">Industries</p>
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
              {industries?.length > 0 && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Industry Name</TableCell>
                        {/* <TableCell align="right">Lastname</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {industries
                        .slice(
                          pageNumber * rowsPerPage,
                          pageNumber * rowsPerPage + rowsPerPage
                        )
                        .map((group, index) => {
                          const { industryName } = group;
                          return (
                            <TableRow key={index} className={index%2 === 0 ? "" : "table-row-light-bg-color"}>
                              <TableCell component="th" scope="row">
                                {industryName}
                              </TableCell>
                              {/* <TableCell align="right">{lastName}</TableCell> */}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>

                  <Pagination
                    data={industries}
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

export default Industries;
