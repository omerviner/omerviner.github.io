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
});
