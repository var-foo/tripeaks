var Field = function(deck){
	var cards = [],
		i;
	for(i = 0; i < 30; i++){
		cards.push(deck.deal());
	};
	this.logCards = function(){
		console.log("Field cards: " + cards.length);
	};
	this.receiveCard = function(card){
		cards.push(card);
	};
	this.toHtml = function(){
		var arrayOut = [],
			i;
		for(i = 0; i < cards.length; i++){
			arrayOut.push('<div id="card-',  i + 1, '" class="card fieldCard ',cards[i].getSuit(),' ',cards[i].getNumber(),'">',cards[i].getName(),'</div>');
		}
		return arrayOut.join('');
	};
	this.removeCard = function(index){
		var card = cards[index];
		cards.splice(index, 1);
		return card;
	}
};

var Hole = function(deck){
	var cards = [];
	for(i = 0; i < 22; i++){
		cards.push(deck.deal());
	}
	this.logCards = function(){
		console.log("Hole cards: " + cards.length);
	}
	this.hitHand = function(){
		return cards.pop();
	};
	this.receiveCard = function(card){
		cards.push(card);
	};
	this.giveCard = function(){
		return cards.pop();
	};
	this.checkForCards = function(){
		return cards.length;
	}
	this.toHtml = function(){
		var arrayOut = [],
			i;
		for(i = 0; i < cards.length; i++){
			arrayOut.push('<div class="card ',cards[i].getSuit(),' ',cards[i].getNumber(),'">',cards[i].getName(),'</div>');
		}
		return arrayOut.join('');
	};
};

var Hand = function(deck){
	var cards = [];
	
	this.receiveCard = function(card){
		cards.push(card);
	};
	this.logCards = function(){
		console.log("Hand cards: " + cards.length);
	};
	this.toHtml = function(){
		var arrayOut = [],
			i,
			topCard = cards.length - 1;
		
		arrayOut.push('<div class="card handCard ',cards[topCard].getSuit(),' ',cards[topCard].getNumber(),'">',cards[topCard].getName(),'</div>');
		return arrayOut.join('');
	};
	this.getTopCard = function(){
		return cards[(cards.length - 1)];
	}
};

(function(){
	var myDeck = new Deck();
	var myHole = new Hole(myDeck);
	var myHand = new Hand(myDeck);
	var myField = new Field(myDeck);
	
	var $field = $("#field");
	var $hole = $("#hole");
	var $hand = $("#hand");
	var $card = $(".card");
	
	myDeck.shuffle();
	myDeck.deal();
	$field.html(myField.toHtml());
	var logCards = function(){
		myField.logCards();
		myHole.logCards();
		myHand.logCards();	
	}
	
	$hole.on("click", function(){
		myHand.receiveCard(myHole.hitHand());
		
		$hand.html(myHand.toHtml());
		logCards();
		if(!!myHole.checkForCards()){
			return;	
		} else{
			$hole.hide();
		}
	});
	
	$(".card").on("click", function(){
		var $clicked = $(this);
		var clickedTop = parseInt($clicked.css("top"));
		var clickedLeft = parseInt($clicked.css("left"));
		var locked = false;
		var clickedIndex = ($clicked.attr("id").split("-")[1]) - 1;
		console.log("index: " + clickedIndex);
		$(".fieldCard").each(function(){
			var $this = $(this);
			var thisTop = parseInt($this.css("top"));
			var thisLeft = parseInt($this.css("left"));
			// If a card is less than 50px below and 20px to the left or 40px to the right
			if((thisTop === (clickedTop + 40)) && ((thisLeft === (clickedLeft + 20)) || (thisLeft === (clickedLeft - 20)))){
				locked = true;
				
			}
			//console.log("top: " +parseInt($(this).css("top")));
			//console.log("left: " +parseInt($(this).css("left")));
			
		});
		if(!locked){
			//console.log("this card is free");
			myHand.receiveCard(myField.removeCard(clickedIndex));
			$clicked.removeClass("fieldCard").hide();
			$hand.html(myHand.toHtml());
		} else{
			console.log("this card is locked");
		}
			
	});
	
}());
