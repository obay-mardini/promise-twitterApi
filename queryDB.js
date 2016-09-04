var pg = require('pg');
var str = 'postgres://test:' + require('./password.json').test + '@localhost:5432/users';

function filterTable(city, color, age) {
  var client = new pg.Client(str);
  client.connect();
  client.on('error', function(err){
    console.log(err)
  });
  client.on('end', function(res){
    //console.log(res)
  });

   var query = "select * from user_names JOIN user_profiles ON user_names.id=user_profiles.id";
   var arr = [];
   var count = 1;
   if(city || color || age){
     query += ' where ';
   }

   if(city){
     query += 'city = $' + count + '';
     arr.push(city);
     count ++;
   }
   if (color) {
     if(count === 2) query += ' and ';
     query += 'color = $' + count + '';
     arr.push(color);
     count++;
   }
   if (age) {
     if(count === 2 || count === 3) query += ' and '
     query += 'age = $' + count + '';
     arr.push(age);
   }

  //var query = "select * from user_names JOIN user_profiles ON user_names.id=user_profiles.id where age = 26";
  return new Promise(function(resolve, reject) {
    client.query(query,arr, function(err,results) {
      resolve(results.rows);
      client.end();
    });
  }).catch(function(err){
    console.log(err);
  });
}

function makeUserProfileTable(age,city,url,color,id){
  var client = new pg.Client(str);
  client.connect();
  client.on('error', function(err){
    console.log(err)
  });
  client.on('end', function(res){
    //console.log(res)
  });

  var query = 'INSERT INTO user_profiles (age,city,url,color,id) VALUES ($1, $2, $3, $4, $5) returning *;'

  return new Promise(function(resolve, reject){

    client.query(query,[age,city,url, color,id], function(err, results) {
      console.log(results)
      resolve(results)
      client.end();
    });
  })

}

function sendQuery(name, lastName){
  var client = new pg.Client(str);
  client.connect();
  client.on('error', function(err){
    console.log(err)
  });
  client.on('end', function(res){
    //console.log(res)
  });
  return new Promise(function(resolve, reject) {
    var query = "INSERT INTO user_names (name, lastname) VALUES ($1, $2) returning id;";
      client.query(query,[name, lastName], function(err, results) {
        console.log(results);
        resolve(results.rows[0].id);
        client.end();
    });
  });
}

function joinTables(name, lastName){
  var client = new pg.Client(str);
  client.connect();
  client.on('error', function(err){
    console.log(err)
  });
  client.on('end', function(res){
    //console.log(res)
  });
  return new Promise(function(resolve, reject) {
    var query = "select * from user_names JOIN user_profiles ON user_names.id=user_profiles.id;";
      client.query(query,[], function(err, results) {
        resolve(results.rows);
        client.end();
    });
  });
}

function constructUsersTable() {
  var client = new pg.Client(str);
  client.connect();
  client.on('error', function(err){
    console.log(err);
  });
  client.on('end', function(res){
    //console.log(res);
  });
  var query = "SELECT * FROM user_names";
    client.query(query,[], function(err, results) {
      client.end();
  });
}
exports.filterTable = filterTable;
exports.constructUsersTable = constructUsersTable;
exports.joinTables = joinTables;
exports.sendQuery = sendQuery;
exports.makeUserProfileTable = makeUserProfileTable;
