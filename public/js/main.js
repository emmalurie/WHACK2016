 var CLIENT_ID = '230882099456-jh4c3rdlvh0rgmpi9gvnvmbgubh3evvs.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];

/**
 * Check if current user has authorized this application.
 */
function checkAuthLogin() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResultLogin);
}

function checkAuthInputs() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResultInputs);
}
/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResultLogin(authResult) {
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    // authorizeDiv.style.display = 'none';
    // loadCalendarApi();
    window.location = '/inputs';
  }
}


function handleAuthResultInputs(authResult) {
  if (!(authResult && !authResult.error)) {
    window.location = '/';
  }
}
/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResultLogin);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function handleInputSubmit() {
  // use Jquery to get inputs on page
  startCalendarScan();
  
  // get calendar events for the next week
  //scan through calendar events to find where to place new events
  //send request to google to add new events
  //display new events to user
  return null;
}

function startCalendarScan() {
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 100,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;

    console.log(events);
    var habit =jQuery("#habit").val();
    var time = parseInt(jQuery("#time").val(), 10);
    

    var start; 
    var end; 

    console.log(habit);
    console.log(time); 

    var newEvents = [];
      //console.log(data);
    for (i = 1; i < events.length; i++){
      console.log(events[i]);
      end = new Date(events[i - 1]["end"]["dateTime"]);
      start = new Date(events[i]["start"]["dateTime"]);
      console.log(enoughTime(end, start, time));
      var enough = enoughTime(end, start, time);


     //start = data[i]["start"]["dateTime"];
    }
   

    //succesfful adding of event



    // if (events.length > 0) {
    //   for (i = 0; i < events.length; i++) {
    //     var event = events[i];
    //     var when = event.start.dateTime;
    //     if (!when) {
    //       when = event.start.date;
    //     }
    //     appendPre(event.summary + ' (' + when + ')')
    //   }
    // } 

  });
  function enoughTime(event1, event2, timeSpan){
    debugger
    if (event1.getDate()===(event2.getDate())){
      var time1 = (event1.getHours() * 60) + (event1.getMinutes());
      var time2 = (event2.getHours() * 60) + (event2.getMinutes());
     // var newDate = new Date();

      if (time2 - time1 > timeSpan){
       return newDate(event1.getHours()); 
      } else {
      return null;
      }

    } else if(event1.getHours() + timeSpan < 22){
        return newDate(event1.getHours()); 
    } else if (event2.getHours - timeSpan > 7){
        return newDate(event2.getHours()); 
    } else {
      return false; 
    }
  }
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */



// function appendPre(message) {
//   //send message to display page

//   var pre = document.getElementById('output');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }