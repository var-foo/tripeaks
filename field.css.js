/**
 * This function sets the background-positions for the cards in the field.
 * Created because background-position-x is not supported in firefox.
 */
function fieldPosition(){
	var cards = $(".card");
	cards.each(function(){
		var $this = $(this);
		var card = $this.attr("data-card");
		var cardInfo = card.split("_");
		var suit = cardInfo[0];
		var num = cardInfo[1];
		var css = cardPosition(suit, num);

		$this.css("backgroundPosition", css);
	});
}

function cardPosition(suit, num){
	var bgp, posX, posY;
	
	switch (suit){
		case "clubs":
			posX = "0";
			console.log("clubs");
			break;
		case "diamonds":
			posX = "-40px";
			break;
		case "hearts":
			posX = "-80px";
			break;
		case "spades":
			posX = "-120px";
	}
	switch (num){
		case "2":
			posY = "0";
			break;
		case "3":
			posY = "-59px";
			break;
		case "4":
			posY = "-118px";
			break;
		case "5":
			posY = "-177px";
			break;
		case "6":
			posY = "-236px";
			break;
		case "7":
			posY = "-295px";
			break;
		case "8":
			posY = "-354px";
			break;
		case "9":
			posY = "-413px";
			break;
		case "10":
			posY = "-472px";
			break;
		case "j":
			posY = "-531px";
			break;
		case "q":
			posY = "-590px";
			break;
		case "k":
			posY = "-649px";
			break;
		case "a":
			posY = "-708px";
			break;
	}
	bgp = posX + " " + posY;
	return bgp;
}
