var search = require('./httpModule');
var express = require('express');
var fs = require('fs')
var app = express();
var staticProjects = express.static(__dirname + '/projects');

app.use(staticProjects);
// recieve a request
app.get('/twitter', function(req, res){
  new Promise(function(resolve, reject){
    resolve(search.getTokens('theOnion'))
  }).then(function(val){
    res.write(JSON.stringify(val));
    res.end();
  }).catch(function(err){
    console.log(err);
  });
});
app.listen(8080);
