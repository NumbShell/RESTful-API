var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();
var server = http.createServer(app);

//Dummy data
data = {
    'Dark Souls': {
        title: 'Dark Souls',
        desc: 'A hardcore game!',
        genres: [
            'action',
            'roleplay'
        ],
        developers: 'From Software',
        release: '2011',
        id: '0'
    },

    'World of Warcraft': {
        title: 'World of Warcraft',
        desc: 'A MMORPG',
        genres: [
            'mmorpg',
            'action',
            'adventure'
        ],
        developers: 'Blizzard',
        release: '2004',
        id: '1'
    },

    'Starcraft 2': {
        title: 'Starcraft 2',
        desc: 'A futuristic top-down strategy game',
        genres: [
            'strategy',
            'action',
        ],
        developers: 'Blizzard',
        release: '27 july 2010',
        id: '2'
    }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Listening to port 3000 (localhost)
server.listen(3000, function(err) {
    if(err) throw err;
   console.log('Express server Listening on port ' + server.address().port);
});

module.exports = app;
