$(document).ready(function(){
	$(".imgContainer").hover(function(){
		console.log("omer");
		var name = $(this).attr("id");
		parent.postMessage(name, "https://omerviner.github.io/portfolio/");
		});

});
