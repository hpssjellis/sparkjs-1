/*jshint unused: false, browser: true, devel: true, jquery: true*/

var deviceInstance;

function SparkAPI(deviceID,accessToken) {
    this.deviceID=deviceID;
    this.name=undefined;
    this.connected=undefined;
    this.variables=undefined;
    this.functions=undefined;
    this.accessToken=accessToken;
    this.sparkURL = "https://api.spark.io/v1/devices/";  //Web address for the Spark API
    this.lastRequestType=undefined;
    
    this.getVariable=function (variableName,callback) {  
        'use strict';
        deviceInstance=this;  //This is a kludge to get a pointer into the handler, it's not thread safe!
        var anHttpRequest = new XMLHttpRequest();  //Get an HTTP requestor object from the browser
        if (variableName === undefined) {
            variableName = "";
        }
        if(variableName===""){
            this.lastRequestType="Status";
        }
        else{
            this.lastRequestType="Varable";
        }
        anHttpRequest.onreadystatechange = function () {  //Define the function to handle the API response
            if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200) {  //Did we get a good response?
                var result=JSON.parse(anHttpRequest.responseText);  //Parse the JSON response body
                if (deviceInstance.lastRequestType==="Status"){
                    deviceInstance.name=result.name;
                    deviceInstance.connected=result.connected;
                    deviceInstance.variables=result.variables;
                    deviceInstance.functions=result.functions;
                }
                if (callback!==undefined) {
                    callback(result);
                }
            }
        };

        var url = this.sparkURL+this.deviceID+"/"+variableName;//Build up the API request URL.
        anHttpRequest.open("GET", url, true);  //Open our GET with the url constructed above.
        anHttpRequest.setRequestHeader("Authorization","Bearer "+this.accessToken);//Pass the access Token as a header value.
        anHttpRequest.send(null);  //Finish the request, when the server responds we will execute the handler function above.
    };
    
    this.CallFunction = function(functionName, paramString, callback) {
        'use strict';
        var url=this.sparkURL+this.deviceID+"/"+functionName;  //Build up the API request URL.
        var params="args="+paramString;              //Build up the parameter string for the POST
        var anHttpRequest = new XMLHttpRequest(); //Get an HTTP requestor object from the browser
        anHttpRequest.open("POST", url, true);  //Open our POST with the url constructed above.

        anHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  //Tell the server we are posting some data
        anHttpRequest.setRequestHeader("Authorization","Bearer "+accessToken);  //Pass the access Token as a header value.

        anHttpRequest.onreadystatechange = function() {//Define the function to handle the API response
            if(anHttpRequest.readyState == 4 && anHttpRequest.status == 200) { //Did we get a good response?
                var status=JSON.parse(anHttpRequest.responseText);  //Parse the JSON response body
                if (callback!==undefined) {
                    callback(status);
                }
            }
        };
        anHttpRequest.send(params);  //Finish the request, when the server responds we will execute the handler function above.
    };
}
