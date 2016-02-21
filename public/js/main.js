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
      'immediate': true,
      cookie_policy: 'single_host_origin'

    }, handleAuthResultLogin);
}

function checkAuthInputs() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true,
      cookie_policy: 'single_host_origin'
    }, handleAuthResultInputs);
}

function signOut() {
  console.log("signing out");
  gapi.auth.signOut();
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
    var habit =jQuery("#habit").val();
    var time = parseInt(jQuery("#time").val(), 10);
    var start; 
    var end;  

    var newEvent; 
    for (i = 1; i < events.length; i++){
      end = new Date(events[i - 1]["end"]["dateTime"]);
      start = new Date(events[i]["start"]["dateTime"]);
      var enough = enoughTime(end, start, time);
      if (enough != null){
       newEvent = enough;
       break;
      }
    }
    var eventToAdd = createNewEvent(newEvent,time, habit);
    console.log(eventToAdd);
    addToCalendar(eventToAdd);
  });
}

function enoughTime(event1, event2, timeSpan){
  if (event1.getDate()===(event2.getDate())){
    if ((event2 - event1)/ 60000 > timeSpan){
      return event1;
    }else {
      return null;
    }
  } else if(event1.getHours() + (timeSpan / 60) < 22){
      return event1; 
  } else if (event2.getHours() - (timeSpan /60) > 7){
      return new Date(event2.setMinutes(date.getMinutes() - timeSpan)); 
  } else {
    return null; 
  }
}

function createNewEvent(date,timeSpan,habit){
  var start = new Date(date);
  var end = new Date(date.setMinutes(date.getMinutes() + timeSpan));
  console.log(start);
  console.log(end);
  var event = {
    'summary': habit,
    'description': 'Your GetGo goal!',
    'start': {
      'dateTime': start.toISOString(),
      'timeZone': 'America/New_York'
    },
    'end': {
      'dateTime': end.toISOString(),
      'timeZone': 'America/New_York'
    },
  };

  return event;


}

function addToCalendar(event){
  var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
  });

  request.execute(function(event) {
    console.log('Event created: ' + event.htmlLink);
    window.location = '/congrats';
  });
}


/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */

