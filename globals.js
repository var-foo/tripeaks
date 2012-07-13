// Set up some globals
var $field = $("#field");
var $hole = $("#hole");
var $hand = $("#hand");
var $card = $(".card");
var $score = $("#score");
var $cardsLeft = $("#cardsLeft");
var $fieldCard = $(".fieldCard");

/**
 * Field is the peaks themselves. This does not include the hole or hand.
 * @namespace
 * @param deck {string} The name of the deck you want to deal from.
 */
var Field = function (deck) {
        var cards = [],
            i;
        var init = function () {
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
                arrayOut.push('<div id="card-',  i + 1, '" class="card fieldCard ',cards[i].getSuit().toLowerCase(),' val_',String(cards[i].getName()).toLowerCase(),'" />');
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
                arrayOut.push('<div id="card-',  i + 1, '" class="card fieldCard ',cards[i].getSuit().toLowerCase(),' val_',String(cards[i].getName()).toLowerCase(),'" />');
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
            var arrayOut = [];
            var topCard = cards.length - 1;
            var cardSuit = cards[topCard].getSuit();
            var cardNumber = cards[topCard].getNumber();
            var cardName = cards[topCard].getName();

           
     	   arrayOut.push('<div class="card handCard front ',cards[topCard].getSuit().toLowerCase(),' val_',String(cards[topCard].getName()).toLowerCase(),'" />');

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
        this.value = newValue;
    };
};

var TPCookie = function () {
	
	/**
	 * @param name {string} the name of the cookie you want to create
	 * @param value {number} the value of the score you want to set
	 * @param days {number} the number of days to store the cookie
	 */
    this.create = function (name, value, days) {
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
	
	/**
	 * @param name {string} the name of the cookie you want to read
	 */
    this.read = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' '){
            	c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0){
            	return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };
	
	/**
	 * @param name {string} the name of the cookie you want to erase
	 */
    this.erase = function (name) {
        myCookie.create(name, "", -1);
    };
};