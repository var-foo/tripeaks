function createCookie (name, value, days) {
	var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
		expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};

(function(){

	$("button").on("click", function(evt){
		evt.preventDefault();
		var score = $("#score").val();
		createCookie("score", score, 100);
		alert("Your score has been reset to " + score);
	});
}());
