var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var openDate = Date.now();
var issueSchema = new Schema({
  title: {type: String, required:true},
  text: {type: String, required:true},
  created_by: {type: String, required:true},
  assigned_to: String,
  status_text: String,
  created_on: { type: Date, default:openDate },
  updated_on: { type: Date, default:openDate},
  open: { type: Boolean, default:true }
  
});

module.exports = mongoose.model('issues', issueSchema );