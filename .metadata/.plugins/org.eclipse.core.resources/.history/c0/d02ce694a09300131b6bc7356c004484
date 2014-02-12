/**
 * @author Richard Pingree
 */
var remoteResponse = function(){
	Ti.API.debug(this.responseText);
	
	
};

var remoteError = function(e){
	Ti.API.debug("Status: " + this.status);
	Ti.API.debug("Text: " + this.responseText);
	Ti.API.debug("Error: " + e.error);
	
	
};
var xhr = TI.Network.createHTTPClient({

	onload: remoteResponse,
	onerror: remoteError,
	timeout: 5000 
});

xhr.open('GET', "http://api.reddit.com/");

xhr.send();
