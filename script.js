$(document).ready(function(){
	$("#projectsLink").addClass("chosen");

	$('#bottomText').prepend("© " + (new Date).getFullYear());
	
    $("a").click(function(){
		$("#projectsLink").removeClass("chosen");
		$("a").removeClass("chosen");
        $(this).addClass("chosen");
		if ($(this).attr("id") == "myNameLink"){
			$(this).removeClass("chosen");
			$("#projectsLink").addClass("chosen");

		}
    });
	
	// Create IE + others compatible event handler
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

	// Listen to message from child window
	eventer(messageEvent,function(e) {
	  console.log('parent received message!:  ',e.data);
	  $("#" + e.data).css("backgound-color", "black");
	},false);






});
