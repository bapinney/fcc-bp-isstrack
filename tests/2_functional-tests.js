/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      /*
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
          console.dir(res);
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
      */
      test('Required fields filled in', function(done) {
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
          console.dir(res);
          assert.equal(res.status, 500);
          test2(); 
        });
        var test2 = function() {chai.request(server)
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
          console.dir(res);
          assert.equal(res.status, 500);
          done(); 
        });};
        var test3 = function() {chai.request(server)
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
          console.dir(res);
          assert.equal(res.status, 500);
          done(); 
        });};
      });
      
      test('Missing required fields', function(done) {
        
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        
      });
      
      test('One field to update', function(done) {
        
      });
      
      test('Multiple fields to update', function(done) {
        
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
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
        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        
      });
      
      test('Valid _id', function(done) {
        
      });
      
    });

});
