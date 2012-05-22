var Field = function(deck){
	var cards = [],
		i;
	this.init = function(){
		cards = [];
		for(i = 0; i < 30; i++){
			cards.push(deck.deal());
		};
	};
	
	this.logCards = function(){
		console.log("Field cards: " + cards.length);
	};
	this.receiveCard = function(card){
		cards.push(card);
	};
	this.returnCard = function(index){
		return cards[index];
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
		//cards.splice(index, 1);
		return card;
	};
	this.init();
};

var Hole = function(deck){
	var cards = [];
	
	this.init = function(){
		cards = [];
		for(i = 0; i < 22; i++){
			cards.push(deck.deal());
		};
	};
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
	this.init();
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
	this.getValue = function(){
		var topCard = this.getTopCard();
		return topCard.getNumber();
	}
	this.empty = function(){
		cards = [];
	}
};

var Score = function(){
	var value = 0;
	var incrementer = 1;
	
	this.addToScore = function(){
		value = value + incrementer;
		incrementer ++;
	};
	this.removeFromScore = function(){
		console.log("removing from score");
		value = value - 3;
		incrementer = 1;
	};
	
	this.getScore = function(){
		return value;
	};
};

(function(){
	var myDeck = new Deck();
	var myHole = new Hole(myDeck);
	var myHand = new Hand(myDeck);
	var myField = new Field(myDeck);
	var myScore = new Score();
	
	var $field = $("#field");
	var $hole = $("#hole");
	var $hand = $("#hand");
	var $card = $(".card");
	var $score = $("#score");
	var $cardsLeft = $("#cardsLeft");
	var $newHand = $("#newHand");
	
	myDeck.shuffle();
	myDeck.deal();
	$field.html(myField.toHtml());
	myHand.receiveCard(myHole.hitHand());
	$hand.html(myHand.toHtml());
	$cardsLeft.html(myHole.checkForCards());
	var logCards = function(){
		myField.logCards();
		myHole.logCards();
		myHand.logCards();	
	}
	
	$hole.on("click", function(){
		myHand.receiveCard(myHole.hitHand());
		
		$hand.html(myHand.toHtml());
		logCards();
		myScore.removeFromScore();
		$score.html(myScore.getScore());
		if(!!myHole.checkForCards()){
			$cardsLeft.html(myHole.checkForCards());
		} else{
			$hole.hide();
		}
		
	});
	
	$(".fieldCard").on("click", function(){
		var $clicked = $(this);
		var clickedTop = parseInt($clicked.css("top"), 10);
		var clickedLeft = parseInt($clicked.css("left"), 10);
		var locked = false;
		var $clickedId = $clicked.attr("id");
		var clickedIndex = ($clickedId.split("-")[1]) - 1;
		var clickedValue = (myField.returnCard(clickedIndex)).getNumber();
		
		var handValue;
		
		console.log("index: " + clickedIndex);
		console.log("value: " + clickedValue);
		console.log("text: " + $clicked.attr("class"));
		$(".fieldCard").each(function(){
			var $this = $(this);
			var thisTop = parseInt($this.css("top"), 10);
			var thisLeft = parseInt($this.css("left"), 10);
			// If a card is less than 50px below and 20px to the left or 40px to the right
			if((thisTop === (clickedTop + 40)) && ((thisLeft === (clickedLeft + 20)) || (thisLeft === (clickedLeft - 20)))){
				locked = true;
				
			}
			//console.log("top: " +parseInt($(this).css("top"), 10));
			//console.log("left: " +parseInt($(this).css("left"), 10));
			
		});
		if((!locked) && (clickedValue != 1) && (clickedValue != 13)){
			// If the card's face value is 1 less or 1 greater than the hand card, remove it from
			// the field and add it to the hand.
			if((myHand.getValue() === clickedValue + 1) || (myHand.getValue() === clickedValue - 1)){
				myHand.receiveCard(myField.removeCard(clickedIndex));
				$clicked.removeClass("fieldCard").hide();
				$hand.html(myHand.toHtml());
				myScore.addToScore();
				$score.html(myScore.getScore());
			}
			
		} else if((!locked) && clickedValue  === 13){
			// what to do if the clicked card is a king
			if((myHand.getValue() === 1) || (myHand.getValue() === clickedValue - 1)){
				myHand.receiveCard(myField.removeCard(clickedIndex));
				$clicked.removeClass("fieldCard").hide();
				$hand.html(myHand.toHtml());
				myScore.addToScore();
				$score.html(myScore.getScore());
			}
		} else if((!locked) && clickedValue === 1){
			// what to do if the clicked card is an ace
			if((myHand.getValue() === 13) || (myHand.getValue() === clickedValue + 1)){
				myHand.receiveCard(myField.removeCard(clickedIndex));
				$clicked.removeClass("fieldCard").hide();
				$hand.html(myHand.toHtml());
				myScore.addToScore();
				$score.html(myScore.getScore());
			}
		} else{
			console.log("this card is locked");
		}
			
	});
	
	$newHand.on("click", function(){
		myDeck = new Deck();
		myHole = new Hole(myDeck);
		myHand = new Hand(myDeck);
		myField = new Field(myDeck);
		myDeck.shuffle();
		myDeck.deal();
		$field.html(myField.toHtml());
		myHand.empty();
		myHand.receiveCard(myHole.hitHand());
		$hand.html(myHand.toHtml());
		$cardsLeft.html(myHole.checkForCards());
		console.log("You wish to have a new hand.");
	});
	
}());
