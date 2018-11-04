const Issues = require("../models/Issues.js");

var mongodb = require("mongodb");
var mongoose = require("mongoose");
var client = mongodb.MongoClient;

class IssueManager {
  
  addIssue(obj) {
    return new Promise((resolve, reject) => {
      
      console.log("addIssue called.");
      console.dir(obj);
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
  
  updateIssue(obj) {
    return new Promise((resolve, reject) => {
      console.log("updateIssue called");
      console.dir(obj);
      var id = obj._id;
      var updatedObj = {};
      updatedObj.title = obj.issue_title;
      updatedObj.text = obj.issue_text;
      updatedObj.status_text = obj.status_text;
      updatedObj.updated_on = Date.now();
      if (obj.open == 'false') {updatedObj.open = false;} else { updatedObj.open = true; }
      
      var setObj = {$set: updatedObj};
      console.dir(setObj);
      Issues.findByIdAndUpdate(mongoose.Types.ObjectId(id), setObj, {new:true}, function(err,doc) {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (doc) {
          console.log("Doc to update found!");
          console.dir(doc); 
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
  
  deleteAll() {
    return new Promise((resolve, reject) => {
      Books.remove({}, function (err) {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
  
  deleteBook(bookId) {
    return new Promise((resolve, reject) => {
      Books.findByIdAndRemove(bookId, function(err, book) {
        if (err) {
          //console.dir(err);
          reject("Unable to fetch book for deletion");
        }
        resolve(book);
      });
    });
  }
  
  getBook(bookId) {
    return new Promise((resolve, reject) => {
      Books.findById(bookId, function(err, book) {
        if (err) {
          console.dir(err);
          reject("Unable to find or fetch book");
        }
        resolve(book);
      });
    });
  }
  
  listBooks() {
    console.log("listbooks called");
    return new Promise((resolve, reject) => {
      Books.aggregate([
          {$match: {}}, 
          {$project: { _id: 1, title: 1, commentcount: { $size: "$comments"}}}])
      .exec(function (err, res) {
        if (err) {reject(err);}
        resolve(res); // [ { maxBalance: 98 } ]
        });
    });
  }
}

module.exports = IssueManager;

