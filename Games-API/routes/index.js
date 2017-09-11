var express = require('express');
var http = require('http');
var PouchDB = require('pouchdb');

var router = express.Router();
var database = new PouchDB('http://localhost:5984/games_db');



//Sync with CouchDB
var sync = PouchDB.sync(database, 'http://localhost:5984/games_db', {
    live: true,
    retry: true
}).on('complete', function(info) {
    console.log("Database up to date");
}).on('error', function(err) {
    console.log(err);
});

//Retrieve all games
router.get('/games', function(req, res, next) {
    database.allDocs({
        include_docs: true
    }).then(function(result) {
        res.send(result.rows.map(function(doc) {
            return doc;
        }))
    }, function(err) {
       res.status(400).send(err);
    });
});

//Retrieve game made by company
router.get('/games/:company', function(req, res, next) {
    database.allDocs({
        include_docs: true
    }).then(function(result) {
        var games = [];
        result.rows.map(function(game) {
            if(game.doc.developers != undefined && game.doc.developers[0] === req.params.company) {
                games.push(game.doc);
            }
        });
        res.send(games);
    }, function(err) {
        res.status(400).send(err);
    });

});

//Add a new game
router.post('/games', function(req, res, next) {
    database.post({
        name: req.body.name
    }).then(function(response) {
        res.send(response);
    }).catch(function(err) {
        console.log(err);
        res.send(err);
    })
});

//Update a game
router.put('/games', function(req, res, next) {
    database.get(req.body.id).then(function(doc) {
        res.send(doc);
        database.put({
            _id: doc._id,
            _rev: doc._rev,
            name: req.body.name || doc.name,
            slug: req.body.slug || doc.slug,
            summary: req.body.summary || doc.summary,
            storyline: req.body.storyline || doc.storyline,
            total_rating: req.body.total_rating || doc.total_rating,
            total_rating_count: req.body.total_rating_count || doc.total_rating_count,
            genres: req.body.genres || doc.genres,
            publishers: req.body.publishers || doc.publishers,
            developers: req.body.developers || doc.developers,
            release_dates: req.body.release_dates || doc.release_dates,
            screenshots: req.body.screenshots || doc.screenshots,
            cover: req.body.cover || doc.cover,
            websites: req.body.websites || doc.websites
        });
    }).catch(function (err) {
        console.log(err);
    });
});

//Remove a specific game
router.delete('/games/:id', function(req, res, next) {
    database.get(req.params.id).then(function(doc) {
        return database.remove(doc);
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        console.log(err);
        res.send(err);
    })
});

module.exports = router;
