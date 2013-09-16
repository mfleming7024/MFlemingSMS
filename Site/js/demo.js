var flashReady = function(){

	flash.connect("rtmp://localhost/SMSServer");
	
};

var connected = function(success, error){

	var cameras = flash.getCameras();
	console.log(cameras);
	
	var audio = flash.getMicrophones();
	console.log(audio);
	
	flash.startRecording("movie", 0, 0);

};

$("#prev_video").on("click", function(e){
		flash.stopRecording();
		
		e.preventDefault();
		return false;
});
