var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var openDate = Date.now();
var issueSchema = new Schema({
  project: {type: String, require:true},
  title: {type: String, required:true},
  text: {type: String, required:true},
  created_by: {type: String, required:true},
  assigned_to: {type: String, default:''},
  status_text: {type: String, default:''},
  created_on: { type: Date, default:openDate },
  updated_on: { type: Date, default:openDate},
  open: { type: Boolean, default:true }
  
});

module.exports = mongoose.model('issues', issueSchema );