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
	
	window.addEventListener('message', function(event) { 

		// IMPORTANT: Check the origin of the data! 
		if (~event.origin.indexOf('http://yoursite.com')) { 
			// The data has been sent from your site 

			// The data sent with postMessage is stored in event.data 
			console.log(event.data); 
		} else { 
			// The data hasn't been sent from your site! 
			// Be careful! Do not use it. 
			return; 
		} 
	}); 





});
