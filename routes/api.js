/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var Issue = require('../models/Issues.js');
var IssueManager = require('../controllers/IssueManager.js');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      var query = Object.assign({}, req.query, {project:project});
      
      Issue.find(query, null, null, function(err, docs) {
        if (err) {
          console.error(err);
          res.status(500).json({err: err});
        }
        res.json(docs);
      });
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      console.log("Inside POST");
      //console.dir(req); 
      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        res.status(500).json({error: "Required fields missing"});
        return false;
      }
      var im = new IssueManager();
      im.addIssue({
        project: req.params.project,
        title: req.body.issue_title,
        text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text})
      .then(function(result) { res.json({issueCreated: true, result: result}) }, function (error) { res.status(500).json({issueCreated: false, status:"Error creating issue."}) });
    
    })
    
    .put(function (req, res){       
      console.log("Inside PUT");
      if (!(req.body._id)) {
        res.status(500).json({error: "ID Missing"});
        return false;
      }
      console.dir(req);  
      var im = new IssueManager();
      im.updateIssue(req.body).then(function(result) {
        console.log("At then!!!");
        res.json(result);}, function(err) { res.status(500).json(err) } );
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      console.log("Inside DELETE!");
      if (!(req.body._id)) {
        res.status(500).json({error: "ID Missing"});
        return false;
      }
      var im = new IssueManager();
      im.deleteIssue(req.body._id).then(function(result) {
        console.log("Here is result");
        console.dir(result);
        res.json(result);}, function(err) { res.status(500).json(err);}
      );
      
    });
    
};
