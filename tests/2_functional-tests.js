/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;
var server = require('../server');
var IssueManager = require('../controllers/IssueManager.js');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test - Every field filled in',
          issue_text: 'text',
          created_by: 'Bob',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          console.log("At end res");
          //console.dir(res);
          assert.equal(res.status, 200);
                    
          //fill me in too!
          assert.isTrue(res.body.issueCreated, "Issue Created is true!");
          assert.isNotNaN(new Date(res.body.result.created_on).getDate(), "Parsed date should not be NaN!");
          assert.isNotNaN(new Date(res.body.result.updated_on).getDate(), "Parsed date should not be NaN!");
          assert.isTrue(res.body.result.open);
          assert.equal(res.body.result.title, 'Functional Test - Every field filled in');
          assert.equal(res.body.result.text, 'text');
          assert.equal(res.body.result.created_by, 'Bob');
          assert.equal(res.body.result.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.result.status_text, "In QA");
          done(); 
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test - Every field filled in2',
          issue_text: 'text2',
          created_by: 'Bob2'
//          assigned_to: 'Chai and Mocha',
//          status_text: 'In QA'
        })
        .end(function(err, res){
          console.log("At end res");
          //console.dir(res);
          assert.equal(res.status, 200);
                    
          //fill me in too!
          assert.isTrue(res.body.issueCreated, "Issue Created is true!");
          assert.isNotNaN(new Date(res.body.result.created_on).getDate(), "Parsed date should not be NaN!");
          assert.isNotNaN(new Date(res.body.result.updated_on).getDate(), "Parsed date should not be NaN!");
          assert.isTrue(res.body.result.open);
          assert.equal(res.body.result.title, 'Functional Test - Every field filled in2');
          assert.equal(res.body.result.text, 'text2');
          assert.equal(res.body.result.created_by, 'Bob2');
          done(); 
        });
      });
      
      
      test('Missing required field: Issue title', function(done) {
        console.log("Test: Missing require fields");
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: '',
          issue_text: 'text',
          created_by: 'Bob',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          console.log("At end res");
          //console.dir(res);
          assert.equal(res.status, 500);
          done(); 
        });
      });
      test('Missing required field: Issue text', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'aaa',
          issue_text: '',
          created_by: 'Bob',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          console.log("At end res");
          //console.dir(res);
          assert.equal(res.status, 500);
          done(); 
        });
      });
      test('Missing required field: Created by', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'fff',
          issue_text: 'ggg',
          created_by: '',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          console.log("At end res");
          //console.dir(res);
          assert.equal(res.status, 500);
          done(); 
        });
      }); 
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      test('No body', function(done) {
        this.timeout(15000);
        assert.isTrue(true);  
        console.log("Omitting body from PUT");
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test - Valid ID',
          issue_text: "Don't update the body",
          created_by: 'No body tester' 
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          console.log("Making sure result is the same as what was created..."); 
          console.dir(res.body);
          assert.equal(res.body.result.title, 'Functional Test - Valid ID');
          assert.equal(res.body.result.text, "Don't update the body");
          assert.equal(res.body.result.created_by, 'No body tester');
          var id2Put = res.body.result._id; 
          chai.request(server)
          .post('/api/issues/test')
          .send({id: id2Put,
                 issue_title: 'New title',
                 created_by: 'New created_by'})
          .end(function(err, res) {            
            console.log("at put omit body end res");
            console.dir(res);
            assert.equal(res.body.error, "Required fields missing");
            done();
          })
        });
      });
      
      test('One field to update', function(done) {
        this.timeout(15000);
        assert.isTrue(true);  
        console.log("One field to update...");
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test - One field to update',
          issue_text: "Update only one field",
          created_by: 'QA' 
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          console.log("Making sure result is the same as what was created..."); 
          console.dir(res.body);
          assert.equal(res.body.result.title, 'Functional Test - One field to update');
          assert.equal(res.body.result.text, "Update only one field");
          assert.equal(res.body.result.created_by, 'QA');
          var id2Put = res.body.result._id;
          console.log("The id to put is: " + id2Put); 
          chai.request(server)
          .put('/api/issues/test')
          .send({_id: id2Put, issue_title: 'Only one field was updated'})
          .end(function(err, res) {            
            console.log("checking res for only one updated field...");
            console.dir(res.body); 
            assert.equal(res.body.title, 'Only one field was updated');
            done();
          })
        });
      });
       
      test('Multiple fields to update', function(done) {
        this.timeout(15000);
        assert.isTrue(true);  
        console.log("One field to update...");
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test - More than one field to update',
          issue_text: "Update more than one field",
          created_by: 'QA' 
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          console.log("Making sure result is the same as what was created..."); 
          console.dir(res.body);
          assert.equal(res.body.result.title, 'Functional Test - More than one field to update');
          assert.equal(res.body.result.text, "Update more than one field");
          assert.equal(res.body.result.created_by, 'QA');
          var id2Put = res.body.result._id;
          console.log("The id to put is: " + id2Put);  
          chai.request(server)
          .put('/api/issues/test')
          .send({_id: id2Put, issue_title: 'More than one field was updated', issue_text: "For example, the body text" })
          .end(function(err, res) {            
            console.log("checking res for only one updated field...");
            console.dir(res.body); 
            assert.equal(res.body.title, 'More than one field was updated');
            assert.equal(res.body.text, "For example, the body text");
            done();
          })
        });
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
       
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          console.log("No filter response");
          //console.dir(res);
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'title');
          assert.property(res.body[0], 'text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/apitest?status_text=mouse')
        .end(function(err, res) {
          console.log("One filter response...");
          console.dir(res);
          assert.equal(res.body.length, 2); //Two matching this filter are already in DB
          done();
        })
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/apitest?status_text=mouse&created_by=roger')
        .end(function(err, res) {
          console.log("One filter response...");
          assert.equal(res.body.length, 1); //One matching this filter are already in DB
          done();
        })
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        console.log("Testing no _id");
        chai.request(server)
        .delete('/api/issues/test')
        .send({})
        .end(function(err,res){
          console.log("No _id response"); 
          assert.equal(res.status, 500);
          assert.equal(res.body.error, "ID Missing");
        done();
        })
      });
      
      test('Valid _id', function(done) {
        this.timeout(15000);
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Functional Test - Valid ID',
          issue_text: 'Is it Valid!???',
          created_by: 'Chai'
        })
        .end(function(err, res){
          assert.equal(res.status, 200); 
          var id2delete = res.body.result._id;
          var im = new IssueManager(); 
          im.deleteIssue(id2delete).then(doc => {
            console.log("Issue deleted!!!");
            done()
          }).catch(err => {
            assert.false(true);
            console.err(err); 
          });
          
      });
      
    });

  })
}); 
