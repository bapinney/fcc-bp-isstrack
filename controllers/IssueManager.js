const Issues = require("../models/Issues.js");

var mongodb = require("mongodb");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var client = mongodb.MongoClient;

class IssueManager {
  
  addIssue(obj) {
    return new Promise((resolve, reject) => {
      
      console.log("addIssue called.");
      //console.dir(obj);
      if (!obj.created_by) reject("Created By field is required");
      if (!obj.assigned_to) obj.assigned_to = null;
      var issue = new Issues(obj);
      issue.save().then(doc => {
        resolve(doc);
      }).catch(err => {
            console.err(err);
            reject(err);          
          })
      });      
  }
  
  deleteIssue(obj) {
    console.log("delete issue called!");
    console.dir(obj);
    return new Promise((resolve, reject) => {
      Issues.findOneAndDelete({_id: ObjectId(obj)}, function(err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  };
  
  updateIssue(obj) {
    return new Promise((resolve, reject) => {
      console.log("updateIssue called");
      console.dir(obj);
      var id = obj._id;
      var updatedObj = {};
      updatedObj.updated_on = Date.now();
      if (obj.issue_title !== '') updatedObj.title = obj.issue_title;
      if (obj.issue_text !== '')  updatedObj.text = obj.issue_text;
      if (obj.assigned_to !== '') updatedObj.assigned_to = obj.assigned_to;
      if (obj.status_text !== '') updatedObj.status_text = obj.status_text;
      if (obj.created_by !== '')  updatedObj.created_by = obj.created_by;
      if (obj.open == 'false') {updatedObj.open = false;} else { updatedObj.open = true; }
      
      var setObj = {$set: updatedObj};
      //console.dir(setObj);
      Issues.findByIdAndUpdate(mongoose.Types.ObjectId(id), setObj, {new:true}, function(err,doc) {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (doc) {
          console.log("Updated doc found!");
          //console.dir(doc); 
          resolve(doc);
        }
      });
    });
  }
  
  addComment(bookId, comment) {
    return new Promise((resolve, reject) => {
      console.log("addComment called for " + bookId + ".");
      Issues.findById(bookId, function(err, book) {
        if (err) {
          //console.dir(err);
          reject("Unable to add comment");
        }
        book.comments.push(comment);
        book.save().then(doc => {
          resolve(doc);
        }).catch(err => {
            console.err(err);
            reject(err);
          })
      });
    });
  }
  
  getIssues(project, filter) {
    return new Promise((resolve, reject) => {
      //Issues.find({project: project}, null, {$sort : {title: 1});
      console.log("getIssues project is..");
      
      Issues.find(project, null, { sort: {title:1}}, function (err, docs) {
        if (err) reject(err);
        resolve(docs);
      });
    });
  
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      Issues.remove({}, function (err) {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
  
}

module.exports = IssueManager;

