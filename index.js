//core, renders webpage 
var express = require('express');
var app = express();

//local development:
app.set('port', (8000));

//deployed:
// app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/inputs', function(request, response) {
  response.render('pages/inputs');
});
app.get('/congrats', function(request, response) {
  response.render('pages/congrats');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


