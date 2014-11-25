sparkjs David Folwer AKA uCHobby 11/24/2014
=======
Spark io JavaScript library for browser based application development.
Available at https://github.com/uchobby/sparkjs

You can use this code for anything you wish, there no ties or warrantees.
Send me an email if you have any suggestions or to let me know what you think.
david.fowler@gmail.com

This simple JavaScript library has two methods which make getting variables and calling function
on your Spark cord simple.

constructor SparkAPI(deviceID,accessToken)
    Creates the SparkAPI object using your deviceID and token. Use new to create as many as you need.
    The deviceID and token values are found in the Spark IDE, one under "cores" and the other in "settings"
    
    Parameters:
        deviceID
            String with your device ID.
        accessToken
            String with your accessToken.

getVariable(variableName,callback)
    Calls the API for a registered variable. Call with nothing to get a basic status response.
    Uses the deviceID and accessToken, with an HTTP GET to the Spark server.
    
    Parameters:
        variableName
            Registered Spark device variable name
        callback
            Function to call when response arrives
            Callback is passed the result object. 
                callback(result);
    return:
        void

callFunction(functionName, paramString, callback)
    Calls the API for a registered Spark function. 
    Uses the deviceID and accessToken, with an HTTP POST to the Spark server.
    
    Parameters:
        functionName
            Registered Spark device function name
        paramString
            A string of text to pass as parameters for the Spark function 
        callback
            Function to call when response arrives
            Callback is passed the result object. 
                callback(result);
    return:
        void

To Use:
    var SparkDevice=new SparkAPI(deviceID,accessToken);         /
    
    SparkDevice.getVariable("",onSparkStatus);                  //Get a variable with "" as the name, actually pulls status.
    
    function onSparkStatus(result) {                                //Callback function for the status button
        console.log("Get Status Response:"+JSON.stringify(result)); //Just dump the result object to the console. Use the JS console
    }                                                               //to view result. Could do a lot of stuff but keeping it simple now.
