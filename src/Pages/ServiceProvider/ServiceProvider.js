// libs
import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// src
// import FAEAutoComplete from "../../Components/FAEAutoComplete";
import { FAEAutoComplete } from "@findanexpert-fae/components/dist/stories/FAEAutoComplete/FAEAutoComplete";
import Pagination from "../../Components/Pagination";

// scss
import "./ServiceProvider.scss";
import { getCookies } from "../../utils";
import Loader from "../../Components/Loader/Loader";

const ServiceProvider = () => {
  const [countries, setCountries] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [country, setCountry] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userId, setUserId] = useState(getCookies("userId") ?? null);

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch(
      `https://expertcrmapi-dev.findanexpert.net/api/Providers/ProvidersByClinic?UserId=${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data==>", data.result)
        setProviderList(data.result);
        setLoading(false)
      });
  }, []);

 

  const handleChangeCountry = (value) => {
    setCountry(value);
  };

  useEffect(() => {
    console.log(country);
    console.log(providerList);
  });


  return (
    <>
    {loading ?  
    <Loader/>
    :
      <div className="industries-container dpl dpr">
        <div className="industries-wrapper dpt">
          
        <strong style={{padding: "0px 0px 0px 20px", fontSize: "18px"}}>Provider Detail</strong>
        <div  style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
         {providerList.map((item, index) => (
          <div style={{padding: "7px"}}>
            <div style={{padding: "10px 0px 10px 8px", marginBottom: "20px", border: "1px solid lightGray", borderRadius: "10px"}}>
            <p>Name: {item.firstName}</p>
            <p>Email: {item.email}</p>
            <p>Mobile: {item.mobile}</p>
            </div>

            <div className="">
              {item.getAvailability?.length > 0 && (
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>Availability</TableCell>
                      <TableCell>Time from</TableCell>
                      <TableCell>Time to</TableCell>

                       </TableRow>
                       
                    </TableHead>
                    <TableBody>
                      {item.getAvailability
                        .slice(
                          pageNumber * rowsPerPage,
                          pageNumber * rowsPerPage + rowsPerPage
                        )
                        .map((group, index) => {
                          const { day, timefrom, timeto, isavailable } = group;
                          return (
                            <TableRow key={index} className={index%2 === 0 ? "" : "table-row-light-bg-color"}>
                              <TableCell component="th" scope="row">
                                {day}
                              </TableCell>

                              <TableCell component="th" scope="row">
                                {isavailable ? "Yes" : "No"}
                              </TableCell>

                              <TableCell component="th" scope="row">
                                {timefrom}
                              </TableCell>

                              <TableCell component="th" scope="row">
                                {timeto}
                              </TableCell>
                             </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>

                  {/* <Pagination
                    data={industries}
                    dataPerPage={rowsPerPage}
                    getPageNumber={(pageNumber) => setPageNumber(pageNumber)}
                    getEmptyRows={(emptyRows) => {
                     }}
                  /> */}
                </TableContainer>
              )}
            </div>







             {/* {item.getAvailability.map((item1,index) => (
            <div style={{display: "flex", padding: "5px 0px"}}>
            <p style={{width: "100px"}}> Availability  {item1.isavailable ? "Yes" : "No"}</p>
            <p style={{width: "100px"}}> Day  {item1.day}</p>
            <p style={{width: "110px"}}>  Time from   {item1.timefrom}</p>
            <p style={{width: "80px"}}> Time to  {item1.timeto}</p>
            </div>
            ))} */}


            </div>
         ))

         }
          </div>


             





        </div>
      </div>}
    </>
  );
};

export default ServiceProvider;
