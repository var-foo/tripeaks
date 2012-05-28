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
 * @constructor
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

        this.receiveCard = function (card) {
            cards.push(card);
        };
        this.returnCard = function (index) {
            return cards[index];
        };
        this.toHtml = function () {
            var arrayOut = [],
                i;
            for (i = 0; i < cards.length; i++) {
                arrayOut.push('<img id="card-',  i + 1, '" class="card fieldCard" src="images/cards/default/',String(cards[i].getName()).toLowerCase(),'_of_',cards[i].getSuit().toLowerCase(),'.png" alt="',cards[i].getFullName(),'" />');
            }
            return arrayOut.join('');
        };
        this.removeCard = function (index) {
            var card = cards[index];
            return card;
        };
        init();
    };

/**
 * Hole is the deck itself.
 * @constructor
 * @param deck {string} The name of the deck to deal from.
 */
var Hole = function (deck) {
        var cards = [],
            i;

        this.init = function () {
            cards = [];
            for (i = 0; i < 22; i++) {
                cards.push(deck.deal());
            }
        };
        this.hitHand = function () {
            return cards.pop();
        };
        this.receiveCard = function (card) {
            cards.push(card);
        };
        this.giveCard = function () {
            return cards.pop();
        };
        this.checkForCards = function () {
            return cards.length;
        };
        this.toHtml = function () {
            var arrayOut = [],
                i;
            for (i = 0; i < cards.length; i++) {
                arrayOut.push('<img class="card" src="images/cards/default/',String(cards[i].getName()).toLowerCase(),'_of_',cards[i].getSuit().toLowerCase(),'.png" alt="',cards[i].getFullName(),'" />');
            }
            return arrayOut.join('');
        };
        this.init();
    };

/**
 * Hand is the face-up cards you play on the Field from.
 * @constructor
 * @param deck {string} The deck to deal from.
 */
var Hand = function (deck) {
        var cards = [];

        this.receiveCard = function (card) {
            cards.push(card);
        };
        this.toHtml = function () {
            var arrayOut = [];
            var topCard = cards.length - 1;
            var cardSuit = cards[topCard].getSuit();
            var cardNumber = cards[topCard].getNumber();
            var cardName = cards[topCard].getName();

            arrayOut.push('<img class="card handCard" src="images/cards/default/',String(cards[topCard].getName()).toLowerCase(),'_of_',cards[topCard].getSuit().toLowerCase(),'.png" alt="',cards[topCard].getFullName(),'" />');
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
 * @constructor
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

    this.erase = function (name) {
        myCookie.create(name, "", -1);
    };
};