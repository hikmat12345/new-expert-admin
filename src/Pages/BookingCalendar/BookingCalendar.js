import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interationPlugin from "@fullcalendar/interaction";
//import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import Modal from "react-modal";

const BookingCalendar = () => {
  let dataapi = [];
  let resourceapi = [];
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState("2021-10-27");
  const [modalData, setModalData] = useState([]);
  const [modalCreate, setModalCreate] = useState(false);
  const [resource, setResource] = useState([]);
  const [ToggleModal, setToggleModal] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    let data = {
      PageNumber: 1,
      RowsOfPage: 15,
      BusinessId: 0,
      Type: 1,
    };
    fetch("http://newadminapi-dev.findanexpert.net/api/Booking", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res.bookingList);
        //setData(res.bookingList)
        res.bookingList.map(
          (m) => (
            resourceapi.push({
              id: m.userId,
              title: m.customerName,
            }),
            dataapi.push({
              resourceId: m.userId,
              id: m.id,
              title: m.serviceTypeName,
              description: m.serviceTypeName,
              start: m.createdon,
              end: m.createdon,
              color: "#6857F2",
            })
          )
        );
      });
    //allocated
    data = {
      PageNumber: 1,
      RowsOfPage: 15,
      BusinessId: 0,
      Type: 2,
    };
    fetch("http://newadminapi-dev.findanexpert.net/api/Booking", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res.bookingList);
        //setData(res.bookingList)
        res.bookingList.map(
          (m) => (
            resourceapi.push({
              id: m.userId,
              title: m.customerName,
            }),
            dataapi.push({
              resourceId: m.userId,
              id: m.id,
              title: m.serviceTypeName,
              description: m.serviceTypeName,
              start: m.createdon,
              end: m.createdon,
              color: "#265728",
            })
          )
        );
      });
    data = {
      PageNumber: 1,
      RowsOfPage: 15,
      BusinessId: 0,
      Type: 3,
    };
    fetch("http://newadminapi-dev.findanexpert.net/api/Booking", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res.bookingList);
        //setData(res.bookingList)
        res.bookingList.map(
          (m) => (
            resourceapi.push({
              id: m.userId,
              title: m.customerName,
            }),
            dataapi.push({
              resourceId: m.userId,
              id: m.id,
              title: m.serviceTypeName,
              description: m.serviceTypeName,
              start: m.createdon,
              end: m.createdon,
              color: "#eeff00",
            })
          )
        );
      });
    data = {
      PageNumber: 1,
      RowsOfPage: 15,
      BusinessId: 0,
      Type: 4,
    };
    fetch("http://newadminapi-dev.findanexpert.net/api/Booking", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res.bookingList);
        //setData(res.bookingList)
        res.bookingList.map(
          (m) => (
            resourceapi.push({
              id: m.userId,
              title: m.customerName,
            }),
            dataapi.push({
              resourceId: m.userId,
              id: m.id,
              title: m.serviceTypeName,
              description: m.serviceTypeName,
              start: m.createdon,
              end: m.createdon,
              color: "#ff0000",
            })
          )
        );
        console.log(dataapi);
        setData(dataapi);
        setResource(resourceapi);
      });
  }, []);

  //     let e=[]
  //     let data={
  //         "PageNumber": 1,
  //         "RowsOfPage": 15,
  //         "BusinessId": 0,
  //         "Type": 1
  //     };
  //     console.log("data"+JSON.stringify(data));
  //     fetch('http://newadminapi-preprod.findanexpert.net/api/Booking',{
  //     method: 'POST',
  //     headers:{'Content-type':'application/json'},
  //     body: JSON.stringify(data)
  //     }).then(r=>r.json()).then(res=>{

  //     //console.log(res.bookingList)
  //     //setData(res.bookingList)
  //     res.bookingList.map(m=>(
  //         e.push({id : m.id,
  //             title : m.serviceTypeName,
  //             start : m.bookingDate,
  //             color  : '#1d00ff'
  //         })
  //     ))

  //     });

  //      data={
  //         "PageNumber": 1,
  //         "RowsOfPage": 15,
  //         "BusinessId": 0,
  //         "Type": 2
  //     };
  //     console.log("data"+JSON.stringify(data));
  //     fetch('http://newadminapi-preprod.findanexpert.net/api/Booking',{
  //     method: 'POST',
  //     headers:{'Content-type':'application/json'},
  //     body: JSON.stringify(data)
  //     }).then(r=>r.json()).then(res=>{

  //     //console.log(res.bookingList)
  //     //setData(res.bookingList)
  //     res.bookingList.map(m=>(
  //         e.push({id : m.id,
  //             title : m.serviceTypeName,
  //             start : m.bookingDate,
  //             color  : '#008000'
  //         })
  //     ))

  //     });

  //      data={
  //         "PageNumber": 1,
  //         "RowsOfPage": 15,
  //         "BusinessId": 0,
  //         "Type": 3
  //     };
  //     console.log("data"+JSON.stringify(data));
  //     fetch('http://newadminapi-preprod.findanexpert.net/api/Booking',{
  //     method: 'POST',
  //     headers:{'Content-type':'application/json'},
  //     body: JSON.stringify(data)
  //     }).then(r=>r.json()).then(res=>{
  //     //console.log(res.bookingList)
  //     //setData(res.bookingList)
  //     res.bookingList.map(m=>(
  //         e.push({id : m.id,
  //             title : m.serviceTypeName,
  //             start : m.bookingDate,
  //             color  : '#eeff00'
  //         })
  //     ))

  //     });

  //      data={
  //         "PageNumber": 1,
  //         "RowsOfPage": 15,
  //         "BusinessId": 0,
  //         "Type": 4
  //     };
  //     console.log("data"+JSON.stringify(data));
  //     fetch('http://newadminapi-preprod.findanexpert.net/api/Booking',{
  //     method: 'POST',
  //     headers:{'Content-type':'application/json'},
  //     body: JSON.stringify(data)
  //     }).then(r=>r.json()).then(res=>{

  //     //console.log(res.bookingList)
  //     //setData(res.bookingList)
  //     res.bookingList.map(m=>(
  //         e.push({id : m.id,
  //             title : m.serviceTypeName,
  //             start : m.bookingDate,
  //             color  : '#ff0000'
  //         })
  //     ))
  //     setData(e)
  //     });

  const handleEvent = (e) => {
    console.log(e.event._def);
    setToggleModal(true);
  };
  const handleAddEvent = (e) => {
    //console.log(e.date)
  };
  const stop = () => {
    setToggleModal(false);
    setModalCreate(false);
  };
  const handleSelect = (e) => {
    console.log(parseInt(Math.random() * 10000));
    console.log(e.resource._resource.id);
    console.log(e.startStr.split("T")[0]);
    setModalData(
      {
        start: e.startStr,
        end: e.endStr,
      },
      console.log(modalData),
      dataapi.push({
        resourceId: e.resource._resource.id,
        id: parseInt(Math.random() * 10000),
        title: "new service",
        description: "new service",
        start: e.startStr,
        end: e.endStr,
        color: "#6857F2",
      }),

      //setData(dataapi),
      setModalCreate(true)
    );
  };
  const handleLeave = (e) => {
    console.log(e);
  };

  return (
    <div className="content">
      {}
      <Modal isOpen={ToggleModal} style={customStyles}>
        <h1></h1>

        <button onClick={stop}>save changes</button>
      </Modal>

      <Modal isOpen={false} style={customStyles}>
        <h1>Create Event</h1>

        <button onClick={stop}>save changes</button>
      </Modal>
      <center> <h1>Booking Calender</h1></center>

      <div style={{padding:'15px'}}>
        {ToggleModal == false && (
          <FullCalendar
            schedulerLicenseKey="0216257263-fcs-1626084820"
            plugins={[resourceTimeGridPlugin, interationPlugin]}
            initialView="resourceTimeGridDay"
            initialDate={currentDate}
            timeZone="UTC"
            //slotMinTime=''
            resources={resource}
            events={data}
            // data.map(m=>(

            //     {id : m.id,
            //         title : m.customerName,
            //         start : m.bookingDate}

            // ))
            editable={true}
            //         eventMouseEnter={(info)=> {
            //         console.log(info.event._def.extendedProps.description)
            //         var tooltip = new Tooltip(info.el, {
            //         title: info.event.extendedProps.description,
            //         placement: 'top',
            //         trigger: 'hover',
            //         container: 'body'
            //   });

            //        }}
            eventClick={handleEvent}
            dateClick={handleAddEvent}
            selectable={true}
            select={handleSelect}
            drop={handleLeave}
            eventResize={handleLeave}
            eventDrop={handleLeave}
          />
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
