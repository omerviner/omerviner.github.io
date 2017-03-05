$(document).ready(function(){
	$(".imgContainer").click(function(){
		console.log("omer");
		var name = $(this).attr("id");
		parent.postMessage(name, "https://omerviner.github.io/portfolio/");
		});

});
