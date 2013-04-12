/** @constructor */
var Card = function (suit, number) {
    /** @returns {Number} The number of the card in the deck. (1-52) */
    this.getNumber = function () {
        return number;
    };
    /** @returns {String} The name of the suit. "Hearts","Clubs","Spades", or "Diamonds." */
    this.getSuit = function () {
        var suitName = '';
        switch (suit) {
        case 1:
            suitName = "Hearts";
            break;
        case 2:
            suitName = "Clubs";
            break;
        case 3:
            suitName = "Spades";
            break;
        case 4:
            suitName = "Diamonds";
            break;
        }
        return suitName;
    };
    /** @returns {String} The HTML-encoded symbol of the suit. */
    this.getSymbol = function () {
        var suitName = '';
        switch (suit) {
        case 1:
            suitName = "&hearts;";
            break;
        case 2:
            suitName = "&clubs;";
            break;
        case 3:
            suitName = "&spades;";
            break;
        case 4:
            suitName = "&diams;";
            break;
        }
        return suitName;
    };
    /** @returns {Number} The value of the card for scoring. */
    this.getValue = function () {
        var value = number;
        if (number >= 10) {
            value = 10;
        }
        if (number === 1) {
            value = 11;
        }
        return value;
    };
    /** @returns {String} The name of the card. "Ace" */
    this.getName = function () {
        var cardName = '';
        switch (number) {
        case 1:
            cardName = "A";
            break;
        case 13:
            cardName = "K";
            break;
        case 12:
            cardName = "Q";
            break;
        case 11:
            cardName = "J";
            break;
        default:
            cardName = number;
            break;
        }
        return cardName;
    };
    /** @returns {String} The full name of the card. "Ace of Spades" */
    this.getFullName = function () {
        return this.getName() + this.getSymbol();
    };
};
/** @constructor */
var Deck = function () {
    /** Creates a new set of cards. */
    var cards = [],
        newCards = function () {
            var i,
                suit,
                number;

            for (i = 0; i < 52; i++) {
                suit = i % 4 + 1;
                number = i % 13 + 1;
                cards.push(new Card(suit, number));
            }
        };
    /* Create those new cards. */
    newCards();
    
    /** Shuffles the cards. Modifies the private instance of the cards array.
     * @returns {Array} An array of Cards representing the shuffled version of the deck.
     */
    this.shuffle = function () {
        for (var j, x, i = cards.length; i; j = parseInt(Math.random() * i, 10), x = cards[--i], cards[i] = cards[j], cards[j] = x){
			// Crazy shuffle routine.
        }
        return this.getCards();
    };
    /** @returns {Array} An array of cards representing the Deck. */
    this.getCards = function () {
        return cards;
    };
    /** @returns {Card} Deals the top card off the deck. Removes it from the Deck. */
    this.deal = function (myHole) {
		var i;
		this.shuffle();
        if (!cards.length) {
            console.log("Ran out of cards, new deck");
            newCards();
            this.shuffle();
        }
        for(i = 0; i <31; i++) {
			return this.hit();
        }
        for(i = 0; i < this.cards.length; i++) {
			myHole.receiveCard(this.hit());
        }
    };
    /* @returns {Card} Pops the top card off the deck. */
    this.hit = function() {
		return cards.pop();
    };
};
// Set up some globals
var $field = $("#field"),
    $hole = $("#hole"),
    $hand = $("#hand"),
    //$card = $(".card"),
    $score = $("#score"),
    $currentRun = $("#currentRun");
    $bestRun = $("#bestRun");
    $cardsLeft = $("#cardsLeft"),
    $fieldCard = $(".fieldCard");

/**
 * Field is the peaks themselves. This does not include the hole or hand.
 * @namespace
 * @param deck {string} The name of the deck you want to deal from.
 */
var Field = function (deck) {
        var cards = [],
            i,
            init = function () {
                cards = [];
                for (i = 0; i < 30; i++) {
                    cards.push(deck.deal());
                }
            },
            numPeaks = 3;
		/**
		 * accepts a card and adds it to the cards array
		 * @param card {object} the card being received by the field 
		 */
        this.receiveCard = function (card) {
            cards.push(card);
        };
        /**
         * returns a single card object in the array
         * @param index {number} the index of the card in the cards array
         */
        this.returnCard = function (index) {
            return cards[index];
        };
        /**
         * Creates a div for each card in the cards array.
         */
        this.toHtml = function () {
            var arrayOut = [],
                i,
                peak;
            for (i = 0; i < cards.length; i++) {
                peak = "";
                if(i < 3){
                    peak = " peak";
                }
                arrayOut.push('<div id="card-',  i + 1, '" class="card fieldCard' + peak + '" data-card="', cards[i].getSuit().toLowerCase(), '_', String(cards[i].getName()).toLowerCase(), '" />');
            }
            return arrayOut.join('');
        };
        /**
         * removes a single card from the cards array
         * @param index {number} the index of the card in the cards array that you want to remove
         */
        this.removeCard = function (index) {
            var card = cards[index];
            return card;
        };
        
        this.getNumPeaks = function(){
            return numPeaks;
        }
        this.removePeak = function(){
            numPeaks --;
        }
        init();
    };

/**
 * Hole is the deck itself.
 * @namespace
 * @param deck {string} The name of the deck to deal from.
 */
var Hole = function (deck) {
        var cards = [],
            i;
		/** @constructor */
        this.init = function () {
            cards = [];
            for (i = 0; i < 22; i++) {
                cards.push(deck.deal());
            }
        };
        /**
         * pops the top card off of the stack
         */
        this.hitHand = function () {
            return cards.pop();
        };
        /**
         * puts a new card object into the cards array
         * @param card {object} the card you want to push to the hole
         */
        this.receiveCard = function (card) {
            cards.push(card);
        };
         /** @depricated */
        this.giveCard = function () {
            return cards.pop();
        };
        /** returns the total number of card objects in the cards array */
        this.checkForCards = function () {
            return cards.length;
        };
        this.toHtml = function () {
            var arrayOut = [],
                i;
            for (i = 0; i < cards.length; i++) {
                arrayOut.push('<div id="card-',  i + 1, '" class="card fieldCard" data-card="', cards[i].getSuit().toLowerCase(), '_', String(cards[i].getName()).toLowerCase(), '" />');
            }
            return arrayOut.join('');
        };
        this.init();
    };

/**
 * Hand is the face-up cards you play on the Field from.
 * @namespace
 * @param deck {string} The deck to deal from.
 */
var Hand = function (deck) {
        var cards = [];
		/**
		 * @param card {object} the card that is being received
		 */
        this.receiveCard = function (card) {
            cards.push(card);
        };
        this.toHtml = function () {
            var arrayOut = [],
                topCard = cards.length - 1,
                cardSuit = cards[topCard].getSuit(),
                cardNumber = cards[topCard].getNumber(),
                cardName = cards[topCard].getName();

            arrayOut.push('<div class="card front handCard" data-card="', cardSuit.toLowerCase(), '_', String(cardName).toLowerCase(), '" style="background-position:',cardPosition(cardSuit.toLowerCase(), String(cardName).toLowerCase()),';" />');

            return arrayOut.join('');
        };
        this.getTopCard = function () {
            return cards[(cards.length - 1)];
        };
        this.getValue = function () {
            var topCard = this.getTopCard();
            return topCard.getNumber();
        };
    };

var TPCookie = function () {
    /**
     * @param name {string} the name of the cookie you want to create
     * @param value {number} the value of the score you want to set
     * @param days {number} the number of days to store the cookie
     */
    this.create = function (name, value, days) {
        var expires,
            date = new Date();
        if (days) {
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    /**
     * @param name {string} the name of the cookie you want to read
     */
    this.read = function (name) {
        var i,
            c,
            nameEQ = name + "=",
            ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };

    /**
     * @param name {string} the name of the cookie you want to erase
     
    this.erase = function (name) {
        myCookie.create(name, "", -1);
    };
    */
};

/**
 * Score is the player's... score.
 * @namespace
 */
var Score = function () {
    this.value = 100;
    this.incrementer = 1;
    this.currentRun = 0;
    this.bestRun = 0;
    
    this.getBestRun = function(){
        return this.bestRun;
    }
    
    this.setBestRun = function(){
        if(this.currentRun > this.bestRun){
            this.bestRun = this.currentRun;
            console.log("currentRun is greater than bestRun");
        }
        return this.bestRun;
    }

    this.addToScore = function (isPeak) {
        var numPeaks;
        if(isPeak === false){
            this.value += this.incrementer;
            this.currentRun += this.incrementer;
        } else{
            console.log("You've reached a peak!");
            numPeaks = myField.getNumPeaks();
            switch(numPeaks){
                case 3:
                    this.value += 15;
                    this.currentRun += 15;
                    break;
                    
                case 2:
                    this.value += 30;
                    this.currentRun += 30;
                    break;
                
                case 1:
                    this.value += 45;
                    this.currentRun += 45;
                    break;
            }
            myField.removePeak();
        }
        this.incrementer++;
    };
    this.removeFromScore = function () {
        var newValue = this.value - 5;
        this.value = newValue;
        this.currentRun = 0;
        this.incrementer = 1;
    };

    this.getScore = function () {
        return this.value;
    };
    
    this.getCurrentRun = function () {
        return this.currentRun;
    }

    this.setFromCookie = function () {
        var newValue = myCookie.read("score");
        this.value = parseInt(newValue, 10);
    };
};

/**
 * This function sets the background-positions for the cards in the field.
 * Created because background-position-x is not supported in firefox.
 */
function cardPosition(suit, num) {
	var bgp, posX, posY;

	switch (suit) {
	case "clubs":
		posX = "-1px";
		break;
	case "diamonds":
		posX = "-100px";
		break;
	case "hearts":
		posX = "-199px";
		break;
	case "spades":
		posX = "-298px";
		break;
	}
	switch (num) {
	case "2":
		posY = "0";
		break;
	case "3":
		posY = "-146px";
		break;
	case "4":
		posY = "-291px";
		break;
	case "5":
		posY = "-435px";
		break;
	case "6":
		posY = "-581px";
		break;
	case "7":
		posY = "-726px";
		break;
	case "8":
		posY = "-871px";
		break;
	case "9":
		posY = "-1016px";
		break;
	case "10":
		posY = "-1161px";
		break;
	case "j":
		posY = "-1305px";
		break;
	case "q":
		posY = "-1451px";
		break;
	case "k":
		posY = "-1596px";
		break;
	case "a":
		posY = "-1741px";
		break;
	}
	bgp = posX + " " + posY;
	return bgp;
}

function fieldPosition() {
	var cards = $(".card");
	cards.each(function () {
		var $this = $(this),
			card = $this.attr("data-card"),
			cardInfo = card.split("_"),
			suit = cardInfo[0],
			num = cardInfo[1],
			css = cardPosition(suit, num);

		$this.css("backgroundPosition", css);
	});
}

function init() {
    window.myDeck = new Deck();
    window.myHole = new Hole(myDeck);
    window.myHand = new Hand(myDeck);
    window.myField = new Field(myDeck);
    window.myScore = new Score();
    window.myCookie = new TPCookie();

    var currentScore = myScore.getScore(),
    	defaults = {
			peaks: 3,
			topOffset: 75,
			cardWidth: 100,
			leftOffset:150
		},
		rowLimit = defaults.peaks,
		rowCounter = 0,
		nextIndex = rowLimit,
		topPos = 0,
		leftPos = defaults.leftOffset,
		gapWidth = 300,
		grouping = 1,
		groupCount,
		cardCount,
		newRow = true;

    myDeck.shuffle();
    myDeck.deal();
    $field.html(myField.toHtml());
    myHand.receiveCard(myHole.hitHand());
    $hand.html(myHand.toHtml());
    $cardsLeft.html(myHole.checkForCards());

    if (myCookie.read("score") == null) {
        myCookie.create("score", currentScore, 100);
    }else{
    	myScore.setFromCookie();	
    }
	
	/* Animate the field cards from the Hole. */
	for (cardCount=1; cardCount <= defaults.peaks*10; cardCount++){
		// The new row's first card is good to go
		if (!newRow){
			// This happens regardless.
			leftPos += defaults.cardWidth;
			if( groupCount === grouping){
				// Add gap and reset group counter.
				leftPos += gapWidth;
				groupCount = 1;
			}else{
				// Increment the group counter.
				groupCount++;
			}
		}else{
			// start the grouping/gap calculations on the remaining cards in this row
			newRow = false;
			groupCount = 1;
		}
		// Animate the card using jQuery
		$("#card-"+cardCount).addClass("back").animate({ top:topPos, left:leftPos },700, updateUI);
		
		if (cardCount === nextIndex){
			// we have reached the end of this row
			rowLimit = rowLimit + defaults.peaks;
			nextIndex = cardCount+rowLimit;
			
			// reset top position accordingly
			topPos = topPos + defaults.topOffset;
			
			// reset left position accordingly
			defaults.leftOffset -= 50;
			leftPos = defaults.leftOffset;
			
			// for each row, we knock a hundred pixels out of the gap.
			gapWidth -= 100;
			
			// increase the grouping by 1 - grouping is also row count.
			grouping++;
			newRow = true;
		}
	}

	
    $hole.on("click", function () {
        myHand.receiveCard(myHole.hitHand());
        $hand.html(myHand.toHtml());
        myScore.removeFromScore();
        updateUI();
        if ( !!myHole.checkForCards() ) {
            $cardsLeft.html(myHole.checkForCards());
        } else {
            $hole.hide();
        }

    });

    $(".fieldCard").on("click", function () {
        var $clicked = $(this),
        	locked,
        	clickedId = $clicked.attr("id"),
        	clickedIndex = (clickedId.split("-")[1]) - 1,
        	clickedValue = (myField.returnCard(clickedIndex)).getNumber(),
        	handVal = myHand.getValue(),
        	isPeak = false,
        	success = function () {
				var i;
	
				if($clicked.hasClass('peak')){
					isPeak = true;
				}
				myHand.receiveCard(myField.removeCard(clickedIndex));
				$clicked.removeClass("fieldCard").hide();
				$hand.html(myHand.toHtml());
				myScore.addToScore(isPeak);
			};
        /* Define an easy way to tell if a card is face-down, and if it is, "lock" the card */
        //if the clicked card is visible...
        if (!$clicked.hasClass("back")) {
            // ...and it's not an ace or a king...
            if ((clickedValue != 1) && (clickedValue != 13)) {
                // ...and the card's face value is 1 less or 1 greater than the hand card, remove it from
                // the field and add it to the hand.
                if ((handVal === clickedValue + 1) || (handVal === clickedValue - 1)) {
                    success();
                }

            } else if (clickedValue === 13) {
                // what to do if the clicked card is a king
                var currentScore = myScore.getScore();

                if ((handVal === 1) || (handVal === clickedValue - 1)) {
                    success();
                }
            } else if (clickedValue === 1) {
                // what to do if the clicked card is an ace
                if ((handVal === 13) || (myHand.getValue() === clickedValue + 1)) {
                    success();
                }
            }
        }
        updateUI();
    });
};

/**
 * updateUI shows the stat updates, updates the score cookie and toggles card visibility.
 */
function updateUI() {
    var currentScore = myScore.getScore(),
    	currentRun = myScore.getCurrentRun(),
    	bestRun = myScore.setBestRun(),
    	$score = $("#score"),
    	arrTop = [],
    	arrLeft = [];
    
    window.$fieldCard = $(".fieldCard")
    $score.text(currentScore);
    $currentRun.text(currentRun);
    $bestRun.text(bestRun);
    fieldPosition();
    myCookie.create("score", currentScore, 100);

    // Two .each loops on the same collection of nodes seems strange,
    // but we need to create the entire array before we start checking
    // the cards against it. This is a good case for having a small db.
    $fieldCard.each(function () {
    	var $this = $(this),
    		$thisLeft = parseInt($this.offset().left, 10),
    		$thisTop = parseInt($this.offset().top, 10);

        arrTop.push($thisTop);
        arrLeft.push($thisLeft);
    });

    $fieldCard.each(function (index, el) {
        var $this = $(this),
    		$thisLeft = parseInt($this.offset().left, 10),
    		$thisTop = parseInt($this.offset().top, 10),
    		i;

        for (i = 0; i < arrTop.length; i++) {
            if (arrTop[i] == $thisTop + 75 && (arrLeft[i] == $thisLeft + 50 || arrLeft[i] == $thisLeft - 50)) {
                $this.removeClass("front").addClass("back");
                break;
            } else {
                $this.removeClass("back").addClass("front");
            }
        }
    });
}



//Stuff in here only runs exactly one time per page load...
(function () {
	init();
    $("#newHand").on("click", function () {
        var currentScore = myScore.getScore();
		$hole.off();
		$fieldCard.off();
		for (var i = 0; i < $(".fieldCard").length; i++) {
			myScore.removeFromScore();
		}
		myCookie.create("score", myScore.value, 100);
		init();
		myScore.setFromCookie();
		$hole.show();
    });
}());