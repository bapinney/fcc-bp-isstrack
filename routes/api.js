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
      im.addIssue({title: req.body.issue_title,
        text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text})
      .then(function(result) { res.json({issueCreated: true, result: result}) }, function (error) { res.status(500).json({issueCreated: false, status:"Error creating issue."}) });
    
    })
    
    .put(function (req, res){
      var project = req.params.project;
      //console.dir(req);
      console.log("Inside PUT");
      var im = new IssueManager();
      im.updateIssue(req.body).then(function(result) {
        console.log("At then!!!");
        res.json(result);}, function(err) { res.status(500).json(err) } );
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
