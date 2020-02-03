/*-------------------------------------------------------------
  <Send made Response to Kakao Server>
----------------------------------------------------------------*/
const {buildResponse} = require('./response'); // module to make kakao response
const google = require('./google.js');  // module to get google calendar information

exports.handler = async(event)  => {
    var key = JSON.parse(event.body).userRequest.utterance; // Kakao input data by keyboard
    key = key.replace(/\n/g, ""); // remove newline ('\n')
    var send = {};
    if(key === 'Hi') {
        send = { // Response Data : send
            message: {text: 'Bye'} 
        };
        return buildResponse(send);
    }
    else if(key === 'Calendar') {
        send = {
            message: {text: 'Put your Date'},
        };
        return buildResponse(send);
    }
    else if(key === "Today") {
        var calendarID = "<google account>";
        var googleKey = "<google api-key>"; // google api key
        var date = new Date();  // get current UTC information
        var year = date.getFullYear(); // get current Year infor
        var month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;  // Front : January(1) ~ September(9) Latter : October(10) ~ December(12)
        var day  = (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`;  // get date
        var minRFC3339 = `${year}-${month}-${day}T00:00:00Z`; // Date & Time(00:00) 
        var maxRFC3339 = `${year}-${month}-${day}T23:59:59Z`; // Date & Time(23:59)
        var params = { // Google Access Options 
            "method": "GET", 
            "port": 443,
            "hostname": "www.googleapis.com",
            "path": `/calendar/v3/calendars/${calendarID}/events?orderBy=startTime&singleEvents=true&timeMax=${maxRFC3339}&timeMin=${minRFC3339}&key=${googleKey}`, // Your Calender path
            "content": "",
        };
        // n : Number of Schedule
        return new Promise(function(resolve, reject){
            google(params, function(res){ // google() function return all of schecules information
                var n = 0
                var Result = "----------Today------------\n";
                while(res.items[n] != null){ 
                    var str = res.items[n];
                    Result += '< '+ str.summary + ' >\n' + 'Description : ' + str.description + '\n';  // summary : title, description : contents
                    n++ // next schedule
                }
                Result += "------------------------------"
                send = {
                    message : {text : Result}
                }
                resolve(buildResponse(send));
            })
        })
    }
    else if(key === "Tommorow") {
        var calendarID = "<google account>";
        var googleKey = "<google api-key>"; // google api key
        var date = new Date();  // get current UTC information
        var year = date.getFullYear(); // get current Year infor
        var month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;  // Front : January(1) ~ September(9) Latter : October(10) ~ December(12)
        var day  = (date.getDate() < 10) ? `0${date.getDate()+1}` : `${date.getDate()+1}`;  // get date
        var minRFC3339 = `${year}-${month}-${day}T00:00:00Z`; // Date & Time(00:00) 
        var maxRFC3339 = `${year}-${month}-${day}T23:59:59Z`; // Date & Time(23:59)
        var params = { // Google Access Options 
            "method": "GET", 
            "port": 443,
            "hostname": "www.googleapis.com",
            "path": `/calendar/v3/calendars/${calendarID}/events?orderBy=startTime&singleEvents=true&timeMax=${maxRFC3339}&timeMin=${minRFC3339}&key=${googleKey}`, // Your Calender path
            "content": "",
        };
        return new Promise(function(resolve, reject){
            google(params, function(res){
                var n = 0
                var Result = "----------Tommorow------------\n";
                while(res.items[n] != null){ 
                    var str = res.items[n];
                    Result += '< '+ str.summary + ' >\n' + 'Description : ' + str.description + '\n';
                    n++
                }
                Result += "------------------------------"
                send = {
                    message : {text : Result}
                }
                resolve(buildResponse(send));
            })
        })
    }
    else { 
        send = {
            message: {text: 'Retry'},
        };
        return buildResponse(send);
    }
};