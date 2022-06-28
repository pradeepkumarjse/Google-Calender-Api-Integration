import React, {useCallback , useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import moment from "moment";
//import parse from 'html-react-parser'
import { Button, Modal } from 'react-bootstrap';
import { Calendar, Views, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Link, NavLink as RouterNavLink, RouteComponentProps } from 'react-router-dom';


import mdx from './onSelectEvent.mdx'

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */

function formatDateTime(dateTime){
    return moment.utc(dateTime).local().format("dddd, MMMM DD, YYYY hh:mm a");
}
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// export default {
//     title: 'props',
//     component: Calendar,
//     parameters: {
//       docs: {
//         page: mdx,
//       },
//     },
//   }



  


  

export const CalenderData = (props) => { 
     
    const [show, setShow] = useState(false);
    const [modelEvent, setModelEvent] = useState([]);

    const eve =props.calenderData.map((data) => {   
        return {
            title: data.summary,                     
            start: new Date(formatDateTime(data.start.dateTime)),
            end: new Date(formatDateTime(data.end.dateTime)),
            organizer : data.organizer.organizer,
           // meetingUrl : data.onlineMeeting.joinUrl,
           // attendees: data.attendees                   
          }          
        }
                     
        ); 
       
    const handleShow = (event) => {
        setShow(true);

    }
    
    const handleClose = () => setShow(false);
   

    useEffect(() => {
        handleClose()
    }, [])

  
     
        
        let allViews = Object.keys(Views).map((k) => Views[k]);       

          const handleSelectedEvent = (event) => {
            setModelEvent(event);            
            handleShow();        
          };
         
   
    return (
 <>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <RouterNavLink to="/addmeeting"
        className="btn btn-success"
        exact>+ Add meeting</RouterNavLink>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <RouterNavLink to="/avail"
        className="btn btn-secondary"
        exact>Check MeetingAvailability</RouterNavLink> */}

        <Calendar          
          dayLayoutAlgorithm="no-overlap"          
          defaultView={Views.DAY}
          events={eve}
          localizer={localizer}
          // max={max}
          startAccessor="start"
          endAccessor="end"
          showMultiDayTimes
          step={30}
          views={allViews}
          //onSelectEvent={(event) =>handleSelectedEvent(event)}   
          style={{ height: "900px" , margin: "50px" }} 
         
        />

        {/* <Calendar 
        localizer={localizer}
        events={eve}        
        defaultView={Views.DAY}
        dayLayoutAlgorithm="no-overlap"
        views={allViews}
        defaultDate={defaultDate}
        showMultiDayTimes
        max={max}
        step={15}
        style={{ height: 300, margin: "50px" }} 

        /> */}
        <div id="profile-div">
            {/* <h1>Calender</h1> */}
            <Table>
            <thead>
                {/* <tr>
                    <th scope="col">Subject</th>
                    <th scope="col">Organizer</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Meeting Info</th>
                </tr> */}
            </thead>
            <tbody>
            {/* {eve.map(
                item=>(
             <tr key={item.id}>
             <td key={1}>{item.subject}</td>
             <td key={2}>{item.organizer.emailAddress.name}</td>
             <td key={3}>{formatDateTime(item.start.dateTime)}</td>
             <td key={3}>{formatDateTime(item.end.dateTime)}</td>
             <td key={3}>{parse(item.body.content)}</td>
         </tr>))
         
         } */}
         
         </tbody> 
         
         </Table>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
               {modelEvent.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body><div>
        <p>Start Time : {formatDateTime(modelEvent.start)} </p>
        <p>End Time &nbsp;&nbsp;: {formatDateTime(modelEvent.end)}</p>
        </div>   
        <h6>Organizer : {modelEvent.organizer}</h6>
               
        </Modal.Body>
        <Modal.Footer>
        <a href={modelEvent.meetingUrl}><Button variant="primary" onClick={handleClose}>
                    Join
                </Button></a>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
        </Modal.Footer>
    </Modal>


        </>
    );
};
