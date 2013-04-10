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
    this.hit = function() {
		return cards.pop();
    };
};
// Set up some globals
var $field = $("#field"),
    $hole = $("#hole"),
    $hand = $("#hand"),
    $card = $(".card"),
    $score = $("#score"),
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
            };
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
                i;
            for (i = 0; i < cards.length; i++) {
                arrayOut.push('<div id="card-',  i + 1, '" class="card fieldCard" data-card="', cards[i].getSuit().toLowerCase(), '_', String(cards[i].getName()).toLowerCase(), '" />');
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

            arrayOut.push('<div class="card front handCard" data-card="', cards[topCard].getSuit().toLowerCase(), '_', String(cards[topCard].getName()).toLowerCase(), '" />');

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

    this.addToScore = function () {
        var newValue = this.value + this.incrementer;
        this.value = newValue;
        this.incrementer++;
    };
    this.removeFromScore = function () {
        var newValue = this.value - 3;
        this.value = newValue;
        this.incrementer = 1;
    };

    this.getScore = function () {
        return this.value;
    };

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
		posX = "0";
		break;
	case "diamonds":
		posX = "-40px";
		break;
	case "hearts":
		posX = "-80px";
		break;
	case "spades":
		posX = "-120px";
		break;
	}
	switch (num) {
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

    var currentScore = myScore.getScore();

    myDeck.shuffle();
    myDeck.deal();
    $field.html(myField.toHtml());
    myHand.receiveCard(myHole.hitHand());
    $hand.html(myHand.toHtml());
    $cardsLeft.html(myHole.checkForCards());

    if (myCookie.read("score") == null) {
        myCookie.create("score", currentScore, 100);
    }

    $hole.on("click", function () {
        //var currentScore = myScore.getScore();
        myHand.receiveCard(myHole.hitHand());
        $hand.html(myHand.toHtml());
        myScore.removeFromScore();
        updateUI();
        if ( !! myHole.checkForCards()) {
            $cardsLeft.html(myHole.checkForCards());
        } else {
            $hole.hide();
        }

    });

    $(".fieldCard").on("click", function () {
        var $clicked = $(this);
        var locked;
        var $clickedId = $clicked.attr("id");
        var clickedIndex = ($clickedId.split("-")[1]) - 1;
        var clickedValue = (myField.returnCard(clickedIndex)).getNumber();
        var handVal = myHand.getValue();

        var success = function () {
            var currentScore = myScore.getScore();
            myHand.receiveCard(myField.removeCard(clickedIndex));
            $clicked.removeClass("fieldCard").hide();
            $hand.html(myHand.toHtml());
            myScore.addToScore();
        }
        //Define an easy way to tell if a card is face-down, and if it is, "lock" the card
        

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
    var currentScore = myScore.getScore();
    var $fieldCard = $(".fieldCard");
    var $score = $("#score");
    var arrTop = [];
    var arrLeft = [];
    $score.text(currentScore);
    fieldPosition();
    myCookie.create("score", currentScore, 100);

    // Two .each loops on the same collection of nodes seems strange,
    // but we need to create the entire array before we start checking
    // the cards against it. This is a good case for having a small db.
    $fieldCard.each(function () {
        var $thisLeft = parseInt($(this).css("left"), 10);
        var $thisTop = parseInt($(this).css("top"), 10);
        arrTop.push($thisTop);
        arrLeft.push($thisLeft);

    });

    $fieldCard.each(function (index, el) {
        var $thisTop = parseInt($(this).css("top"), 10);
        var $thisLeft = parseInt($(this).css("left"), 10);
        for (var i = 0; i < arrTop.length; i++) {
            var $this = $(this);
            if (arrTop[i] == $thisTop + 40 && (arrLeft[i] == $thisLeft + 20 || arrLeft[i] == $thisLeft - 20)) {

                $this.removeClass("front").addClass("back");
                break;
            } else {
                $this.removeClass("back").addClass("front");
            }
        }

    });

}

/**
 * reset does all of the dirty work to end the current hand and start a new hand.
 */
function reset() {
    var currentScore = myScore.getScore();
    $hole.off();
    $fieldCard.off();
    for (var i = 0; i < $(".fieldCard").length; i++) {
        myScore.removeFromScore();
    }
    myCookie.create("score", myScore.value, 100);
    init();
    myScore.setFromCookie();
    updateUI();
    $hole.show();
}

//Stuff in here only runs exactly one time per page load...
(function () {

    var $newHand = $("#newHand");
    $newHand.on("click", function () {
        reset();
    });
    init();
    if(myCookie.read("score")){
    	myScore.setFromCookie();	
    }
    
    updateUI();

}());