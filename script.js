$(document).ready(function(){
	$("#projectsLink").addClass("chosen");

	$('#bottomText span').prepend("© " + (new Date).getFullYear());
	
    $("a").click(function(){
		$("#projectsLink").removeClass("chosen");
		$("a").removeClass("chosen");
        $(this).addClass("chosen");
		if ($(this).attr("id") == "myNameLink"){
			$(this).removeClass("chosen");
			$("#projectsLink").addClass("chosen");

		}
		
		// Close mobile menu on link click (if on mobile)
		if (window.innerWidth < 768) {
			$("#bar").removeClass("mobile-nav-open");
		}
    });
	


	// Create IE + others compatible event handler
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

	// Listen to message from child window
	eventer(messageEvent,function(e) {
		var idName = e.data;
	    $("#projectsLink").removeClass("chosen");
		$("a").removeClass("chosen");
		$("#" + idName).addClass("chosen");
	},false);

	// Mobile menu toggle
	$("#menuToggle").click(function(){
		$("#bar").toggleClass("mobile-nav-open");
	});

	// Close menu when clicking outside on mobile
	$(document).click(function(event) {
		if (window.innerWidth < 768) {
			if (!$(event.target).closest('#bar, #menuToggle').length) {
				$("#bar").removeClass("mobile-nav-open");
			}
		}
	});

});
