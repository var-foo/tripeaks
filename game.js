/** @constructor */
var Card = function (suit, number){
    /** @returns {Number} The number of the card in the deck. (1-52) */
    this.getNumber = function (){
        return number;  
    };
    /** @returns {String} The name of the suit. "Hearts","Clubs","Spades", or "Diamonds." */
    this.getSuit = function (){
        var suitName = '';
        switch (suit){
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
    this.getSymbol = function (){
        var suitName = '';
        switch (suit){
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
    this.getValue = function (){
        var value = number;
        if (number >= 10){
            value = 10;
        }
        if(number === 1) {
            value = 11;
        }
        return value;
    };
    /** @returns {String} The name of the card. "Ace" */
    this.getName = function (){
        var cardName = '';
        switch (number){
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
    this.getFullName = function (){
        return this.getName()+this.getSymbol();
    };
};
/** @constructor */
var Deck = function (){
    var cards = [];
    /** Creates a new set of cards. */
    var newCards = function (){
        var i,
            suit,
            number;
        for (i=0;i<52;i++){
            suit = i%4+1;
            number = i%13+1;
            cards.push(new Card(suit,number));
        }
    };
    /* Create those new cards. */
    newCards();
    /** Shuffles the cards. Modifies the private instance of the cards array.
     * @returns {Array} An array of Cards representing the shuffled version of the deck.
     */
    this.shuffle = function (){
        for(var j, x, i = cards.length; i; j = parseInt(Math.random() * i, 10), x = cards[--i], cards[i] = cards[j], cards[j] = x){
			// Crazy shuffle routine.
        }
        return this.getCards();
    };
    /** @returns {Array} An array of cards representing the Deck. */
    this.getCards = function (){
        return cards;
    };
    /** @returns {Card} Deals the top card off the deck. Removes it from the Deck. */
    this.deal = function (myHole){
		var i;
		this.shuffle();
        if (!cards.length){
            console.log("Ran out of cards, new deck");
            newCards();
            this.shuffle();
        }
        for(i = 0; i <31; i++){
			return this.hit();
        }
        for(i = 0; i < this.cards.length; i++){
			myHole.receiveCard(this.hit());
        }
    };
    this.hit = function(){
		return cards.pop();
    };
};