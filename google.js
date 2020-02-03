/*-------------------------------------------------------------
  <Get Google Calendar' Information Module>
----------------------------------------------------------------*/
const https = require('https'); 
const util = require('util');

var requestAPI = function(request, callback) { // request : info for accesing google account
  const options = {
      method: (request["method"]),
      hostname: (request["hostname"]),
      port: (request["port"]),
      headers: (request["headers"]),
      path: (request["path"])
  };
  const req = https.request(options, (res) => {
    res.setEncoding('utf8'); // Encoding to Korea Language
    var body = ''; 
    res.on('data', (chunk) => { // get data
      body = body + chunk; //  JSON Output about Schedules
    });
    res.on('end',function() {  // end connect
      if (res.statusCode == 200 || res.statusCode == '200') {
        callback(JSON.parse(body)); // callback to index.js after parsing
      } 
    });
  });
}

module.exports = requestAPI