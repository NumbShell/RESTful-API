var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Retrieve all games.
router.get('/api/games', function(req, res, next) {
  res.json(db);
});

//Retrieve a game based on id.
router.get('/api/games/:id', function(req, res, next) {
    for(key in db.games) {
      if(db.games[key].id === req.params.id) {
        res.json(db.games[key]);
      }
    }
});

//Retrieve all games from a certain year.
router.get('/api/games/year/:year', function(req, res, next) {
    var packet = {};
    for(key in db.games) {
        var data = db.games[key].release.split(" ");
        var year = data[data.length-1];
        if(year === req.params.year) {
            packet[key] = db.games[key];
        }
    }
    res.json(packet);
    return console.log('Error');
});

//Add a new game.
router.post('/api/games', function(req, res, next) {
    var data = req.body;
    db.games[data.id] = data;
    res.json(data);
});

//Update a game based on id.
router.put('/api/games/:id', function(req, res, next) {
  /*
    Will be done when the database is added.
   */

});

//Delete a game based on id.
router.delete('/api/games/:id', function(req, res, next) {
    for(key in db.games) {
        if(db.games[key].id === req.params.id) {
            delete db.games[key];
            res.json(key);
        }
    }
});

module.exports = router;
