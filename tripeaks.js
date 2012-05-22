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
		var newValue = value + incrementer;
		value = parseInt(newValue);
		incrementer ++;
	};
	this.removeFromScore = function(){
		console.log("removing from score");
		var newValue = value - 3;
		value = parseInt(newValue);
		incrementer = 1;
	};
	
	this.getScore = function(){
		return value;
	};
	
	this.setFromCookie = function(){
		var newValue = readCookie("score");
		value = parseInt(newValue);
	};
};

// Cookie Helper Methods
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function init(){
	window.myDeck = new Deck();
	window.myHole = new Hole(myDeck);
	window.myHand = new Hand(myDeck);
	window.myField = new Field(myDeck);
	window.myScore = new Score();
	
	window.$field = $("#field");
	window.$hole = $("#hole");
	window.$hand = $("#hand");
	window.$card = $(".card");
	window.$score = $("#score");
	window.$cardsLeft = $("#cardsLeft");
	window.$fieldCard = $(".fieldCard")
	
	
	
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
	
	if(readCookie("score") == null){
		console.log("readCookie is null");
		var currentScore = myScore.getScore();
		createCookie("score", currentScore, 100);
	}
	
	$hole.on("click", function(){
		var currentScore = myScore.getScore();
		myHand.receiveCard(myHole.hitHand());
		
		$hand.html(myHand.toHtml());
		logCards();
		myScore.removeFromScore();
		updateUI();
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
				var currentScore = myScore.getScore();
				myHand.receiveCard(myField.removeCard(clickedIndex));
				$clicked.removeClass("fieldCard").hide();
				$hand.html(myHand.toHtml());
				myScore.addToScore();
			}
			
		} else if((!locked) && clickedValue  === 13){
			// what to do if the clicked card is a king
			var currentScore = myScore.getScore();
			if((myHand.getValue() === 1) || (myHand.getValue() === clickedValue - 1)){
				myHand.receiveCard(myField.removeCard(clickedIndex));
				$clicked.removeClass("fieldCard").hide();
				$hand.html(myHand.toHtml());
				myScore.addToScore();
			}
		} else if((!locked) && clickedValue === 1){
			// what to do if the clicked card is an ace
			var currentScore = myScore.getScore();
			if((myHand.getValue() === 13) || (myHand.getValue() === clickedValue + 1)){
				myHand.receiveCard(myField.removeCard(clickedIndex));
				$clicked.removeClass("fieldCard").hide();
				$hand.html(myHand.toHtml());
				myScore.addToScore();
			}
		} else{
			console.log("this card is locked");
		}
		updateUI();
			
	});
	
	
	
};

function updateUI(){
	var currentScore = myScore.getScore();
	var $fieldCard = $(".fieldCard");
	var $score = $("#score");
	var arrTop = [];
	var arrLeft = [];
	$score.html(currentScore);
	createCookie("score", currentScore, 100);
	
	// Let's try showng/hiding cards from here.
	$fieldCard.each(function(){
		var $thisLeft = parseInt($(this).css("left"), 10);
		var $thisTop = parseInt($(this).css("top"), 10);
		arrTop.push($thisTop);
		arrLeft.push($thisLeft);
		
	});
	console.log(arrLeft);
	console.log(arrTop);
	
	$fieldCard.each(function(index, el){
		var $thisTop = parseInt($(this).css("top"), 10);
		var $thisLeft = parseInt($(this).css("left"), 10);
		for(var i = 0; i < arrTop.length; i++){
			if(arrTop[i] == $thisTop + 40 && (arrLeft[i] == $thisLeft + 20 || arrLeft[i] == $thisLeft - 20)){
				$(this).addClass("back");
				break;
			} else {
				$(this).removeClass("back");
			}
		}
		
	});
	
}

(function(){
	
	var $newHand = $("#newHand");
	$newHand.on("click", function(){
		if($(".fieldCard").length){
			for(var i = 0; i < $(".fieldCard").length; i++){
				myScore.removeFromScore();
				$score.html(myScore.getScore());
				init();
			}
		} else{
			init();
			myScore.setFromCookie();
			updateUI();
		}
		
		
	});
	
	
}());
