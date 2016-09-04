var promiseHttps = require('./promisfiedHttp.js');
var base64 = Buffer(require('./password.json').password).toString('base64');
var myTweets = 'something';

function getTokens() {
  var options = {
    //The url we want is `www.nodejitsu.com:1337/`
    host: 'api.twitter.com',
    path: '/oauth2/token',
    //since we are listening on a custom port, we need to specify it by hand
    port: '443',
    //This is what changes the request to a POST request
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Basic ' + base64// Bearer
    }
  };

  return  promiseHttps.makeHttpsRequest(options,'grant_type=client_credentials').catch(function(err){
      console.log(err)
    });
}

function search(key){
  options2 ={
    host: 'api.twitter.com',
    path: '/1.1/statuses/user_timeline.json?screen_name=' + 'theOnion' + '&count=20',
    //since we are listening on a cus
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + key.access_token
    }
  };

  return promiseHttps.makeHttpsRequest(options2, '');

}

exports.search = search;
exports.getTokens = getTokens;
