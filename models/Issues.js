var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
  title: String,
  text: String,
  created_by: String,
  comments: Array  
});

module.exports = mongoose.model('issues', issueSchema );