var playing = true;
var recording = false;

var videoDuration;

var audio = [];
var cameras = [];

var videoSourcesHTML ="";
var audioSourcesHTML ="";

var x_pos = 0;
var position_percentage = 0;


var flashReady = function(){
	flash.connect("rtmp://localhost/SMSServer");
};

var connected = function(success, error){
	cameras = flash.getCameras();
	audio = flash.getMicrophones();
	
	flash.startPlaying("hobbit_vp6.flv");
	setupSources();
};

var getDuration = function(duration) {
	videoDuration = duration;
	var videoDurationMin = Math.floor(duration / 60);
	var videoDurationSec = Math.floor(duration % 60);
	$("p#duration").html(videoDurationMin + ":" + videoDurationSec);
}

var seekTime = function(time) {
	var currentMin = Math.floor(time / 60);
	var currentSec = Math.floor(time % 60);
	
	if (currentSec < 10) {
		$("p#seek_time").html(currentMin + ":" + "0" + currentSec + "  /");
	} else {
		$("p#seek_time").html(currentMin + ":" + currentSec + "  /");
	}

	position_percentage = time / videoDuration;
	x_pos = Math.floor(position_percentage * $("#seek_bar").width());
	$("#scrubber").css("left", x_pos);
}

$("#seek_bar").on("mousedown", function(e){	
	var left = e.pageX - $(this).offset().left; 
	var perc = left / $("#seek_bar").width();
	var time = perc * videoDuration;
	
	flash.setTime(time);
	
	e.preventDefault();
	return false;
});

$("#volume").on("click", function(e){
	var relativeX = e.pageX - $(this).offset().left;
	var perc = relativeX / $("#volume").width();
	var newX = perc * $("#volume").width();
	
	if (perc > 1) {
		perc = 1;
	} 
	if (newX > 90) {
		newX = 90;
	}
	
	$("#volume img").css("left", newX);
	flash.setVolume(perc);
	
	e.preventDefault();
	return false;
});

$("#playandpause").click(function(e){				
		if (!playing) {
			flash.playPause();
			$("#playandpause img").attr("src", "images/pause.png");
			playing = true;
		} else {
			flash.playPause();
			$("#playandpause img").attr("src", "images/play.png");		
			playing = false;
		}
		e.preventDefault();
		return false;
});

$("#record").on("click", function(e){	
	if (!recording) {
		flash.startRecording("movie", 0, 0);
		recording = true;
	} else {
		flash.stopRecording();
		recording = false;
	}
	e.preventDefault();
	return false;
});

$("#audio_sources").on("click", function(e){
	$("#sources_container").html(
		"<ul>" +
			audioSourcesHTML +
		 "</ul>"
	).css({opacity: 1});
	e.preventDefault();
	return false;
});

$("#video_sources").on("click", function(e){
	$("#sources_container").html(
		"<ul>" +
			videoSourcesHTML +
		 "</ul>"
	).css({opacity: 1});
	e.preventDefault();
	return false;
});

var setupSources = function(){
	for (var i = 0, max = cameras.length; i<max; i++) {
		videoSourcesHTML += "<li>" + cameras[i] + "</li>";
	};
	
	for (var i = 0, max = audio.length; i<max; i++) {
		audioSourcesHTML += "<li>" + audio[i] + "</li>";
	};

}






