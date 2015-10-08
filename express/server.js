// middlewares excepted from express 4.0
var express = require('express')
    , morgan = require('morgan') // logger
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , session = require('express-session')
    , cookieParser = require('cookie-parser')
    , favicon = require('static-favicon')
    , path = require('path')
    , errorHandler = require('errorhandler')
    , port = process.env.PORT || 3000;

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(favicon());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(methodOverride()); // simulate DELETE and PUT
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.get('/', function (req, res) {
  res.send('Hello World');
});
app.get('/index', function (req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log('running contact (v.0.0.1.x) dev server on server localhost, port ' + port + ' with ' + (app.get('env') || 'development') + 'mode');
});