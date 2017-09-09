var express = require('express');
var http = require('http');
var PouchDB = require('pouchdb');

var router = express.Router();
var database = new PouchDB('http://localhost:5984/games_db');


//Retrieve all documents
router.get('/games', function(req, res, next) {
    database.allDocs({
        include_docs: true
    }).then(function(result) {
        res.send(result.rows.map(function(doc) {
            return doc.doc;
        }))
    }, function(err) {
       res.status(400).send(err);
    });
});

//Add a new document
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

//Update a document
router.put('/games', function(req, res, next) {
    database.get(req.body.id).then(function(result) {
        result.name = req.body.name;
        database.put(result);
        res.send(result);
    }, function(error) {
        res.status(400).send(error);
    });
});

//Remove a specific document
router.delete('/games', function(req, res, next) {
    database.get(req.body.id).then(function(doc) {
        return database.remove(doc);
    }).then(function (result) {
        res.send(result);
    }).catch(function (err) {
        console.log(err);
        res.send(err);
    })
});

module.exports = router;
