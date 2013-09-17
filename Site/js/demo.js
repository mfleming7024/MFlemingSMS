var recording = false;
var playing = false;

var flashReady = function(){

	flash.connect("rtmp://localhost/SMSServer");
	
};

var connected = function(success, error){

	var cameras = flash.getCameras();
	console.log(cameras);
	
	var audio = flash.getMicrophones();
	console.log(audio);
	
	flash.startPlaying("Elearning1.flv");

};

$("#playandpause").click(function(e){				
		if (!playing) {
			//Then play
			flash.playPause();
			playing = true;
		} else {
			//Pause it
			flash.playPause();
			playing = false;
		}
		e.preventDefault();
		return false;
});

$("#record").click(function(e){	
	if (!recording) {
		//Then record
		flash.startRecording("movie", 0, 0);
		recording = true;
	} else {
		//Stop recording
		flash.stopRecording();
		recording = false;
	}
	e.preventDefault();
	return false;
});
