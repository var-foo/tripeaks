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
    console.log();
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