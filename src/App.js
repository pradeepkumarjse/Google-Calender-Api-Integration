import React,{useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import {  Switch, Route} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ScheduleInterview from "./ScheduleInterview";
import { CalenderData } from "./CalenderData";

function App() {


  const [calenderData, setCalenderData] = useState(null);

  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "";
  var API_KEY = "";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";


   const meet =()=>{
    
           

            // Schedule a meeting for june 20, 2022 at 1:45 PM
            // January = 0, February = 1, March = 2, and so on
            const eventStartDate = new Date(2022, 6, 20, 13, 45);

            // Set the meeting duration to 45 minutes
            const eventEndDate = new Date(eventStartDate.getTime());
            eventEndDate.setMinutes(eventEndDate.getMinutes() + 45);

            const meetingAttendees = [
              // {
              //   displayName: "Mohit",
              //   email: "pradeep@sgmail.com",
              //   responseStatus: "accepted",
              // },
              {
                email: "pradeep.yadav@realcoderz.in",
                responseStatus: "needsAction",
              },
              {
                email: "pradeep98.iimt@gmail.com",
                responseStatus: "needsAction",
              },
              {
                displayName: "McDonald",
                email: "pradeep847409@gmail.com",
                responseStatus: "needsAction",
              },
            ];
            const meetingReminders = [

              {
                method: "email",
                minutes: 24 * 60,
              },
              {
                method: "popup",
                minutes: 15,
              },
            ];
            const meetingRequestId = 898880;
            // const getEventDate = (eventDate) => {
            //   // Dates are computed as per the script's default timezone
            //   const timeZone = "UTC";

            //   // Format the datetime in `full-date T full-time` format
            //   return {
            //     timeZone,
            //     dateTime: Utilities.formatDate(eventDate, timeZone, "yyyy-MM-dd'T'HH:mm:ss"),
            //   };
            // };
            var request = gapi.client.calendar.events.insert(
              {
                calendarId: 'primary',
                summary: 'Teambuilder Ineterview',
                description: 'inteview phase 1',
              
                attendees: meetingAttendees,
                conferenceData: {
                  createRequest: {
                    requestId: meetingRequestId,
                    conferenceSolutionKey: {
                      type: 'hangoutsMeet',
                    },
                  },
                },
                start: {
                  dateTime: "2022-06-29T12:00:00-07:00",
                  timeZone: "America/Los_Angeles",
                },
                end:{
                  dateTime: "2022-06-29T18:00:00-07:00",
                  timeZone: "America/Los_Angeles",
                },
                guestsCanInviteOthers: false,
                guestsCanModify: false,
                status: 'confirmed',
                reminders: {
                  useDefault: false,
                  overrides: meetingReminders,
                },
                conferenceDataVersion: 1,
                sendNotifications: true 
              }
              
            );

            request.execute((event) => {
             
              window.open(event.htmlLink);
            });

            /*
            Uncomment the following block to get events
            */

            // get events
            // gapi.client.calendar.events.list({
            //   'calendarId': 'primary',
            //   'timeMin': (new Date()).toISOString(),
            //   'showDeleted': false,
            //   'singleEvents': true,
            //   'maxResults': 10,
            //   'orderBy': 'startTime'
            // }).then(response => { 
            //   setCalenderData(response.result.items);
            //   const events = response.result.items
            //   console.log('EVENTS: ', events)
            // })
            
          }
   







  const handleClick = () => {




    
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        plugin_name: "streamy",
      });

      gapi.client.load("calendar", "v3");      
    
      try {  
       

        gapi.auth2
          .getAuthInstance()
          .signIn()
          .then( (res) =>{
             JSON.stringify("<<<<<<<<<<",res);
          }

          );

          
      } catch (e) {
        console.log("Error" + e);
      }
    });
  };

  try{
   
  }
  catch(e){

  }






  return (
    <div className="App">
    <Router>
        <Switch>
          {/* <Route path="/add" component={ScheduleInterview} /> */}
          </Switch>
      <br />
      <br />
      <br />
      <br />
      <p>Click to add event to Google Calendar</p>
      {/* <p style={{fontSize: 18}}>Uncomment the get events code to get events</p>
        <p style={{fontSize: 18}}>Don't forget to add your Client Id and Api key</p> */}
      <button style={{ width: 100, height: 50 }} onClick={handleClick}>
        Add Event
      </button>

      <button style={{ width: 100, height: 50 }} onClick={meet}>
      send
      </button>

      {calenderData ? (
          <CalenderData calenderData={calenderData} />
        ) : <h1>Data not found</h1>}
      </Router>
    </div>
  );
}

export default App;
