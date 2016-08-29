var https = require('https');
exports.makeHttpsRequest = makeHttpsRequest
function makeHttpsRequest(options, body, val) {
  return new Promise(function(resolve, reject){
    var req = https.request(options, function(response) {
      var str = ''
      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', function () {
        resolve(JSON.parse(str));
      });
    });
    req.end(body);
  })
}
