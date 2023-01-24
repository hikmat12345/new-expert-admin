import { Box, Tab, Tabs } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { usePagination } from "@material-ui/lab/Pagination";

const BookingsTable = ({ data }) => {
  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Customer Name</TableCell>
          <TableCell align="right">Service Type Name</TableCell>
          <TableCell align="right">Mobile</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((group, index) => {
          const { customerName, serviceTypeName, mobile, status } = group;
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {customerName}
              </TableCell>
              <TableCell align="right">{serviceTypeName}</TableCell>
              <TableCell align="right">{mobile}</TableCell>
              <TableCell align="right">{status}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const BookingsTablePagination = ({ data, getBookings, bookingType }) => {
  const [allocatedPageNumber, setAllocatedPageNumber] = useState(1);

  const handleChangeAllocatedPage = (newPageNumber) => {
    setAllocatedPageNumber(newPageNumber);
  };

  return (
    <div className="pagination-container">
      <div className="pagination-wrapper">
        <ul className="pagination-ui">
          {data.map(({ page, type, selected, onClick, ...item }, index) => {
            let children = null;

            if (type === "start-ellipsis" || type === "end-ellipsis") {
              children = "…";
            } else if (type === "page") {
              children = (
                <button
                  type="button"
                  style={{
                    fontWeight: selected ? "bold" : undefined,
                  }}
                  {...item}
                  onClick={() => {
                    onClick();
                    getBookings(page, bookingType);
                    handleChangeAllocatedPage(page);
                  }}
                  className="page-number-btn"
                >
                  {page}
                </button>
              );
            } else if (type === "previous") {
              children = (
                <button
                  type="button"
                  {...item}
                  className="page-next-prev-btn"
                  onClick={() => {
                    onClick();
                    handleChangeAllocatedPage(allocatedPageNumber - 1);
                    getBookings(allocatedPageNumber - 1, bookingType);
                  }}
                >
                  Previous
                </button>
              );
            } else if (type === "next") {
              children = (
                <button
                  type="button"
                  {...item}
                  className="page-next-prev-btn"
                  onClick={() => {
                    onClick();
                    handleChangeAllocatedPage(allocatedPageNumber + 1);
                    getBookings(allocatedPageNumber + 1, bookingType);
                  }}
                >
                  Next
                </button>
              );
            }

            return <li key={index}>{children}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Bookings = () => {
  const [value, setValue] = useState(0);

  const [allocatedData, setAllocatedData] = useState([]);
  const [allocatedTotalRecords, setAllocatedTotalRecords] = useState(null);
  const [allocatedRowsPerPage, setAllocatedRowsPerPage] = useState(10);

  const [unAllocatedData, setUnAllocatedData] = useState([]);
  const [unAllocatedTotalRecords, setUnAllocatedTotalRecords] = useState(null);

  const [cancelledData, setCancelledData] = useState([]);
  const [cancelledTotalRecords, setCancelledTotalRecords] = useState(null);

  const [expiredData, setExpiredData] = useState([]);
  const [expiredTotalRecords, setExpiredTotalRecords] = useState(null);

  const { items: unAllocatedItems } = usePagination({
    count: Math.ceil(unAllocatedTotalRecords / allocatedRowsPerPage),
  });

  const { items: allocatedItems } = usePagination({
    count: Math.ceil(allocatedTotalRecords / allocatedRowsPerPage),
  });

  const { items: cancelledItems } = usePagination({
    count: Math.ceil(cancelledTotalRecords / allocatedRowsPerPage),
  });

  const { items: expiredItems } = usePagination({
    count: Math.ceil(expiredTotalRecords / allocatedRowsPerPage),
  });

  const getBookings = (pageNumber, Type) => {
    fetch(`https://newadminapi-dev.findanexpert.net/api/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        PageNumber: pageNumber,
        RowsOfPage: allocatedRowsPerPage,
        BusinessId: 0,
        Type: Type,
      }),
    })
      .then((response) => response.json())
      .then((data) => setAllocatedData(data.bookingList))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`https://newadminapi-dev.findanexpert.net/api/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        PageNumber: 1,
        RowsOfPage: allocatedRowsPerPage,
        BusinessId: 0,
        Type: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUnAllocatedData(data.bookingList);
        setUnAllocatedTotalRecords(data.totalRecords);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://newadminapi-dev.findanexpert.net/api/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        PageNumber: 1,
        RowsOfPage: allocatedRowsPerPage,
        BusinessId: 0,
        Type: 2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllocatedData(data.bookingList);
        setAllocatedTotalRecords(data.totalRecords);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://newadminapi-dev.findanexpert.net/api/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        PageNumber: 1,
        RowsOfPage: allocatedRowsPerPage,
        BusinessId: 0,
        Type: 3,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCancelledData(data.bookingList);
        setCancelledTotalRecords(data.totalRecords);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://newadminapi-dev.findanexpert.net/api/Booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        PageNumber: 1,
        RowsOfPage: allocatedRowsPerPage,
        BusinessId: 0,
        Type: 4,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setExpiredData(data.bookingList);
        setExpiredTotalRecords(data.totalRecords);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bookings-container dpr dpl">
        <div className="bookings-wrapper dpt">
          <p>Bookings</p>
          <div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  aria-label="basic tabs"
                >
                  <Tab label="UnAllocated" {...a11yProps(0)} />
                  <Tab label="Allocated" {...a11yProps(1)} />
                  <Tab label="Cancelled" {...a11yProps(2)} />
                  <Tab label="Expired" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {unAllocatedData?.length > 0 ? (
                  <TableContainer component={Paper}>
                    <BookingsTable data={unAllocatedData} />
                    <BookingsTablePagination
                      data={unAllocatedItems}
                      getBookings={getBookings}
                      bookingType={1}
                    />
                  </TableContainer>
                ) : (
                  <p>No records found</p>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {allocatedData?.length > 0 ? (
                  <TableContainer component={Paper}>
                    <BookingsTable data={allocatedData} />
                    <BookingsTablePagination
                      data={allocatedItems}
                      getBookings={getBookings}
                      bookingType={2}
                    />
                  </TableContainer>
                ) : (
                  <p>No records found</p>
                )}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {cancelledData?.length > 0 ? (
                  <TableContainer component={Paper}>
                    <BookingsTable data={cancelledData} />
                    <BookingsTablePagination
                      data={cancelledItems}
                      getBookings={getBookings}
                      bookingType={3}
                    />
                  </TableContainer>
                ) : (
                  <p>No records found</p>
                )}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {expiredData?.length > 0 ? (
                  <TableContainer component={Paper}>
                    <BookingsTable data={expiredData} />
                    <BookingsTablePagination
                      data={expiredItems}
                      getBookings={getBookings}
                      bookingType={4}
                    />
                  </TableContainer>
                ) : (
                  <p>No records found</p>
                )}
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
